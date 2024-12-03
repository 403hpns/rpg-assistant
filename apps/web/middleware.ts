import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
