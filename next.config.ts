import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration des images externes (Supabase Storage)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hfrfpbwnztopvytaeymb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
