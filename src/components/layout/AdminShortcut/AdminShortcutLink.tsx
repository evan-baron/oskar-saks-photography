"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./adminShortcut.module.scss";

export default function AdminShortcutLink() {
  const pathname = usePathname();
  // Already in the admin area (or signing in), so the shortcut would only be in the way.
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <Link href="/admin" className={styles.shortcut} prefetch={false}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 7h9M19 7h1M4 17h3M13 17h7" />
        <circle cx="16" cy="7" r="2.5" />
        <circle cx="10" cy="17" r="2.5" />
      </svg>
      <span>Admin</span>
    </Link>
  );
}
