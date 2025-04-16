import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered for request:", req.url);
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) {
    // Redirect to login page if user is not logged in, but avoid infinite loop
    return NextResponse.redirect(new URL("/Auth", req.url));
  }

  // Allow the request to proceed if user is logged in
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    "/Archive/:path*",
    "/History/:path*",
    "/Settings/:path*",
    "/Dashboard/:path*",
    "/Inventory/:path*",
    "/",
  ],
};
