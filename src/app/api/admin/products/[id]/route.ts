import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Context) {
  try {
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
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const { id } = await params;
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
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
