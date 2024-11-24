import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  },
};

export default nextConfig;
