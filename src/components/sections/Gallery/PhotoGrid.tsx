"use client";

import {
  useCallback,
  useState,
  useTransition,
  ViewTransition,
  type CSSProperties,
} from "react";
import FadeImage from "@/components/ui/FadeImage/FadeImage";
import Lightbox from "@/components/ui/Lightbox/Lightbox";
import Reveal from "@/components/ui/Reveal/Reveal";
import type { Photo } from "@/data/photos";
import styles from "./photoGrid.module.scss";

type PhotoGridProps = {
  photos: Photo[];
};

type TileProps = {
  photo: Photo;
  number: number;
  sizes: string;
  delay?: number;
  onOpen: (photo: Photo) => void;
};

function Tile({ photo, number, sizes, delay = 0, onOpen }: TileProps) {
  return (
    <Reveal
      delay={delay}
      className={`${styles.item} ${photo.featured ? styles.featured : ""} ${photo.tall ? styles.tall : ""}`}
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

export default function PhotoGrid({ photos }: PhotoGridProps) {
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
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <Tile
            key={photo.id}
            photo={photo}
            number={index + 1}
            sizes={photo.featured ? "100vw" : "33vw"}
            delay={(index % 3) * 90}
            onOpen={openPhoto}
          />
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
