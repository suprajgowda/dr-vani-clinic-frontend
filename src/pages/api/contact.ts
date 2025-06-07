// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message, phone, preferredDate } = req.body;
  console.log("The Request body inside contact api file---->", req.body);

  if (!name || !email || !message || !phone || !preferredDate) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const { error } = await supabase.from("contact_submissions").insert([
    {
      name,
      email,
      message,
      phone,
      preferred_appointment_date: preferredDate,
    },
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true });
}
