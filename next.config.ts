import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
};

export default nextConfig;
