"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, PHOTOGRAPHER } from "@/lib/siteConfig";
import styles from "./header.module.scss";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.open : ""}`}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.bar}>
        <Link href="#home" className={styles.brand} onClick={closeMenu} aria-label={`${PHOTOGRAPHER}, back to top`}>
          <Image
            src="/images/logo.webp"
            alt={`${PHOTOGRAPHER} Photo`}
            width={1500}
            height={548}
            sizes="(min-width: 768px) 15rem, 10.5rem"
            className={styles.logo}
            preload
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className={`${styles.link} ${active === id ? styles.active : ""}`}
                  aria-current={active === id ? "location" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.toggleLabel}>{menuOpen ? "Close" : "Menu"}</span>
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={styles.overlay} inert={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map(({ id, label }, index) => (
              <li key={id} style={{ transitionDelay: menuOpen ? `${120 + index * 55}ms` : "0ms" }}>
                <Link
                  href={`#${id}`}
                  className={`${styles.overlayLink} ${active === id ? styles.active : ""}`}
                  onClick={closeMenu}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className={styles.overlayFoot} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </header>
  );
}
