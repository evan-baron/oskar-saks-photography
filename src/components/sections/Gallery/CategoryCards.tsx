import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import { CATEGORIES, getPhotosByCategory } from "@/data/photos";
import styles from "./categoryCards.module.scss";

export default function CategoryCards() {
  return (
    <ul className={styles.grid} style={{ "--count": CATEGORIES.length } as CSSProperties}>
      {CATEGORIES.map((category, index) => {
        const photos = getPhotosByCategory(category.slug);
        const cover = photos.find((photo) => photo.cover) ?? photos[0];
        if (!cover) return null;
        return (
          <Reveal as="li" key={category.slug} delay={index * 110} className={styles.item}>
            <Link href={`/gallery/${category.slug}`} className={styles.card}>
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className={styles.image}
              />
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.count}>{String(photos.length).padStart(2, "0")} photographs</span>
              <span className={styles.body}>
                <span className={styles.name}>{category.label}</span>
                <span className={styles.tagline}>{category.tagline}</span>
                <span className={styles.view}>
                  View gallery <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
