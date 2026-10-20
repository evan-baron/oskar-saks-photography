import Link from "next/link";
import {
  COPYRIGHT_YEAR,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_LINKS,
  PHOTOGRAPHER,
} from "@/lib/siteConfig";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.mark} aria-hidden="true">
          {PHOTOGRAPHER}
        </p>
        <div className={styles.row}>
          <nav aria-label="Footer">
            <ul>
              {NAV_LINKS.map(({ id, label, href }) => (
                <li key={id}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.social}>
            {INSTAGRAM_HANDLE}
          </a>
        </div>
        <p className={styles.legal}>
          &copy; {COPYRIGHT_YEAR} {PHOTOGRAPHER}. All photographs are protected by copyright.
        </p>
      </div>
    </footer>
  );
}
