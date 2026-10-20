"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SectionId } from "@/lib/siteConfig";

const OBSERVED: SectionId[] = [/* "store", */ "contact"];

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
    const nodes = OBSERVED.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        });
        const current = OBSERVED.slice()
          .reverse()
          .find((id) => inView.has(id));
        setObserved(current ?? null);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return observed ?? routeSection(pathname);
}
