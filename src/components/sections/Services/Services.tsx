"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal/Reveal";
import { SERVICES } from "@/data/services";
import { prefillContact } from "@/lib/contactPrefill";
import styles from "./services.module.scss";

type ServicesProps = {
  preview?: boolean;
};

export default function Services({ preview = false }: ServicesProps) {
  return (
    <section
      id={preview ? "services" : undefined}
      className={`${styles.services} ${preview ? "" : styles.full}`}
      aria-labelledby={preview ? "services-title" : undefined}
    >
      <div className={styles.inner}>
        {preview && (
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Services</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="services-title">
              Ways to <em>work together</em>
            </span>
          </Reveal>
        </header>
        )}

        <ol className={styles.list}>
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.id} delay={60 * index} className={styles.row}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.body}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {!preview && (
                <ul className={styles.includes}>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                )}
              </div>
              <div className={styles.side}>
                <p className={styles.price}>
                  <span>From</span>${service.startingAt.toLocaleString("en-US")}
                </p>
                <button
                  type="button"
                  className={styles.cta}
                  onClick={() => prefillContact({ topic: service.id })}
                >
                  <span>Inquire</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </Reveal>
          ))}
        </ol>

        {preview && (
          <Reveal className={styles.more}>
            <Link href="/services" className={styles.moreLink}>
              All services &amp; what&apos;s included <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
