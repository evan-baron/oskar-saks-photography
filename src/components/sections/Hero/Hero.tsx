import Image from "next/image";
import Link from "next/link";
import { HERO_PHOTO, CATEGORIES } from "@/data/photos";
import { LOCATION, SITE_TAGLINE } from "@/lib/siteConfig";
import Snowfall from "./Snowfall";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.frame}>
        <Image
          src={HERO_PHOTO.src}
          alt={HERO_PHOTO.alt}
          fill
          preload
          sizes="(min-width: 768px) 100vw, 260vw"
          quality={90}
          className={styles.image}
        />
        <div className={styles.shade} aria-hidden="true" />
      </div>
      <Snowfall />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{LOCATION}</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>
            <span>
              Emotion <em>framed</em>
            </span>
          </span>
          <span className={styles.line}>
            <span>
              Memory <em>cherished</em>
            </span>
          </span>
        </h1>
        <p className={styles.tagline}>{SITE_TAGLINE}</p>
        <div className={styles.actions}>
          <Link href="#gallery" className={styles.primary}>
            View the work
          </Link>
          <Link href="#contact" className={styles.secondary}>
            Book a session
          </Link>
        </div>
      </div>

      <div className={styles.meta}>
        <ul className={styles.categories} aria-label="Specialties">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>{category.label}</li>
          ))}
        </ul>
        <Link href="#about" className={styles.scroll} aria-label="Scroll to About">
          <span>Scroll</span>
          <span className={styles.rule} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
