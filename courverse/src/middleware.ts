// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/pricing',
    '/courses',
    '/search',
  ];

  // Protected learner routes
  const protectedLearnerRoutes = [
    '/dashboard',
    '/my-learning',
    '/rewards',
    '/certificates',
    '/profile',
    '/notifications',
    '/wishlist',
  ];

  // Publisher routes
  const publisherRoutes = ['/publisher'];

  // Admin routes
  const adminRoutes = ['/admin'];

  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route));
  const isProtectedLearnerRoute = protectedLearnerRoutes.some((route) => pathname.startsWith(route));
  const isPublisherRoute = publisherRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without token
  if ((isProtectedLearnerRoute || isPublisherRoute || isAdminRoute) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from auth pages
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Match all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
