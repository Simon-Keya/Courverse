import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight route hints only.
 * Auth tokens live in localStorage (client); full protection is enforced
 * by the API (JWT) and client-side redirects on protected pages.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all public and asset paths through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
