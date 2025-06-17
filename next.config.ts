import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ScannerOptions: {
    sources: [
      {
        path: "./app/globals.css",
        negated: false,
      },
    ],
  },
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
