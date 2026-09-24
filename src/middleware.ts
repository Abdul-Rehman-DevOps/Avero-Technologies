import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Cookie presence gate for authenticated portal routes.
 * Cryptographic verification happens in the portal (app) layout via getSession().
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/portal/login" || pathname.startsWith("/portal/login/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/portal")) {
    const hasCookie = Boolean(request.cookies.get("avero_portal_session")?.value);
    if (!hasCookie) {
      const login = new URL("/portal/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal", "/portal/:path*"],
};
