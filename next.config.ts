import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
