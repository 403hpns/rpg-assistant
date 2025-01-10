import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login', '/register'];

export default async function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);
  const intlResponse = intlMiddleware(req);

  if (intlResponse) return intlResponse;

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);
  const token = (await cookies()).get('access_token')?.value;

  console.log(
    `*** Middleware *** | Path: ${path} | Token: ${token} | Protected: ${isProtectedRoute} | Public: ${isPublicRoute}`
  );

  if (isProtectedRoute && !token && path !== '/login') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  //#region Onboarding check
  if (token && isProtectedRoute) {
    const response = await fetch('http://localhost:4000/api/v1/onboarding', {
      headers: {
        Cookie: `access_token=${token}`,
      },
      cache: 'force-cache',
    });

    const { hasOnboarding } = await response.json();
    console.log('Czy ma onboarding: ', hasOnboarding);

    if (hasOnboarding && path === '/dashboard/welcome') {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    if (!hasOnboarding && path !== '/dashboard/welcome') {
      console.log('Nie ma');
      return NextResponse.redirect(new URL('/dashboard/welcome', req.nextUrl));
    }
    //#endregion
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/(pl|en)/:path*',
  ],
};
