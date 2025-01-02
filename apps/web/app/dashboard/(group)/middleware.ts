import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('halo');
  const { pathname } = req.nextUrl;

  const hasCompletedOnboarding = req.cookies.get('onboarding')?.value;

  if (!hasCompletedOnboarding) {
    return NextResponse.redirect(new URL('/dashboard/welcome', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
