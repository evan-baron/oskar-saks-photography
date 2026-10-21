"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CATEGORIES } from "@/data/photos";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, PHOTOGRAPHER } from "@/lib/siteConfig";
import styles from "./header.module.scss";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setGalleryOpen(false);
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > 400 && y > lastY.current);
        lastY.current = y;
      }
    };
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

  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const closeGallery = () => {
    setGalleryOpen(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.open : ""} ${hidden && !menuOpen ? styles.hidden : ""}`}
      onFocusCapture={() => setHidden(false)}
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
              <li
                key={id}
                className={id === "gallery" ? `${styles.hasMenu} ${galleryOpen ? styles.menuShown : ""}` : undefined}
                onPointerEnter={id === "gallery" ? (event) => event.pointerType === "mouse" && setGalleryOpen(true) : undefined}
                onPointerLeave={id === "gallery" ? () => setGalleryOpen(false) : undefined}
                onFocus={
                  id === "gallery"
                    ? (event) => event.target.matches(":focus-visible") && setGalleryOpen(true)
                    : undefined
                }
                onBlur={
                  id === "gallery"
                    ? (event) => !event.currentTarget.contains(event.relatedTarget) && setGalleryOpen(false)
                    : undefined
                }
              >
                <Link
                  href={href}
                  className={`${styles.link} ${active === id ? styles.active : ""}`}
                  aria-current={active === id ? "page" : undefined}
                  onClick={id === "gallery" ? closeGallery : undefined}
                >
                  {label}
                </Link>
                {id === "gallery" && (
                  <ul className={styles.dropdown}>
                    {CATEGORIES.map((category) => (
                      <li key={category.slug}>
                        <Link href={`/gallery/${category.slug}`} className={styles.dropLink} onClick={closeGallery}>
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
