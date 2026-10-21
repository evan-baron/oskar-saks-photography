"use client";

import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  useTransition,
  ViewTransition,
  type CSSProperties,
} from "react";
import FadeImage from "@/components/ui/FadeImage/FadeImage";
import Lightbox from "@/components/ui/Lightbox/Lightbox";
import Reveal from "@/components/ui/Reveal/Reveal";
import type { Photo } from "@/data/photos";
import { buildColumns, COLUMNS, columnsForWidth } from "@/lib/galleryLayout";
import styles from "./photoGrid.module.scss";

type PhotoGridProps = {
  photos: Photo[];
};

type TileProps = {
  photo: Photo;
  number: number;
  sizes: string;
  delay?: number;
  preload?: boolean;
  onOpen: (photo: Photo) => void;
};

function Tile({ photo, number, sizes, delay = 0, preload = false, onOpen }: TileProps) {
  return (
    <Reveal
      delay={delay}
      className={styles.item}
      style={{ "--ratio": (photo.width / photo.height).toFixed(4) } as CSSProperties}
    >
      <button
        type="button"
        className={styles.tile}
        onClick={() => onOpen(photo)}
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
            preload={preload}
            className={styles.image}
          />
        </ViewTransition>
        {photo.title && (
          <span className={styles.overlay} aria-hidden="true">
            <span className={styles.name}>{photo.title}</span>
          </span>
        )}
      </button>
    </Reveal>
  );
}

const MIN_CARD_RATIO = 0.8;

// The column count follows the screen width. The server renders the default; wide screens update after hydration.
function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
const currentColumnCount = () => columnsForWidth(window.innerWidth);
const serverColumnCount = () => COLUMNS;

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const columnCount = useSyncExternalStore(subscribeToResize, currentColumnCount, serverColumnCount);
  const columns = useMemo(() => buildColumns(photos, columnCount), [photos, columnCount]);
  const numbers = useMemo(() => new Map(photos.map((photo, index) => [photo.id, index + 1])), [photos]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<"row" | "deck">("row");
  const [, startTransition] = useTransition();
  const closeLightbox = useCallback(
    () => startTransition(() => setOpenIndex(null)),
    [],
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
      <div className={styles.masonry}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((photo, itemIndex) => (
              <Tile
                key={photo.id}
                photo={photo}
                number={numbers.get(photo.id) ?? 0}
                sizes={`${Math.round(100 / columnCount)}vw`}
                delay={itemIndex * 60}
                preload={itemIndex === 0}
                onOpen={openPhoto}
              />
            ))}
          </div>
        ))}
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
                    sizes="calc(100vw - 2.5rem)"
                    preload={index === 0}
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
