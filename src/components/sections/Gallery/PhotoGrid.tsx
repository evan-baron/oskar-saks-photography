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
import { currentColumns, subscribeToColumns, writeColumns } from "@/lib/galleryColumns";
import { buildColumns, COLUMN_OPTIONS, DEFAULT_COLUMNS, NARROW_COLUMNS, NARROW_OPTIONS, WIDE_COLUMNS_FROM, type ColumnCount } from "@/lib/galleryLayout";
import styles from "./photoGrid.module.scss";

type PhotoGridProps = {
  photos: Photo[];
};

type TileProps = {
  photo: Photo;
  number: number;
  sizes: string;
  delay?: number;
  transitionName: string;
  preload?: boolean;
  // True for the photo the lightbox was opened from: its tile gives up the transition name so only one element holds it.
  lightboxOpen?: boolean;
  onOpen: (photo: Photo) => void;
};

function Tile({ photo, number, sizes, delay = 0, transitionName, preload = false, lightboxOpen = false, onOpen }: TileProps) {
  const image = (
    <FadeImage
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      quality={90}
      preload={preload}
      className={styles.image}
    />
  );
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
        {lightboxOpen ? (
          image
        ) : (
          <ViewTransition name={`${transitionName}-${photo.id}`} share="morph" default="none">
            {image}
          </ViewTransition>
        )}
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

// The viewer picks the column count. The server renders the default; a saved choice applies after hydration.
const serverColumnCount = () => DEFAULT_COLUMNS;

// Five and seven columns only exist on wide screens; anything narrower chooses between two and three.
const WIDE_QUERY = `(min-width: ${WIDE_COLUMNS_FROM}px)`;
function subscribeToWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const currentlyWide = () => window.matchMedia(WIDE_QUERY).matches;
const serverWide = () => false;

// False while hydrating, true from the first client render after.
const subscribeToNothing = () => () => undefined;

function ColumnIcon({ count }: { count: ColumnCount }) {
  const gap = 1.5;
  const width = (20 - gap * (count - 1)) / count;
  return (
    <svg viewBox="0 0 20 16" width="20" height="16" fill="currentColor" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <rect key={index} x={index * (width + gap)} y="1" width={width} height="14" rx="0.6" />
      ))}
    </svg>
  );
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const chosenColumns = useSyncExternalStore(subscribeToColumns, currentColumns, serverColumnCount);
  const wide = useSyncExternalStore(subscribeToWide, currentlyWide, serverWide);
  const hydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  // A saved 5 or 7 doesn't fit a narrower screen; it falls back to the narrow default.
  const columnCount = wide || NARROW_OPTIONS.includes(chosenColumns) ? chosenColumns : NARROW_COLUMNS;
  const options = wide ? COLUMN_OPTIONS : NARROW_OPTIONS;
  // Each layout's tiles carry transition names that include its column count, so no two layouts ever share a name.
  const rowTransitionName = `photo-row${columnCount}`;
  // Before hydration the server-rendered page is showing the narrow default (or the wide one, from WIDE_COLUMNS_FROM).
  const shownColumns = hydrated ? columnCount : NARROW_COLUMNS;
  // The server can't know the screen width, so it sends the 3-column layout (under WIDE_COLUMNS_FROM) and the 5-column one
  // (from it) together and CSS shows the right one: the page is correct from the first paint. After hydration the layout
  // the viewer actually has takes over, and a 7-column choice is added to the page only when it is made.
  const layouts = useMemo(
    () =>
      [...new Set<number>([NARROW_COLUMNS, DEFAULT_COLUMNS, ...(hydrated ? [columnCount] : [])])]
        .sort((a, b) => a - b)
        .map((count) => ({ count, columns: buildColumns(photos, count) })),
    [photos, columnCount, hydrated],
  );
  const numbers = useMemo(() => new Map(photos.map((photo, index) => [photo.id, index + 1])), [photos]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [layout, setLayout] = useState<"row" | "deck">("row");
  const [, startTransition] = useTransition();
  const closeLightbox = useCallback(
    () =>
      startTransition(() => {
        setOpenIndex(null);
        setOpenedId(null);
      }),
    [],
  );

  const openPhoto = useCallback(
    (photo: Photo) =>
      startTransition(() => {
        setLayout(
          window.matchMedia("(min-width: 768px)").matches ? "row" : "deck",
        );
        setOpenedId(photo.id);
        setOpenIndex(
          Math.max(
            photos.findIndex((item) => item.id === photo.id),
            0,
          ),
        );
      }),
    [photos],
  );

  const deckImage = (photo: Photo, index: number) => (
    <FadeImage
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="calc(100vw - 2.5rem)"
      quality={90}
      preload={index === 0}
      className={styles.cardImage}
    />
  );

  return (
    <>
      <div className={styles.viewing} role="radiogroup" aria-label="Viewing style">
        <span className={styles.viewingLabel}>View</span>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={shownColumns === option}
            aria-label={`${option} columns`}
            title={`${option} columns`}
            className={shownColumns === option ? styles.viewingActive : styles.viewingOption}
            onClick={() => writeColumns(option)}
          >
            <ColumnIcon count={option} />
          </button>
        ))}
      </div>

      <div className={styles.layouts} data-view={hydrated ? columnCount : "auto"}>
        {layouts.map(({ count, columns }) => (
          <div key={count} className={styles.masonry} data-columns={count}>
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.column}>
                {column.map((photo, itemIndex) => (
                  <Tile
                    key={photo.id}
                    photo={photo}
                    number={numbers.get(photo.id) ?? 0}
                    sizes={`${Math.round(100 / count)}vw`}
                    delay={itemIndex * 60}
                    transitionName={`photo-row${count}`}
                    lightboxOpen={openedId === photo.id}
                    preload={itemIndex === 0}
                    onOpen={openPhoto}
                  />
                ))}
              </div>
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
                {openedId === photo.id ? (
                  deckImage(photo, index)
                ) : (
                  <ViewTransition name={`photo-deck-${photo.id}`} share="morph" default="none">
                    {deckImage(photo, index)}
                  </ViewTransition>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          transitionPrefix={layout === "row" ? rowTransitionName : "photo-deck"}
          onClose={closeLightbox}
          onChange={setOpenIndex}
        />
      )}
    </>
  );
}
