"use client";

import { updateHomeContentAction } from "@/app/admin/content-actions";
import type { HomeContent } from "@/lib/contentSchema";
import SaveBar from "./SaveBar";
import { TITLE_HINT } from "./hints";
import { useSave } from "./useSave";
import styles from "./contentEditor.module.scss";

export default function HomeEditor({ content }: { content: HomeContent }) {
  const { pending, message, save } = useSave();

  return (
    <form
      className={styles.form}
      action={(formData) =>
        save(() =>
          updateHomeContentAction({
            heroEyebrow: String(formData.get("heroEyebrow") ?? ""),
            heroTitle: String(formData.get("heroTitle") ?? ""),
            heroTagline: String(formData.get("heroTagline") ?? ""),
            galleryEyebrow: String(formData.get("galleryEyebrow") ?? ""),
            galleryTitle: String(formData.get("galleryTitle") ?? ""),
          }),
        )
      }
    >
      <section className={styles.panel}>
        <h2>Hero</h2>
        <label>
          <span>Small line above the headline</span>
          <input name="heroEyebrow" defaultValue={content.heroEyebrow} maxLength={80} required />
        </label>
        <label>
          <span>
            Headline <span className={styles.labelHint}>(two lines; {TITLE_HINT})</span>
          </span>
          <textarea name="heroTitle" defaultValue={content.heroTitle} rows={2} maxLength={120} required />
        </label>
        <label>
          <span>Tagline</span>
          <textarea name="heroTagline" defaultValue={content.heroTagline} rows={2} maxLength={240} required />
        </label>
      </section>

      <section className={styles.panel}>
        <h2>Galleries section</h2>
        <p className={styles.hint}>The heading above the gallery cards. The cards themselves are edited under Galleries.</p>
        <label>
          <span>Small line above the heading</span>
          <input name="galleryEyebrow" defaultValue={content.galleryEyebrow} maxLength={80} required />
        </label>
        <label>
          <span>
            Heading <span className={styles.labelHint}>{TITLE_HINT}</span>
          </span>
          <input name="galleryTitle" defaultValue={content.galleryTitle} maxLength={80} required />
        </label>
      </section>

      <SaveBar pending={pending} message={message} />
    </form>
  );
}
