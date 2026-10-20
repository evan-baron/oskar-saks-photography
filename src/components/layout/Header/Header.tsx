"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CATEGORIES } from "@/data/photos";
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
        <Link href="/" className={styles.brand} onClick={closeMenu} aria-label={`${PHOTOGRAPHER}, back to top`}>
          <Image
            src="/images/logo.webp"
            alt={`${PHOTOGRAPHER} Photo`}
            width={1102}
            height={443}
            sizes="(min-width: 768px) 11.5rem, 8rem"
            className={styles.logo}
            preload
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul>
            {NAV_LINKS.map(({ id, label, href }) => (
              <li key={id} className={id === "gallery" ? styles.hasMenu : undefined}>
                <Link
                  href={href}
                  className={`${styles.link} ${active === id ? styles.active : ""}`}
                  aria-current={active === id ? "page" : undefined}
                >
                  {label}
                </Link>
                {id === "gallery" && (
                  <ul className={styles.dropdown}>
                    {CATEGORIES.map((category) => (
                      <li key={category.slug}>
                        <Link href={`/gallery/${category.slug}`} className={styles.dropLink}>
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={styles.overlay} inert={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map(({ id, label, href }, index) => (
              <li key={id} style={{ transitionDelay: menuOpen ? `${120 + index * 55}ms` : "0ms" }}>
                <Link
                  href={href}
                  className={`${styles.overlayLink} ${active === id ? styles.active : ""}`}
                  onClick={closeMenu}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                </Link>
                {id === "gallery" && (
                  <ul className={styles.subLinks}>
                    {CATEGORIES.map((category) => (
                      <li key={category.slug}>
                        <Link href={`/gallery/${category.slug}`} onClick={closeMenu}>
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
