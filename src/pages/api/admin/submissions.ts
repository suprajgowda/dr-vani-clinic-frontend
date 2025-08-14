// pages/api/admin/submissions.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminFromReq } from "@/lib/adminSession";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const admin = getAdminFromReq(req);
  if (!admin) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await supabaseServer
    .from("contact_submissions")
    .select(
      "id, name, email, phone, message, preferred_appointment_date, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ submissions: data ?? [] });
}
