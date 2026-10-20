import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import styles from "./pageHero.module.scss";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  back?: { href: string; label: string };
  portrait?: { src: string; alt: string };
};

export default function PageHero({ eyebrow, title, lede, back, portrait }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.inner} ${portrait ? styles.withPortrait : ""}`}>
        <div className={styles.copy}>
        {back && (
          <Reveal>
            <Link href={back.href} className={styles.back}>
              <span aria-hidden="true">←</span>
              {back.label}
            </Link>
          </Reveal>
        )}
        <Reveal delay={back ? 60 : 0}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>
        <Reveal as="h1" delay={120} className={styles.title}>
          {title}
        </Reveal>
        {lede && (
          <Reveal as="p" delay={200} className={styles.lede}>
            {lede}
          </Reveal>
        )}
        </div>
        {portrait && (
          <Reveal delay={240} className={styles.portrait}>
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={800}
              height={800}
              sizes="(min-width: 768px) 28rem, 80vw"
              quality={90}
              preload
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
