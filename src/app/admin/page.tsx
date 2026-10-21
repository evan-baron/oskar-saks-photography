import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/data/photos";
import { verifyAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { logout } from "@/app/login/actions";
import PhotoManager from "@/components/admin/PhotoManager/PhotoManager";
import styles from "./admin.module.scss";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}

async function AdminContent() {
  const user = await verifyAdmin();
  const [photos, overrides] = await Promise.all([
    db.photo.findMany({ orderBy: [{ row: "asc" }, { position: "asc" }] }),
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
        .map(({ id, url, alt, title, cover, row, position }) => ({
          id,
          url,
          alt,
          title: title ?? "",
          cover,
          row,
          position,
        })),
    };
  });

  return (
    <>
      <header className={styles.head}>
        <div>
          <h1>Gallery admin</h1>
          <p>Signed in as {user.email}</p>
        </div>
        <div className={styles.headActions}>
          <Link href="/admin/password" className={styles.ghost}>
            Change password
          </Link>
          <form action={logout}>
            <button type="submit" className={styles.ghost}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <PhotoManager categories={categories} />
    </>
  );
}
