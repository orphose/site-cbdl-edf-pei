/**
 * Client Supabase pour les composants côté client (browser)
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Assertions de validation
  console.assert(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL requis"
  );
  console.assert(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY requis"
  );

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

