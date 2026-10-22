import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  // The admin sections are tabs on /admin now; keep the old addresses working.
  async redirects() {
    return ["home", "about", "services"].map((tab) => ({ source: `/admin/${tab}`, destination: `/admin?tab=${tab}`, permanent: false }));
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
