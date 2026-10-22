"use client";

import { updateAboutContentAction } from "@/app/admin/content-actions";
import type { AboutContent } from "@/lib/contentSchema";
import SaveBar from "./SaveBar";
import { TITLE_HINT } from "./hints";
import { useSave } from "./useSave";
import styles from "./contentEditor.module.scss";

export default function AboutEditor({ content }: { content: AboutContent }) {
  const { pending, message, save } = useSave();

  return (
    <form
      className={styles.form}
      action={(formData) =>
        save(() =>
          updateAboutContentAction({
            sectionTitle: String(formData.get("sectionTitle") ?? ""),
            caption: String(formData.get("caption") ?? ""),
            paragraphs: String(formData.get("paragraphs") ?? "")
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean),
            pageTitle: String(formData.get("pageTitle") ?? ""),
            intro: String(formData.get("intro") ?? ""),
          }),
        )
      }
    >
      <section className={styles.panel}>
        <h2>Home page: About section</h2>
        <label>
          <span>
            Heading <span className={styles.labelHint}>(a new line breaks the heading; {TITLE_HINT})</span>
          </span>
          <textarea name="sectionTitle" defaultValue={content.sectionTitle} rows={2} maxLength={120} required />
        </label>
        <label>
          <span>Caption under the photo</span>
          <input name="caption" defaultValue={content.caption} maxLength={80} required />
        </label>
        <label>
          <span>
            Paragraphs <span className={styles.labelHint}>(leave a blank line between paragraphs)</span>
          </span>
          <textarea name="paragraphs" defaultValue={content.paragraphs.join("\n\n")} rows={10} required />
        </label>
      </section>

      <section className={styles.panel}>
        <h2>About page</h2>
        <label>
          <span>
            Heading <span className={styles.labelHint}>({TITLE_HINT})</span>
          </span>
          <input name="pageTitle" defaultValue={content.pageTitle} maxLength={120} required />
        </label>
        <label>
          <span>Introduction</span>
          <textarea name="intro" defaultValue={content.intro} rows={10} maxLength={2400} required />
        </label>
      </section>

      <SaveBar pending={pending} message={message} />
    </form>
  );
}
