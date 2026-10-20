"use client";

import {
  useCallback,
  useMemo,
  useState,
  useTransition,
  ViewTransition,
  type CSSProperties,
  type PointerEvent,
} from "react";
import FadeImage from "@/components/ui/FadeImage/FadeImage";
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

function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--mx",
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--my",
    `${event.clientY - rect.top}px`,
  );
}

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
        onPointerMove={trackPointer}
        aria-label={`Open photograph ${number}${photo.title ? `, ${photo.title}` : ""}`}
      >
        <ViewTransition
          name={`photo-row-${photo.id}`}
          share="morph"
          default="none"
        >
          <FadeImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            className={styles.image}
          />
        </ViewTransition>
        <span className={styles.cursor} aria-hidden="true">
          View
        </span>
        <span className={styles.overlay} aria-hidden="true">
          <span className={styles.number}>
            {String(number).padStart(2, "0")}
          </span>
          <span className={styles.label}>
            {photo.title && <span className={styles.name}>{photo.title}</span>}
            <span className={styles.cat}>
              {getCategory(photo.category)?.label}
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

const MIN_CARD_RATIO = 0.8;

export default function PhotoGrid({ rows }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<"row" | "deck">("row");
  const [, startTransition] = useTransition();
  const closeLightbox = useCallback(
    () => startTransition(() => setOpenIndex(null)),
    [],
  );

  const photos = useMemo(() => rows.flat(), [rows]);
  const starts = useMemo(
    () =>
      rows.map((_, i) =>
        rows.slice(0, i).reduce((sum, row) => sum + row.length, 0),
      ),
    [rows],
  );

  const openPhoto = useCallback(
    (photo: Photo) =>
      startTransition(() => {
        setLayout(
          window.matchMedia("(min-width: 768px)").matches ? "row" : "deck",
        );
        setOpenIndex(
          Math.max(
            photos.findIndex((item) => item.id === photo.id),
            0,
          ),
        );
      }),
    [photos],
  );

  return (
    <>
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => {
          const start = starts[rowIndex] ?? 0;
          const total = row.reduce(
            (sum, photo) => sum + photo.width / photo.height,
            0,
          );
          return (
            <div key={rowIndex} className={styles.row}>
              {row.map((photo, itemIndex) => {
                const share = Math.max(
                  Math.round((photo.width / photo.height / total) * 100),
                  25,
                );
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
                <ViewTransition
                  name={`photo-deck-${photo.id}`}
                  share="morph"
                  default="none"
                >
                  <FadeImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    className={styles.cardImage}
                  />
                </ViewTransition>
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          transitionPrefix={`photo-${layout}`}
          onClose={closeLightbox}
          onChange={setOpenIndex}
        />
      )}
    </>
  );
}
