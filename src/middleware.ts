import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/constants/auth";

async function validateSession(sessionToken: string, request: NextRequest) {
  try {
    const validateUrl = new URL("/api/admin/auth/session", request.url);
    validateUrl.searchParams.set("token", sessionToken);
    const res = await fetch(validateUrl.toString(), {
      cache: "no-store",
      headers: {
        "x-admin-middleware-check": "1",
      },
    });
    return res.ok;
  } catch (error) {
    console.error("[Middleware] Failed to validate admin session:", error);
    return false;
  }
}

function unauthorizedResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginRoute = pathname === "/admin/login";
  const isAuthRoute = pathname.startsWith("/api/admin/auth");
  const isSessionValidationRoute = pathname === "/api/admin/auth/session";

  if (!isAdminRoute && !isAdminApi) {
    return NextResponse.next();
  }

  if (isLoginRoute || isAuthRoute || isSessionValidationRoute) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionToken) {
    return unauthorizedResponse(request);
  }

  const isValid = await validateSession(sessionToken, request);
  if (!isValid) {
    const response = unauthorizedResponse(request);
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: "",
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

