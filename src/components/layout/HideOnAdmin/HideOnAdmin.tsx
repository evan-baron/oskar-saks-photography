"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Site chrome that makes no sense in the admin console (e.g. the contact form).
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return children;
}
