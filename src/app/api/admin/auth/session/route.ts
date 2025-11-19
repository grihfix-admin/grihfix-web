import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  // Allow middleware to call this endpoint to validate session tokens.
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const session = await getAdminSession(token);
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

