import { NextRequest, NextResponse } from "next/server";

import { BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";
import { connectToDatabase } from "@/lib/mongodb";
import { sendBookingStatusUpdate } from "@/lib/mailer";
import { sendSmsNotification, sendWhatsappNotification } from "@/lib/notifications";
import Booking, { type IBooking } from "@/models/Booking";
import { serializeAdminBooking } from "@/lib/serializers/admin";

const STATUS_SET = new Set<BookingStatus>(BOOKING_STATUS_VALUES);

function buildTrackingLink(booking: IBooking) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const path = booking.trackingCode ? `/track/${booking.trackingCode}` : "/track";
  return `${base}${path}`;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const booking = await Booking.findById(id).lean();
    if (!booking) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      booking: serializeAdminBooking(booking),
    });
  } catch (error) {
    console.error("[Admin API] Failed to fetch booking:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const body = await req.json();

    const updates: Partial<IBooking> = {};
    if (body.status) {
      if (!STATUS_SET.has(body.status)) {
        return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
      }
      updates.status = body.status;
    }
    if ("assignedStaffName" in body) {
      updates.assignedStaffName = body.assignedStaffName || null;
    }
    if ("assignedStaffPhone" in body) {
      updates.assignedStaffPhone = body.assignedStaffPhone || null;
    }
    if ("internalNotes" in body) {
      updates.internalNotes = body.internalNotes || null;
    }

    if (!Object.keys(updates).length) {
      return NextResponse.json({ success: false, message: "No updates provided" }, { status: 400 });
    }

    const booking = await Booking.findByIdAndUpdate(id, { $set: updates }, { new: true }).lean();
    if (!booking) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    if (updates.status) {
      try {
        await sendBookingStatusUpdate(booking as unknown as IBooking);
        const message = `Hi ${booking.name}, your GrihFix booking for ${booking.serviceName} is now "${booking.status}". Track: ${buildTrackingLink(
          booking as unknown as IBooking
        )}`;
        await Promise.all([
          sendWhatsappNotification(booking.phone, message),
          sendSmsNotification(booking.phone, message),
        ]);
      } catch (error) {
        console.warn("[Admin API] Notification failed:", error);
      }
    }

    return NextResponse.json({
      success: true,
      booking: serializeAdminBooking(booking),
    });
  } catch (error) {
    console.error("[Admin API] Failed to update booking:", error);
    return NextResponse.json({ success: false, message: "Failed to update booking" }, { status: 500 });
  }
}

