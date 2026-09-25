import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Lightweight edge middleware: security headers only.
 * No auth, no redirects, no session cookies — safe for the public marketing site.
 */
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: [
    /*
     * Apply to all paths except Next internals and static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|brand/|google.*\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
