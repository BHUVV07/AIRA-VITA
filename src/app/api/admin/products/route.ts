import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDbProducts } from "@/lib/supabase/data";

export async function GET() {
  try {
    const products = await getDbProducts();
    return NextResponse.json({ success: true, products });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error loading products";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

interface VariantInput {
  name: string;
  code?: string;
  slug?: string;
  description?: string;
  image_url?: string;
  temperature?: string;
}

interface SpecInput {
  spec_name: string;
  spec_value: string;
}

export async function POST(request: Request) {
  try {
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
      variants,
      specifications,
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Product Name and Slug are required." }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Insert Product
    const { data: productData, error: prodError } = await supabase
      .from("products")
      .insert({
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        category_id: category_id || null,
        short_description: short_description || null,
        description: description || null,
        primary_image_url: primary_image_url || "/images/products/car.png",
        seo_title: seo_title || `${name} | Aria Vita`,
        seo_description: seo_description || short_description || description,
        is_featured: is_featured ?? true,
        availability_status: availability_status || "in_stock",
        sort_order: typeof sort_order === "number" ? sort_order : 100,
        is_active: true,
      })
      .select()
      .single();

    if (prodError) {
      return NextResponse.json({ error: prodError.message }, { status: 400 });
    }

    // Insert Variants if provided
    if (variants && Array.isArray(variants) && variants.length > 0) {
      const varPayload = variants.map((v: VariantInput, idx: number) => ({
        product_id: productData.id,
        name: v.name,
        code: v.code || null,
        slug: v.slug || v.name.toLowerCase().replace(/\s+/g, "-"),
        description: v.description || null,
        image_url: v.image_url || primary_image_url,
        temperature: v.temperature || null,
        sort_order: (idx + 1) * 10,
        is_active: true,
      }));
      await supabase.from("product_variants").insert(varPayload);
    }

    // Insert Specifications if provided
    if (specifications && Array.isArray(specifications) && specifications.length > 0) {
      const specPayload = specifications.map((s: SpecInput, idx: number) => ({
        product_id: productData.id,
        spec_name: s.spec_name,
        spec_value: s.spec_value,
        sort_order: (idx + 1) * 10,
      }));
      await supabase.from("product_specifications").insert(specPayload);
    }

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
      product: productData,
    });
  } catch (err: unknown) {
    console.error("Create product API error:", err);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}
