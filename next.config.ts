/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compress: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mekship-develop.s3.ap-southeast-1.amazonaws.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],

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
