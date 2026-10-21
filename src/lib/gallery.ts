import { cacheLife, cacheTag } from "next/cache";
import { CATEGORIES, getCategory, type CategorySlug, type Photo } from "@/data/photos";
import { db } from "@/lib/db";

type PhotoRow = Awaited<ReturnType<typeof db.photo.findMany>>[number];

function toPhoto(row: PhotoRow): Photo {
  return {
    id: row.id,
    src: row.url,
    width: row.width,
    height: row.height,
    alt: row.alt,
    category: row.category as CategorySlug,
    title: row.title ?? undefined,
    cover: row.cover,
    featured: row.featured,
    tall: row.tall,
  };
}

export async function getPhotosByCategory(slug: CategorySlug): Promise<Photo[]> {
  "use cache";
  cacheTag("photos");
  cacheLife("days");
  const rows = await db.photo.findMany({ where: { category: slug }, orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }] });
  return rows.map(toPhoto);
}

// Copy is editable in the admin; the text in src/data/photos.ts is the fallback.
export async function getCategoryContent(slug: string) {
  "use cache";
  cacheTag("categories");
  cacheLife("days");
  const base = getCategory(slug);
  if (!base) return undefined;
  const override = await db.category.findUnique({ where: { slug } });
  return override
    ? { ...base, heading: override.heading, tagline: override.tagline, description: override.description }
    : base;
}

export { CATEGORIES };
