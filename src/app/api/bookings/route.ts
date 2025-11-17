// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectToDatabase } from "@/lib/mongodb";
import { sendBookingEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const booking = new Booking(body);
    await booking.save();

    // ✉️ Try to send email, but never block booking creation
    try {
      await sendBookingEmail(
        body.email || "test@example.com",
        "Your GrihFix Booking Confirmation",
        `Hello ${body.customerName}, your booking for ${body.serviceName} is confirmed.`,
        `<h2>Booking Confirmed 🎉</h2>
         <p><b>Service:</b> ${body.serviceName}</p>
         <p><b>Customer:</b> ${body.customerName}</p>
         <p><b>Phone:</b> ${body.phone}</p>
         <p><b>Address:</b> ${body.fullAddress}</p>
         <p><b>Price:</b> ₹${body.finalPrice}</p>
         <br/>
         <p>Thank you for choosing <b>GrihFix</b> 🙏</p>`
      );
    } catch (mailErr) {
      console.warn("Email send failed, but booking saved:", mailErr);
      // (Optional) TODO: enqueue for retry, or notify admin
    }

    return NextResponse.json({ success: true, booking });
  } catch (err: any) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}