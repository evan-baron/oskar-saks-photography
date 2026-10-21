"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
  type CSSProperties,
} from "react";
import Image from "next/image";
import type { Photo } from "@/data/photos";
import styles from "./lightbox.module.scss";

type LightboxProps = {
  photos: Photo[];
  index: number;
  transitionPrefix: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

// The photo sits inside the stage's side padding (6.5rem each side from the md breakpoint, the page gutter below it).
const STAGE_SIZES = "(min-width: 768px) calc(100vw - 13rem), calc(100vw - 2.5rem)";

export default function Lightbox({
  photos,
  index,
  transitionPrefix,
  onClose,
  onChange,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Tab") {
        const focusable =
          rootRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!photo) return null;

  const next = photos[(index + 1) % total];
  const prev = photos[(index - 1 + total) % total];

  return (
    <div
      ref={rootRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title ?? photo.alt}, photograph ${index + 1} of ${total}`}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const touch = event.changedTouches[0];
        touchStart.current = null;
        if (!start || !touch) return;
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy))
          go(dx < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className={styles.stage} onClick={onClose}>
        {/* The frame is exactly the photo's size, so the arrows sit against it and everything outside it closes. */}
        <div
          className={styles.frame}
          style={{ "--ratio": (photo.width / photo.height).toFixed(4) } as CSSProperties}
          onClick={(event) => event.stopPropagation()}
        >
        <ViewTransition
          key={photo.id}
          name={`${transitionPrefix}-${photo.id}`}
          share="morph"
          default="none"
        >
          <div className={`${styles.figure} ${direction === 1 ? styles.fromRight : styles.fromLeft}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={STAGE_SIZES}
              quality={90}
              className={styles.image}
            />
          </div>
        </ViewTransition>
        <button
          type="button"
          className={`${styles.arrow} ${styles.sidePrev}`}
          onClick={(event) => {
            event.stopPropagation();
            go(-1);
          }}
          aria-label="Previous photograph"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15.5 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.sideNext}`}
          onClick={(event) => {
            event.stopPropagation();
            go(1);
          }}
          aria-label="Next photograph"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8.5 5l7 7-7 7" />
          </svg>
        </button>
        </div>
      </div>

      <div className={styles.preload} aria-hidden="true">
        {[prev, next].map(
          (neighbor) =>
            neighbor && (
              <Image
                key={neighbor.id}
                src={neighbor.src}
                alt=""
                fill
                sizes={STAGE_SIZES}
                quality={90}
              />
            ),
        )}
      </div>
    </div>
  );
}
