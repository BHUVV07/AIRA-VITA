import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "[Supabase Environment Error] NEXT_PUBLIC_SUPABASE_URL is missing or unconfigured in environment variables."
    );
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "[Supabase Environment Error] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) is missing or unconfigured in environment variables."
    );
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return createServerClient<any>(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Called from Server Component
          }
        },
      },
    }
  );
}
