"use client";

import { prefillContact } from "@/lib/contactPrefill";
import styles from "./services.module.scss";

export default function InquireButton({ topic }: { topic: string }) {
  return (
    <button type="button" className={styles.cta} onClick={() => prefillContact({ topic })}>
      <span>Inquire</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}
