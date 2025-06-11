import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure output mode
  output: 'standalone',
  // Configure images domain if needed
  images: {
    domains: [],
  },
};

export default nextConfig;
