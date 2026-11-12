import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Required for app/global-not-found.tsx (the app has multiple root layouts).
    globalNotFound: true,
  },
};

export default nextConfig;
