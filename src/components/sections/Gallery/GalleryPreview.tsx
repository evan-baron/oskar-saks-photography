import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import CategoryCards from "./CategoryCards";
import { getHomeContent, renderTitle } from "@/lib/siteContent";
import styles from "./galleryPreview.module.scss";

export default async function GalleryPreview() {
  const content = await getHomeContent();
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>{content.galleryEyebrow}</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="gallery-title">{renderTitle(content.galleryTitle)}</span>
          </Reveal>
        </header>
        <CategoryCards />
        <Reveal className={styles.more}>
          <Link href="/gallery" className={styles.moreLink}>
            Browse all galleries <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
