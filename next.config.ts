/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
    // Optimize more aggressively in production
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Connection",
            value: "keep-alive",
          },
          {
            key: "DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
