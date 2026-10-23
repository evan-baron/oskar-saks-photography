import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero/PageHero";
import CategoryCards from "@/components/sections/Gallery/CategoryCards";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/Gallery/categoryPage.module.scss";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "Browse photography galleries of families, couples, and events by Oskar Saks.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Choose a <em>story</em>
          </>
        }
        lede="Two collections, one approach: honest moments in beautiful light."
      />
      <div className={styles.body}>
        <CategoryCards />
      </div>
    </>
  );
}
