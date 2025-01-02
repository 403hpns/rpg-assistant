import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const jwt = (await cookies()).get('access_token')?.value;

  if (isProtectedRoute && !jwt) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (path !== '/' && isPublicRoute && jwt) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  if (!jwt && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  const hasCompletedOnboarding = (await cookies()).get('onboarding')?.value;

  if (jwt && !hasCompletedOnboarding && path !== '/dashboard/welcome') {
    return NextResponse.redirect(new URL('/dashboard/welcome', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
