"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal/Reveal";
import type { Photo } from "@/data/photos";
import { PRINTS } from "@/data/store";
import { prefillContact } from "@/lib/contactPrefill";
import styles from "./store.module.scss";

// `photos` are the gallery photos the prints are made from, matched to each print by `photoId`.
export default function Store({ photos }: { photos: Photo[] }) {
  return (
    <section id="store" className={styles.store} aria-labelledby="store-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Store</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="store-title">
              Prints for <em>the wall</em>
            </span>
          </Reveal>
          <Reveal as="p" delay={160} className={styles.lede}>
            Archival pigment prints on museum-grade paper, signed and carefully packaged. Reserve a
            print below and Oskar will follow up with sizing, framing, and shipping details.
          </Reveal>
        </header>

        <ul className={styles.grid}>
          {PRINTS.map((print, index) => {
            const photo = photos.find((item) => item.id === print.photoId);
            if (!photo) return null;
            return (
              <Reveal as="li" key={print.id} delay={(index % 2) * 100} className={styles.card}>
                <div className={styles.mat}>
                  <div className={styles.art} style={{ '--ratio': (photo.width / photo.height).toFixed(4) } as CSSProperties}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 90vw"
                      className={styles.image}
                    />
                  </div>
                </div>
                <div className={styles.info}>
                  <div>
                    <h3>{print.title}</h3>
                    <p>{print.detail}</p>
                  </div>
                  <p className={styles.price}>${print.price}</p>
                </div>
                <button
                  type="button"
                  className={styles.cta}
                  onClick={() =>
                    prefillContact({
                      topic: "prints",
                      message: `Hi Oskar, I'd like to order a print of "${print.title}" (${print.detail}).`,
                    })
                  }
                >
                  Reserve this print
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
