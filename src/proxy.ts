import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/sessionCookie";

// Optimistic check only: real verification happens in verifyAdmin() on the page and in every action.
export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = { matcher: "/admin/:path*" };
