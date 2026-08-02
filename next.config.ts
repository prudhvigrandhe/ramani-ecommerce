import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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