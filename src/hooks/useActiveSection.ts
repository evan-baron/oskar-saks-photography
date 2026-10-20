"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, type SectionId } from "@/lib/siteConfig";

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const nodes = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}
