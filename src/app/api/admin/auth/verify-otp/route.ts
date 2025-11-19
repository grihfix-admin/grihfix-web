import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SECONDS } from "@/constants/auth";
import { createAdminSession, isAdminEmailAllowed, verifyAdminOtp } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || typeof email !== "string" || !code || typeof code !== "string") {
      return NextResponse.json({ ok: false, message: "Email and code are required" }, { status: 400 });
    }

    if (!isAdminEmailAllowed(email)) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const valid = await verifyAdminOtp(email, code);
    if (!valid) {
      return NextResponse.json({ ok: false, message: "Invalid or expired code" }, { status: 400 });
    }

    const sessionToken = await createAdminSession(email);
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionToken,
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[AdminAuth] verify-otp failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to verify code" }, { status: 500 });
  }
}

