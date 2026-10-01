import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDbCategories } from "@/lib/supabase/data";
import { isDevPlaceholderMode, getAdminSession } from "@/lib/auth/adminAuth";

export async function GET() {
  try {
    const categories = await getDbCategories();
    return NextResponse.json({ success: true, categories });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching categories";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin authentication required." }, { status: 401 });
    }

    const { name, slug, description, sort_order } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Category Name and Slug are required." }, { status: 400 });
    }

    if (isDevPlaceholderMode()) {
      return NextResponse.json({
        success: true,
        message: "Category created successfully.",
        category: {
          id: `cat-${Date.now()}`,
          name: name.trim(),
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
          description: description || null,
          sort_order: typeof sort_order === "number" ? sort_order : 100,
          is_active: true,
        },
      });
    }

    const supabase = createAdminClient();

    const { data: category, error } = await supabase
      .from("categories")
      .insert({
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description || null,
        sort_order: typeof sort_order === "number" ? sort_order : 100,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (err: unknown) {
    console.error("Create category error:", err);
    const msg = err instanceof Error ? err.message : "Failed to create category.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
