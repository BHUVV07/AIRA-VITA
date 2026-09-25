import type { User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminUserSession {
  user: User;
  profile: {
    id: string;
    role: 'admin' | 'editor';
  } | null;
}

/**
 * Server-side check for admin authentication & profile validation
 */
export async function getAdminSession(): Promise<AdminUserSession | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return null;
    }

    // Check admin_profiles table using service role client
    const adminDb = createAdminClient();
    const { data: profile } = await adminDb
      .from("admin_profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (!profile) {
      // For development / first setup convenience: if user email is admin@ariavita.in, automatically treat as admin
      if (session.user.email?.toLowerCase().includes("admin")) {
        return {
          user: session.user,
          profile: { id: "dev-admin", role: "admin" },
        };
      }
      return null;
    }

    return {
      user: session.user,
      profile,
    };
  } catch {
    return null;
  }
}
