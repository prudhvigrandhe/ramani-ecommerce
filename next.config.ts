import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rlaxkgmvortebtsthnhq.supabase.co",
      },
    ],
  },
};

export default nextConfig;