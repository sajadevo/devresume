import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
