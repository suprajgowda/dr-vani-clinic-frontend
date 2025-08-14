import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12h

export function setAdminCookie(res: NextApiResponse, payload: object) {
  const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET!, {
    expiresIn: MAX_AGE_SEC,
  });

  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SEC,
    })
  );
}

export function clearAdminCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  );
}

export function getAdminFromReq(req: NextApiRequest) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
  } catch {
    return null;
  }
}
