import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import CategoryCards from "./CategoryCards";
import styles from "./galleryPreview.module.scss";

export default function GalleryPreview() {
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Selected work</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="gallery-title">
              The <em>galleries</em>
            </span>
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
