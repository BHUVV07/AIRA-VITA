import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    response.cookies.delete("aria_admin_dev_session");
    return response;
  } catch {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("aria_admin_dev_session");
    return response;
  }
}
