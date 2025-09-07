import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { service, address, date } = await req.json();

  const booking = await prisma.booking.create({
    data: {
      service,
      address,
      date: new Date(date),
      userId,
    },
  });
  const bookings = await prisma.booking.findMany();

  return NextResponse.json(booking);
}