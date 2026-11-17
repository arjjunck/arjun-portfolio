import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { agentUpgrade: "security" },
  // The separate data science page was retired; keep old links working.
  async redirects() {
    return [{ source: "/data-science", destination: "/", permanent: true }];
  },
};

export default nextConfig;
