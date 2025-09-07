import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: role || "customer" },
    });
    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (err: any) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}