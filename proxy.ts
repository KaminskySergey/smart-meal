import { Session } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isHomePage = pathname === "/";
  const isAuthPage = pathname.startsWith("/auth");
  
  if (!session && !isHomePage && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/shopping-list", req.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
