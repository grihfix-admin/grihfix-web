import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/constants/auth";
import { deleteAdminSession } from "@/lib/adminAuth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (sessionToken) {
      await deleteAdminSession(sessionToken);
    }
  } catch (error) {
    console.warn("[AdminAuth] logout cleanup failed:", error);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}

