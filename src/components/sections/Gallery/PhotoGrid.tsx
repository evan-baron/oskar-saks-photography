"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox/Lightbox";
import Reveal from "@/components/ui/Reveal/Reveal";
import { getCategory, type Photo } from "@/data/photos";
import styles from "./photoGrid.module.scss";

type PhotoGridProps = {
  rows: Photo[][];
};

type TileProps = {
  photo: Photo;
  number: number;
  sizes: string;
  delay?: number;
  onOpen: (photo: Photo) => void;
};

function Tile({ photo, number, sizes, delay = 0, onOpen }: TileProps) {
  const ratio = photo.width / photo.height;
  return (
    <Reveal
      delay={delay}
      className={styles.item}
      style={{ "--ratio": ratio.toFixed(4) } as CSSProperties}
    >
      <button
        type="button"
        className={styles.tile}
        onClick={() => onOpen(photo)}
        aria-label={`Open photograph ${number}${photo.title ? `, ${photo.title}` : ""}`}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className={styles.image} />
        <span className={styles.overlay} aria-hidden="true">
          <span className={styles.number}>{String(number).padStart(2, "0")}</span>
          <span className={styles.label}>
            {photo.title && <span className={styles.name}>{photo.title}</span>}
            <span className={styles.cat}>{getCategory(photo.category)?.label}</span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

const MIN_CARD_RATIO = 0.8;

export default function PhotoGrid({ rows }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const photos = useMemo(() => rows.flat(), [rows]);
  const starts = useMemo(
    () => rows.map((_, i) => rows.slice(0, i).reduce((sum, row) => sum + row.length, 0)),
    [rows],
  );

  const openPhoto = useCallback(
    (photo: Photo) => setOpenIndex(Math.max(photos.findIndex((item) => item.id === photo.id), 0)),
    [photos],
  );

  return (
    <>
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => {
          const start = starts[rowIndex] ?? 0;
          const total = row.reduce((sum, photo) => sum + photo.width / photo.height, 0);
          return (
            <div key={rowIndex} className={styles.row}>
              {row.map((photo, itemIndex) => {
                const share = Math.max(Math.round((photo.width / photo.height / total) * 100), 25);
                return (
                  <Tile
                    key={photo.id}
                    photo={photo}
                    number={start + itemIndex + 1}
                    sizes={`${share}vw`}
                    delay={itemIndex * 90}
                    onOpen={openPhoto}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <ul className={styles.deck}>
        {photos.map((photo, index) => {
          const ratio = Math.max(photo.width / photo.height, MIN_CARD_RATIO);
          return (
            <li
              key={photo.id}
              style={{ "--card-ratio": ratio.toFixed(4) } as CSSProperties}
            >
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => openPhoto(photo)}
                aria-label={`Open photograph ${index + 1} of ${photos.length}`}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className={styles.cardImage} />
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onClose={closeLightbox} onChange={setOpenIndex} />
      )}
    </>
  );
}
