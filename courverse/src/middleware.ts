import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection middleware.
 *
 * Authentication is checked using the accessToken cookie.
 * API-level authorization should still be enforced independently.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals, API routes, and static files through.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  // Public routes that don't require authentication.
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/pricing",
    "/courses",
    "/search",
  ];

  // Protected learner routes.
  const protectedLearnerRoutes = [
    "/dashboard",
    "/my-learning",
    "/rewards",
    "/certificates",
    "/profile",
    "/notifications",
    "/wishlist",
  ];

  // Publisher routes.
  const publisherRoutes = ["/publisher"];

  // Admin routes.
  const adminRoutes = ["/admin"];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtectedLearnerRoute = protectedLearnerRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isPublisherRoute = publisherRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Public routes don't require authentication.
  if (isPublicRoute) {
    // Redirect authenticated users away from login/register.
    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Redirect unauthenticated users away from protected routes.
  if (
    (isProtectedLearnerRoute || isPublisherRoute || isAdminRoute) &&
    !token
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Match application routes while excluding static assets and favicon.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};