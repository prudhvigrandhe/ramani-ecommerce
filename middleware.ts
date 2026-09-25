import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import {
  refreshAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin/auth-core";

const COOKIE_NAME = "admin-session";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)?.value;

  const isLoginPage =
    request.nextUrl.pathname === "/admin/login";

  if (isLoginPage) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (
      !session ||
      !(await verifyAdminSessionToken(session))
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    /*
     * Refresh the last-activity timestamp.
     *
     * The original creation time stays unchanged,
     * so the 24-hour maximum session lifetime
     * is still enforced.
     */
    const refreshedToken =
      await refreshAdminSessionToken(session);

    if (!refreshedToken) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    const response = NextResponse.next();

    response.cookies.set({
      name: COOKIE_NAME,
      value: refreshedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};