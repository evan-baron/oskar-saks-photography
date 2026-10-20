"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/data/photos";
import styles from "./lightbox.module.scss";

type LightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

export default function Lightbox({ photos, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback(
    (direction: 1 | -1) => onChange((index + direction + total) % total),
    [index, total, onChange],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!photo) return null;

  const next = photos[(index + 1) % total];
  const prev = photos[(index - 1 + total) % total];

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title}, photograph ${index + 1} of ${total}`}
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
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className={styles.top}>
        <p className={styles.counter}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.sep}>/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </p>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <span>Close</span>
          <span className={styles.x} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.stage} onClick={onClose}>
        <div key={photo.id} className={styles.figure} onClick={(event) => event.stopPropagation()}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            quality={90}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous photograph">
          <span aria-hidden="true">←</span>
        </button>
        <div className={styles.caption}>
          <p className={styles.title}>{photo.title}</p>
          <p className={styles.category}>{photo.category}</p>
        </div>
        <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next photograph">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.preload} aria-hidden="true">
        {[prev, next].map(
          (neighbor) =>
            neighbor && (
              <Image key={neighbor.id} src={neighbor.src} alt="" fill sizes="100vw" quality={90} />
            ),
        )}
      </div>
    </div>
  );
}
