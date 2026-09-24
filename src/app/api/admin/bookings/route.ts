import { NextRequest, NextResponse } from "next/server";

import { BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";
import { connectToDatabase } from "@/lib/mongodb";
import Booking, { type IBooking } from "@/models/Booking";
import { serializeAdminBooking } from "@/lib/serializers/admin";

const STATUS_SET = new Set(BOOKING_STATUS_VALUES as readonly BookingStatus[]);

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status && STATUS_SET.has(status as BookingStatus)) {
      query.status = status;
    }
    if (search) {
      const trimmed = search.trim();
      if (trimmed) {
        query.$or = [
          { name: { $regex: trimmed, $options: "i" } },
          { phone: { $regex: trimmed, $options: "i" } },
        ];
      }
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(200).lean();
    return NextResponse.json({
      success: true,
      bookings: bookings.map((booking) =>
        serializeAdminBooking(booking as IBooking & { _id: { toString(): string } })
      ),
    });
  } catch (error) {
    console.error("[Admin API] Failed to list bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

