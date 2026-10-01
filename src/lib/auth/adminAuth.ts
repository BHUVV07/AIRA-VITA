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

export function isDevPlaceholderMode(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return !url || url.includes("placeholder");
}

/**
 * Server-side check for admin authentication & profile validation
 */
export async function getAdminSession(): Promise<AdminUserSession | null> {
  try {
    if (isDevPlaceholderMode()) {
      return {
        user: { id: "dev-admin-id", email: "admin@ariavita.in" } as User,
        profile: { id: "dev-admin-profile", role: "admin" },
      };
    }

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
      if (process.env.NODE_ENV !== "production" && session.user.email?.toLowerCase().includes("admin")) {
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
