import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const devSession = request.cookies.get("aria_admin_dev_session");
    
    // Check for Supabase auth cookies (sb-*-auth-token or sb-access-token)
    const hasSupabaseCookie = Array.from(request.cookies.getAll()).some(
      (c) => c.name.includes("auth-token") || c.name.includes("access-token") || c.name.includes("sb-")
    );

    if (!devSession?.value && !hasSupabaseCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
