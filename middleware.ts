import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // If it's not an admin path, don't do anything
  if (!path.startsWith("/admin") || path === "/admin/login") {
    return NextResponse.next()
  }

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If no session and on an admin page, redirect to login
  if (!session && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

