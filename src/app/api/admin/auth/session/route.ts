import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/adminAuth";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { authenticated: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json(
      { authenticated: false, error: msg },
      { status: 500 }
    );
  }
}
