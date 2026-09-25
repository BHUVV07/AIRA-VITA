import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: updatedEnquiry, error } = await supabase
      .from("enquiries")
      .update({
        status,
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
      message: "Enquiry status updated.",
      enquiry: updatedEnquiry,
    });
  } catch (err: unknown) {
    console.error("Update enquiry error:", err);
    return NextResponse.json({ error: "Failed to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (err: unknown) {
    console.error("Delete enquiry error:", err);
    return NextResponse.json({ error: "Failed to delete enquiry." }, { status: 500 });
  }
}
