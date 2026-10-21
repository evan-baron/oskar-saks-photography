import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero/PageHero";
import PhotoGrid from "@/components/sections/Gallery/PhotoGrid";
import { CATEGORIES } from "@/data/photos";
import { getCategoryContent, getPhotosByCategory } from "@/lib/gallery";
import styles from "@/components/sections/Gallery/categoryPage.module.scss";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryContent(slug);
  if (!category) return {};
  return {
    title: `${category.label} Gallery`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: PageProps<"/gallery/[category]">) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100svh" }} aria-busy="true" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: PageProps<"/gallery/[category]">["params"] }) {
  const { category: slug } = await params;
  const category = await getCategoryContent(slug);
  if (!category) notFound();

  const others = CATEGORIES.filter((item) => item.slug !== category.slug);
  const photos = await getPhotosByCategory(category.slug);

  return (
    <>
      <PageHero
        eyebrow={`Gallery / ${category.label}`}
        title={
          <>
            {category.heading.split(" ").slice(0, -1).join(" ")} <em>{category.heading.split(" ").slice(-1)}</em>
          </>
        }
        lede={category.description}
        back={{ href: "/gallery", label: "All galleries" }}
      />
      <div className={styles.body}>
        <PhotoGrid photos={photos} />
      </div>
      {others.length > 0 && (
        <nav className={styles.pager} aria-label="More galleries">
          {others.map((item) => (
            <Link key={item.slug} href={`/gallery/${item.slug}`} className={styles.pagerLink}>
              <small>Also see →</small>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
