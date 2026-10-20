import Image from "next/image";
import Reveal from "@/components/ui/Reveal/Reveal";
import { ABOUT_PARAGRAPHS, ABOUT_PRINCIPLES } from "@/data/about";
import { ABOUT_PHOTO } from "@/data/photos";
import styles from "./about.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.inner}>
        <Reveal className={styles.media}>
          <div className={styles.portrait}>
            <Image
              src={ABOUT_PHOTO.src}
              alt={ABOUT_PHOTO.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>
            <span>Fig. 01</span>
            <span>Behind the lens</span>
          </p>
        </Reveal>

        <div className={styles.copy}>
          <Reveal>
            <p className={styles.eyebrow}>About</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="about-title">
              Patient with light, <em>quick</em> with a smile.
            </span>
          </Reveal>
          {ABOUT_PARAGRAPHS.map((paragraph, index) => (
            <Reveal key={index} as="p" delay={160 + index * 80} className={styles.paragraph}>
              {paragraph}
            </Reveal>
          ))}

          <ul className={styles.principles}>
            {ABOUT_PRINCIPLES.map(({ label, text }, index) => (
              <Reveal as="li" key={label} delay={120 * index}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
