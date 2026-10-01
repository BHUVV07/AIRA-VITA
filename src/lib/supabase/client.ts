import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
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
  return createBrowserClient<any>(supabaseUrl, supabasePublishableKey);
}
