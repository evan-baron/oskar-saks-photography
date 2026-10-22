import { Suspense } from "react";
import type { Metadata } from "next";
import { CATEGORIES } from "@/data/photos";
import AdminSkeleton from "@/components/admin/AdminSkeleton/AdminSkeleton";
import { verifyAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import PhotoManager from "@/components/admin/PhotoManager/PhotoManager";

export const metadata: Metadata = {
  title: "Galleries | Admin",
  robots: { index: false, follow: false },
};

async function AdminGalleriesContent() {
  await verifyAdmin();
  const [photos, overrides] = await Promise.all([
    db.photo.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
    db.category.findMany(),
  ]);

  const categories = CATEGORIES.map((category) => {
    const override = overrides.find((item) => item.slug === category.slug);
    return {
      slug: category.slug,
      label: category.label,
      heading: override?.heading ?? category.heading,
      tagline: override?.tagline ?? category.tagline,
      description: override?.description ?? category.description,
      photos: photos
        .filter((photo) => photo.category === category.slug)
        .map(({ id, url, alt, title, cover }) => ({
          id,
          url,
          alt,
          title: title ?? "",
          cover,
        })),
    };
  });

  return <PhotoManager categories={categories} />;
}

export default function AdminGalleriesPage() {
  return (
    <Suspense fallback={<AdminSkeleton variant="gallery" />}>
      <AdminGalleriesContent />
    </Suspense>
  );
}
