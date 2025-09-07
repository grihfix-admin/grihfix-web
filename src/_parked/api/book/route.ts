import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    service,
    address,
    date,         // string like "2025-09-07"
    time,         // optional string like "10:00 AM"
    userId,       // number
    instructions, // optional
  } = body as {
    service: string;
    address: string;
    date: string;
    time?: string;
    userId: number;
    instructions?: string;
  };

  try {
    const booking = await prisma.booking.create({
      data: {
        service,
        address,
        date: new Date(date), // <-- now schema is DateTime, this is CORRECT
        userId,
        instructions,
        // you can store time inside instructions or add a separate field if needed
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 400 }
    );
  }
}