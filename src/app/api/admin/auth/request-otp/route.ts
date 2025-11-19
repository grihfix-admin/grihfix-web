import { NextResponse } from "next/server";

import {
  createAdminOtp,
  isAdminEmailAllowed,
} from "@/lib/adminAuth";
import { sendAdminLoginOtp } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, message: "Email is required" }, { status: 400 });
    }

    if (!isAdminEmailAllowed(email)) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const otp = await createAdminOtp(email);
    await sendAdminLoginOtp(otp.email, otp.code);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[AdminAuth] request-otp failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to send OTP" }, { status: 500 });
  }
}

