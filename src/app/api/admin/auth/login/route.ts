import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDevPlaceholderMode } from "@/lib/auth/adminAuth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const isDevAdmin =
      (trimmedEmail === "admin@ariavita.in" ||
        trimmedEmail === "admin@arirvita.com" ||
        trimmedEmail.includes("admin")) &&
      password === "admin123";

    // ONLY in non-production local development mode with placeholder configuration
    if (isDevPlaceholderMode()) {
      if (isDevAdmin) {
        const response = NextResponse.json({
          success: true,
          message: "Logged in as Admin (Development Mode)",
          user: { email: email.trim(), role: "admin" },
        });
        response.cookies.set("aria_admin_dev_session", "true", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return response;
      }
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Production / Live Supabase Auth Flow
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data?.user) {
      return NextResponse.json({ error: error?.message || "Invalid login credentials." }, { status: 401 });
    }

    // Verify role in admin_profiles table
    try {
      const adminDb = createAdminClient();
      const { data: profile } = await adminDb
        .from("admin_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (!profile) {
        if (process.env.NODE_ENV === "production" || !data.user.email?.toLowerCase().includes("admin")) {
          await supabase.auth.signOut();
          return NextResponse.json({ error: "Unauthorized. Your account does not have admin access." }, { status: 403 });
        }
      }
    } catch (dbErr) {
      console.warn("Supabase admin_profiles check warning:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      user: data.user,
    });
  } catch (err: unknown) {
    console.error("Admin login API error:", err);
    return NextResponse.json({ error: "Server authentication error." }, { status: 500 });
  }
}
