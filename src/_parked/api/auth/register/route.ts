import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password, role } = (await req.json()) as {
    email: string;
    password: string;
    role?: string;
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: role || "customer" },
    });
    return NextResponse.json(
      { success: true, user: { email: user.email, role: user.role } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "User already exists or DB error" },
      { status: 400 }
    );
  }
}