"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SectionId } from "@/lib/siteConfig";

// The page sections that carry an id (in the order they appear on the home page). On other pages only some exist, e.g. just
// the contact form, and the route decides the rest.
const SECTIONS: SectionId[] = ["home", "about", "gallery", "services", "contact"];

// A section counts as the current one once its top has passed this fraction of the viewport height.
const READING_LINE = 0.4;

function routeSection(pathname: string): SectionId {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/services")) return "services";
  return "home";
}

export function useActiveSection() {
  const pathname = usePathname();
  const [observed, setObserved] = useState<SectionId | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // Looked up each time: a page's sections can finish streaming in after the route changes.
      const nodes = SECTIONS.map((id) => ({ id, node: document.getElementById(id) })).filter(
        // Pages visited earlier stay in the document, hidden (display: none); only sections that are laid out count.
        (entry): entry is { id: SectionId; node: HTMLElement } => entry.node !== null && entry.node.getClientRects().length > 0,
      );
      const line = window.innerHeight * READING_LINE;
      // Only counts when the page actually scrolls: a short page that fits on screen is "at the bottom" from the start.
      const atBottom =
        window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      // The last section whose top is above the line; at the very bottom, the last section, even if it is too short to reach it.
      const passed = nodes.filter(({ node }) => node.getBoundingClientRect().top <= line);
      const current = atBottom ? nodes.at(-1) : passed.at(-1);
      setObserved(current?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    // Navigating between pages swaps the content without a scroll event, so the sections found a moment ago may belong to the
    // page that just left. Recheck whenever the page's elements are added or removed.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      mutations.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return observed ?? routeSection(pathname);
}
