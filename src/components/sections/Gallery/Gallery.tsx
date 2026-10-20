"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox/Lightbox";
import Reveal from "@/components/ui/Reveal/Reveal";
import { PHOTOS, PHOTO_CATEGORIES, type PhotoCategory } from "@/data/photos";
import styles from "./gallery.module.scss";

type Filter = "All" | PhotoCategory;

const FILTERS: Filter[] = ["All", ...PHOTO_CATEGORIES];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? PHOTOS : PHOTOS.filter((photo) => photo.category === filter)),
    [filter],
  );

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="gallery" className={styles.gallery} aria-labelledby="gallery-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Selected work</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="gallery-title">
              The <em>gallery</em>
            </span>
          </Reveal>
          <Reveal delay={160} className={styles.filters}>
            <div role="group" aria-label="Filter photographs by category">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`${styles.chip} ${filter === item ? styles.chipActive : ""}`}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className={styles.count} aria-live="polite">
              {String(visible.length).padStart(2, "0")} frames
            </p>
          </Reveal>
        </header>

        <ul className={styles.grid} key={filter}>
          {visible.map((photo, index) => (
            <Reveal as="li" key={photo.id} delay={(index % 3) * 90} className={styles.item}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => setOpenIndex(index)}
                aria-label={`Open ${photo.title}, ${photo.category}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1440px) 28rem, (min-width: 1024px) 33vw, 50vw"
                  className={styles.image}
                />
                <span className={styles.overlay} aria-hidden="true">
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.label}>
                    <span className={styles.name}>{photo.title}</span>
                    <span className={styles.cat}>{photo.category}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={visible}
          index={openIndex}
          onClose={closeLightbox}
          onChange={setOpenIndex}
        />
      )}
    </section>
  );
}
