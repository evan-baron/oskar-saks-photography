"use client";

import { updateContactContentAction } from "@/app/admin/content-actions";
import type { ContactContent } from "@/lib/contentSchema";
import SaveBar from "./SaveBar";
import { TITLE_HINT } from "./hints";
import { useSave } from "./useSave";
import styles from "./contentEditor.module.scss";

export default function ContactEditor({ content }: { content: ContactContent }) {
  const { pending, message, save } = useSave();

  return (
    <form
      className={styles.form}
      action={(formData) =>
        save(() =>
          updateContactContentAction({
            eyebrow: String(formData.get("eyebrow") ?? ""),
            title: String(formData.get("title") ?? ""),
            lede: String(formData.get("lede") ?? ""),
            email: String(formData.get("email") ?? ""),
            instagram: String(formData.get("instagram") ?? ""),
            location: String(formData.get("location") ?? ""),
          }),
        )
      }
    >
      <section className={styles.panel}>
        <h2>Copy</h2>
        <p className={styles.hint}>The text beside the contact form at the bottom of every page.</p>
        <label>
          <span>Small line above the heading</span>
          <input name="eyebrow" defaultValue={content.eyebrow} maxLength={80} required />
        </label>
        <label>
          <span>
            Heading <span className={styles.labelHint}>({TITLE_HINT})</span>
          </span>
          <input name="title" defaultValue={content.title} maxLength={80} required />
        </label>
        <label>
          <span>Intro</span>
          <textarea name="lede" defaultValue={content.lede} rows={3} maxLength={400} required />
        </label>
      </section>

      <section className={styles.panel}>
        <h2>Details</h2>
        <p className={styles.hint}>
          Shown next to the form. The Instagram link also appears in the footer and the mobile menu. Messages from the form are
          emailed to this address.
        </p>
        <label>
          <span>Email</span>
          <input name="email" type="email" defaultValue={content.email} maxLength={200} required />
        </label>
        <label>
          <span>
            Instagram username <span className={styles.labelHint}>(without the @; a pasted profile link works too)</span>
          </span>
          <input name="instagram" defaultValue={content.instagram} maxLength={120} required />
        </label>
        <label>
          <span>Based in</span>
          <input name="location" defaultValue={content.location} maxLength={80} required />
        </label>
      </section>

      <SaveBar pending={pending} message={message} />
    </form>
  );
}
