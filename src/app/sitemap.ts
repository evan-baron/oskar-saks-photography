import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/photos";
import { getSiteUrl } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const paths = ["/", "/about", "/gallery", ...CATEGORIES.map((category) => `/gallery/${category.slug}`), "/services"];
  return paths.map((path) => ({
    url: `${site}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path.startsWith("/gallery") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/gallery" ? 0.9 : 0.8,
  }));
}
