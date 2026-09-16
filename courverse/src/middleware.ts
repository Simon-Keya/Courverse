import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * UX route protection via accessToken cookie.
 * Backend API authorization remains the source of truth.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  const publicExact = new Set([
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/pricing",
    "/search",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/callback",
  ]);

  const publicPrefixes = [
    "/courses",
    "/categories",
    "/publishers",
  ];

  const isPublic =
    publicExact.has(pathname) ||
    publicPrefixes.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

  const protectedPrefixes = [
    "/dashboard",
    "/my-learning",
    "/rewards",
    "/certificates",
    "/profile",
    "/notifications",
    "/wishlist",
    "/publisher",
    "/admin",
  ];

  const isProtected = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isPublic) {
    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
