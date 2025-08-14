// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // NEVER expose to browser

if (!url || !serviceKey) {
  throw new Error("Missing SUPABASE env vars (URL or SERVICE ROLE KEY).");
}

export const supabaseServer = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
