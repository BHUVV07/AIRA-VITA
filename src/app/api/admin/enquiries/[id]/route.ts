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
    const { status } = await request.json();

    if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    if (isDevPlaceholderMode()) {
      return NextResponse.json({
        success: true,
        message: "Enquiry status updated.",
        enquiry: { id, status, updated_at: new Date().toISOString() },
      });
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
    const msg = err instanceof Error ? err.message : "Failed to update enquiry.";
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
        message: "Enquiry deleted successfully.",
      });
    }

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
    const msg = err instanceof Error ? err.message : "Failed to delete enquiry.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
