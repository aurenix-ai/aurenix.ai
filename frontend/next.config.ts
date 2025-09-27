import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export static HTML for Netlify
  output: 'export',

  images: {
    domains: [],
  },
};

export default nextConfig;
