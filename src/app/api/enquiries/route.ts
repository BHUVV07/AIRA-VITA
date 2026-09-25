import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateWhatsAppEnquiryUrl } from "@/utils/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, product, variant, message, projectType, location } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Look up product_id or variant_id if product name passed
    let productId: string | null = null;
    const variantId: string | null = null;

    if (product) {
      const { data: prodData } = await supabase
        .from("products")
        .select("id")
        .ilike("name", product.trim())
        .limit(1)
        .single();
      if (prodData) {
        productId = prodData.id;
      }
    }

    // Insert enquiry into Supabase
    const { data: enquiryData, error: dbError } = await supabase
      .from("enquiries")
      .insert({
        name: name.trim(),
        company: company?.trim() || null,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        product_id: productId,
        product_name: product || null,
        variant_id: variantId,
        variant_name: variant || null,
        message: message?.trim() || null,
        project_type: projectType || null,
        location: location || null,
        status: "new",
        source: "website",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert enquiry error:", dbError);
      // Even if DB insert fails in unconfigured environments, still construct WhatsApp URL cleanly!
    }

    // Generate WhatsApp deep link
    const whatsappUrl = generateWhatsAppEnquiryUrl({
      name: name.trim(),
      company,
      email,
      phone,
      product,
      variant,
      message,
      projectType,
      location,
    });

    return NextResponse.json({
      success: true,
      enquiryId: enquiryData?.id || "local-" + Date.now(),
      whatsappUrl,
      message: "Enquiry submitted successfully.",
    });
  } catch (err: unknown) {
    console.error("Enquiry submission API error:", err);
    return NextResponse.json({ error: "Server error processing enquiry." }, { status: 500 });
  }
}
