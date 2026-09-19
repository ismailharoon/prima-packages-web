import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    cpus: 1,
  },
  async rewrites() {
    return [
      { source: '/woven-labels', destination: '/products/woven-labels' },
      { source: '/zipper-bags', destination: '/products/zipper-bags' },
      { source: '/hang-tags', destination: '/products/hang-tags' },
      { source: '/carry-bags', destination: '/products/carry-bags' },
      { source: '/woven-labels/', destination: '/products/woven-labels' },
      { source: '/zipper-bags/', destination: '/products/zipper-bags' },
      { source: '/hang-tags/', destination: '/products/hang-tags' },
      { source: '/carry-bags/', destination: '/products/carry-bags' },
    ]
  },
};

export default nextConfig;
