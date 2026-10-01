import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/supabase/data";
import { isDevPlaceholderMode, getAdminSession } from "@/lib/auth/adminAuth";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin authentication required." }, { status: 401 });
    }

    const body = await request.json();

    if (isDevPlaceholderMode()) {
      return NextResponse.json({
        success: true,
        message: "Site settings updated successfully.",
        settings: body,
      });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: "company_info",
          value: body,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Site settings updated successfully.",
      settings: data.value,
    });
  } catch (err: unknown) {
    console.error("Update settings error:", err);
    const msg = err instanceof Error ? err.message : "Failed to update settings.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
