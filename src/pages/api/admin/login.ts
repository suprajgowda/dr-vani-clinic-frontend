// pages/api/admin/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabaseServer";
import bcrypt from "bcryptjs";
import { setAdminCookie } from "@/lib/adminSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  // Read admin with service role (server-only)
  const { data, error } = await supabaseServer
    .from("admin_users")
    .select("id, email, password_hash, is_active")
    .eq("email", email)
    .maybeSingle();

  if (error || !data)
    return res.status(401).json({ error: "Invalid credentials" });
  if (!data.is_active)
    return res.status(403).json({ error: "Account disabled" });

  const ok = await bcrypt.compare(password, data.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  setAdminCookie(res, { sub: data.id, email: data.email });
  res.status(200).json({ ok: true });
}
