// src/middleware.ts
export function middleware() {
  return;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], // match all routes but do nothing
};