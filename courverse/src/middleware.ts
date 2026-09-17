import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isRoleAllowed, roleHome } from "@/permissions/roles";

/**
 * UX route protection.
 * Reads accessToken cookie and optionally decodes JWT payload for role.
 * Backend remains the authority for every API call.
 */

function decodeJwtPayload(token: string): { role?: string; sub?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof atob === "function"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json) as { role?: string; sub?: string };
  } catch {
    return null;
  }
}

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
  const payload = token ? decodeJwtPayload(token) : null;
  const role = payload?.role;

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

  const publicPrefixes = ["/courses", "/categories", "/publishers"];

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
      return NextResponse.redirect(
        new URL(roleHome(role), request.url),
      );
    }
    return NextResponse.next();
  }

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role gate for admin / publisher (and other mapped prefixes)
  if (token && !isRoleAllowed(pathname, role)) {
    return NextResponse.redirect(new URL(roleHome(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
