import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/home", "/profile", "/rider", "/driver"];

export function middleware(req: NextRequest) {
  const newUrl = req.nextUrl.clone();

  const isPublicRoute = req.nextUrl.pathname === "/";
  const isLoginRoute =
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/callback/oauth";
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const userId = req.cookies.get("userId")?.value;
  const coRideToken = req.cookies.get("coRideToken")?.value;
  const hasCookies = !!userId && !!coRideToken;

  // public route
  if (isPublicRoute) {
    return NextResponse.next();
  }
  // login route
  if (isLoginRoute) {
    if (hasCookies) {
      newUrl.pathname = "/home";
      return NextResponse.redirect(newUrl);
    }
    return NextResponse.next();
  }
  // protected route
  if (isProtectedRoute) {
    if (hasCookies) {
      return NextResponse.next();
    }
    newUrl.pathname = "/login";
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
}
