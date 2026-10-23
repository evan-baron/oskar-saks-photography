import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/login", "/api/"] },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
