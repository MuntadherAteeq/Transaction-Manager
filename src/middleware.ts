// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Example: Decode role from cookie or header (use your auth method)
  const res = await fetch(`${request.nextUrl.origin}/api/session`, {
    method: "GET",
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
  });

  const role = (await res.json()).account.role;
  console.log("Role from session:", role);

  // // Define user-only and admin-only routes
  // const userRoutes = ["/App", "/JobCards"];
  // const adminRoutes = [
  //   "/",
  //   "/Dashboard",
  //   "/Accounts",
  //   "/Vehicles",
  //   "/Settings",
  // ];

  // const isAdmin = role === "Admin";
  // const isUser = role === "User";

  // // Check if route is admin-only
  // if (adminRoutes.includes(pathname) && !isAdmin) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // // Check if route is user-accessible (for users)
  // if (isUser && !userRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // return NextResponse.next();
}

// the matcher is used to specify which routes the middleware should run on
export const config = {
  matcher: [
    "/App/JobCards/:path*",
    "/App/Dashboard/:path*",
    "/App/Accounts/:path*",
    "/App/Vehicles/:path*",
    "/App/Settings/:path*",
  ],
};
