// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message, phone, preferredDate, recaptchaToken } =
    req.body;

  console.log("the Contact Data which is recieved is: ", req.body);
  if (!name || !email || !message || !phone || !preferredDate) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    }
  );

  const verifyData = await verifyRes.json();
  console.log("Recaptcha verification response:", verifyData);

  if (!verifyData.success || verifyData.score < 0.5) {
    return res.status(400).json({ error: "Captcha score too low or invalid" });
  }

  const { error } = await supabaseServer.from("contact_submissions").insert([
    {
      name,
      email,
      message,
      phone,
      preferred_appointment_date: preferredDate,
    },
  ]);
  console.log("Supabase insert response:", error);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true });
}
