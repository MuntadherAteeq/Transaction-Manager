import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUser } from "./Library/lucia"

export async function middleware(request: NextRequest) {
  const session = await getUser()
  if (session === null) {
    return NextResponse.redirect(new URL("/Auth", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!Auth|_next|static|favicon.ico).*)"],
}