// src/app/api/bookings/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { BOOKING_STATUS_VALUES } from "@/constants/bookings";
import Booking from "@/models/Booking";

const STATUS_SET = new Set(BOOKING_STATUS_VALUES);

// ✅ Fetch booking by ID
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const booking = await Booking.findById(id).lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("Error fetching booking:", err);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// ✅ Update booking by ID
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const body = await req.json();

    if (!STATUS_SET.has(body.status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true }
    ).lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("Error updating booking:", err);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}