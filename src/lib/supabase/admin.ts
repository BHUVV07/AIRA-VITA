import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase Admin Client using the Service Role Key.
 *
 * ARCHITECTURE & SECURITY REQUIREMENTS:
 * 1. Must ONLY run server-side (API routes, Server Components, Server Actions).
 * 2. Never import into "use client" components.
 * 3. Never expose SUPABASE_SERVICE_ROLE_KEY through NEXT_PUBLIC_* variables.
 * 4. Uses process.env.NEXT_PUBLIC_SUPABASE_URL and process.env.SUPABASE_SERVICE_ROLE_KEY.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Supabase Security Error] createAdminClient() was called in a client browser environment. The SUPABASE_SERVICE_ROLE_KEY must NEVER be used on the client."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "[Supabase Environment Error] NEXT_PUBLIC_SUPABASE_URL is missing or unconfigured in environment variables."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "[Supabase Environment Error] SUPABASE_SERVICE_ROLE_KEY is missing or unconfigured in environment variables."
    );
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return createClient<any>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
