// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectToDatabase } from "@/lib/mongodb";
import { sendBookingNotification, sendCustomerBookingConfirmation } from "@/lib/mailer";
import { sendWhatsappNotification } from "@/lib/notifications";
import { BOOKING_STATUS_VALUES } from "@/constants/bookings";

const BOOKING_STATUS_SET = new Set(BOOKING_STATUS_VALUES);
function getPublicBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error listing bookings:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    console.log("[Bookings API] POST /api/bookings called with body:", body);

    const {
      name,
      phone,
      email,
      address,
      city,
      pincode,
      landmark,
      serviceName,
      serviceSlug,
      variant,
      scheduledDate,
      notes,
      finalPrice,
      coords,
      source = "website",
    } = body;

    if (!name || !phone || !address || !(serviceSlug || serviceName)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedStatus =
      typeof body.status === "string" && BOOKING_STATUS_SET.has(body.status)
        ? (body.status as (typeof BOOKING_STATUS_VALUES)[number])
        : "new";

    const booking = await Booking.create({
      name,
      phone,
      email,
      address,
      city,
      pincode,
      landmark,
      serviceName: serviceName || "Home Service",
      serviceSlug: serviceSlug || "general-service",
      variant: variant || null,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      notes: notes || null,
      finalPrice: finalPrice ?? null,
      coords,
      status: normalizedStatus,
      source,
    });
    console.log("[Bookings API] Booking created with id:", booking._id);

    console.log("[Bookings API] Triggering notifications for booking:", booking._id);
    const trackingPath = booking.trackingCode ? `/track/${booking.trackingCode}` : "/track";
    const trackingLink = `${getPublicBaseUrl()}${trackingPath}`;
    const notificationResults = await Promise.allSettled([
      sendBookingNotification(booking.toObject()),
      sendCustomerBookingConfirmation(booking),
      sendWhatsappNotification(
        booking.phone,
        `Hi ${booking.name}, thank you for booking ${booking.serviceName} with GrihFix. Track status: ${trackingLink}`
      ),
    ]);
    notificationResults.forEach((result, index) => {
      if (result.status === "rejected") {
        const labels = ["Admin email", "Customer email", "WhatsApp"];
        console.warn(`[Bookings API] ${labels[index]} notification failed:`, result.reason);
      }
    });

    return NextResponse.json(
      { success: true, bookingId: booking._id, booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Bookings API] Error while creating booking:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create booking" },
      { status: 500 }
    );
  }
}