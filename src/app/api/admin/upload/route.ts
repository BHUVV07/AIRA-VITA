import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "product-images";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Validation rules
    if (bucket === "product-images") {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        return NextResponse.json(
          { error: "Invalid image type. Allowed formats: JPEG, PNG, WebP." },
          { status: 400 }
        );
      }
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds maximum limit of 5MB." },
          { status: 400 }
        );
      }
    } else if (bucket === "product-documents") {
      if (file.type.toLowerCase() !== "application/pdf") {
        return NextResponse.json(
          { error: "Invalid document type. Allowed format: PDF." },
          { status: 400 }
        );
      }
      if (file.size > 20 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds maximum limit of 20MB." },
          { status: 400 }
        );
      }
    }

    const supabase = createAdminClient();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName,
    });
  } catch (err: unknown) {
    console.error("File upload API error:", err);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
