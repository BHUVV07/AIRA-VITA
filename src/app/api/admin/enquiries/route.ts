import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const supabase = createAdminClient();
    let query = supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%,product_name.ilike.%${search}%`);
    }

    const { data: enquiries, error } = await query;

    if (error) {
      console.warn("Db enquiries fetch error fallback:", error.message);
      return NextResponse.json({
        success: true,
        enquiries: [],
      });
    }

    return NextResponse.json({
      success: true,
      enquiries: enquiries || [],
    });
  } catch (err: unknown) {
    console.error("Enquiries GET error:", err);
    return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
  }
}
