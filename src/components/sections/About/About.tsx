import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import { ABOUT_PARAGRAPHS } from "@/data/about";
import { ABOUT_PHOTO } from "@/data/photos";
import styles from "./about.module.scss";

export default function About() {
  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <Reveal className={styles.media}>
          <div className={styles.portrait}>
            <Image
              src={ABOUT_PHOTO.src}
              alt={ABOUT_PHOTO.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={90}
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>
            <span>Oskar &amp; Katya</span>
          </p>
        </Reveal>

        <div className={styles.copy}>
          <Reveal>
            <p className={styles.eyebrow}>About</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="about-title">
              Two People
              <br />
              One Shared <em>Vision</em>
            </span>
          </Reveal>
          {ABOUT_PARAGRAPHS.map((paragraph, index) => (
            <Reveal key={index} as="p" delay={160 + index * 80} className={styles.paragraph}>
              {paragraph}
            </Reveal>
          ))}
          <Reveal delay={260} className={styles.actions}>
            <Link href="/about" className={styles.secondary}>
              More about Oskar <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
