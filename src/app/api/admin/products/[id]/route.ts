import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDevPlaceholderMode, getAdminSession } from "@/lib/auth/adminAuth";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Context) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      slug,
      category_id,
      short_description,
      description,
      primary_image_url,
      seo_title,
      seo_description,
      is_featured,
      availability_status,
      sort_order,
      is_active,
    } = body;

    if (isDevPlaceholderMode()) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully.",
        product: { id, name, slug, description, availability_status: availability_status || "in_stock", is_active: is_active ?? true },
      });
    }

    const supabase = createAdminClient();

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update({
        ...(name && { name: name.trim() }),
        ...(slug && { slug: slug.trim().toLowerCase().replace(/\s+/g, "-") }),
        ...(category_id !== undefined && { category_id }),
        ...(short_description !== undefined && { short_description }),
        ...(description !== undefined && { description }),
        ...(primary_image_url !== undefined && { primary_image_url }),
        ...(seo_title !== undefined && { seo_title }),
        ...(seo_description !== undefined && { seo_description }),
        ...(is_featured !== undefined && { is_featured }),
        ...(availability_status !== undefined && { availability_status }),
        ...(sort_order !== undefined && { sort_order }),
        ...(is_active !== undefined && { is_active }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (err: unknown) {
    console.error("Update product error:", err);
    const msg = err instanceof Error ? err.message : "Failed to update product.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin authentication required." }, { status: 401 });
    }

    const { id } = await params;

    if (isDevPlaceholderMode()) {
      return NextResponse.json({
        success: true,
        message: "Product deleted successfully.",
      });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (err: unknown) {
    console.error("Delete product error:", err);
    const msg = err instanceof Error ? err.message : "Failed to delete product.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
