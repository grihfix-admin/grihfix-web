import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", "/services", "/contact",
  "/sign-in(.*)", "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Public pages: no auth
  if (isPublicRoute(req)) return;

  // Everything else: require sign-in
  await auth.protect();
});

export const config = {
  matcher: [
    // Recommended matcher from Clerk docs (skips static and Next internals)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};