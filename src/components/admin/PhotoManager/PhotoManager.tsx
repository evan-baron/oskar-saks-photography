"use client";

import { useRef, useState, useTransition } from "react";
import {
  addPhotoAction,
  deletePhotoAction,
  signUploadAction,
  updateCategoryAction,
  updatePhotoAction,
  type ActionResult,
} from "@/app/admin/actions";
import { MAX_MEDIA_BYTES, MEDIA_ACCEPT } from "@/lib/media";
import styles from "./photoManager.module.scss";

type AdminPhoto = {
  id: string;
  url: string;
  alt: string;
  title: string;
  cover: boolean;
  row: number;
  position: number;
};

type AdminCategory = {
  slug: string;
  label: string;
  heading: string;
  tagline: string;
  description: string;
  photos: AdminPhoto[];
};

export default function PhotoManager({ categories }: { categories: AdminCategory[] }) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const category = categories.find((item) => item.slug === active) ?? categories[0];
  if (!category) return null;

  return (
    <div className={styles.manager}>
      <div className={styles.tabs} role="tablist" aria-label="Galleries">
        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={item.slug === category.slug}
            className={item.slug === category.slug ? styles.tabActive : styles.tab}
            onClick={() => setActive(item.slug)}
          >
            {item.label} <span>{item.photos.length}</span>
          </button>
        ))}
      </div>
      <CopyEditor key={`copy-${category.slug}`} category={category} />
      <Uploader key={`up-${category.slug}`} slug={category.slug} />
      <p className={styles.hint}>
        Photos with the same <strong>row</strong> number share a row on the gallery page, ordered left to right by{" "}
        <strong>position</strong>. The cover photo is the one shown on the gallery cards.
      </p>
      {category.photos.length === 0 ? (
        <p className={styles.empty}>No photos in this gallery yet. Upload some above.</p>
      ) : (
        <ul className={styles.grid}>
          {category.photos.map((photo) => (
            <PhotoCard key={`${photo.id}-${photo.alt}-${photo.title}-${photo.cover}-${photo.row}-${photo.position}`} photo={photo} />
          ))}
        </ul>
      )}
    </div>
  );
}

function useResult() {
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const report = (result: ActionResult, success = "Saved") =>
    setMessage(result.ok ? { text: success, error: false } : { text: result.error, error: true });
  return { message, report, setMessage };
}

function CopyEditor({ category }: { category: AdminCategory }) {
  const [pending, startTransition] = useTransition();
  const { message, report } = useResult();

  return (
    <form
      className={styles.copy}
      action={(formData) =>
        startTransition(async () => {
          report(
            await updateCategoryAction({
              slug: category.slug,
              heading: String(formData.get("heading") ?? ""),
              tagline: String(formData.get("tagline") ?? ""),
              description: String(formData.get("description") ?? ""),
            }),
            "Copy saved",
          );
        })
      }
    >
      <h2>Page copy</h2>
      <label>
        <span>Heading</span>
        <input name="heading" defaultValue={category.heading} maxLength={120} required />
      </label>
      <label>
        <span>Tagline</span>
        <input name="tagline" defaultValue={category.tagline} maxLength={160} required />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" defaultValue={category.description} rows={4} maxLength={1200} required />
      </label>
      <div className={styles.actions}>
        <button type="submit" className={styles.primary} disabled={pending}>
          {pending ? "Saving…" : "Save copy"}
        </button>
        {message && <p className={message.error ? styles.error : styles.ok}>{message.text}</p>}
      </div>
    </form>
  );
}

type UploadItem = { name: string; status: "uploading" | "done" | "error"; error?: string };

function Uploader({ slug }: { slug: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>([]);

  const update = (index: number, patch: Partial<UploadItem>) =>
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  async function uploadOne(file: File, index: number) {
    if (!MEDIA_ACCEPT.split(",").includes(file.type)) return update(index, { status: "error", error: "Use a JPG, PNG or WebP" });
    if (file.size > MAX_MEDIA_BYTES) return update(index, { status: "error", error: "Over 10 MB" });

    const signed = await signUploadAction(slug);
    if (!signed) return update(index, { status: "error", error: "Uploads are unavailable" });

    const body = new FormData();
    body.append("file", file);
    body.append("api_key", signed.apiKey);
    body.append("signature", signed.signature);
    for (const [key, value] of Object.entries(signed.params)) body.append(key, String(value));

    const response = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, { method: "POST", body });
    if (!response.ok) return update(index, { status: "error", error: "Upload to Cloudinary failed" });
    const uploaded: { public_id: string } = await response.json();

    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || "Photograph";
    const result = await addPhotoAction({ category: slug, publicId: uploaded.public_id, alt });
    update(index, result.ok ? { status: "done" } : { status: "error", error: result.error });
  }

  async function onChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setItems(list.map((file) => ({ name: file.name, status: "uploading" })));
    for (const [index, file] of list.entries()) {
      try {
        await uploadOne(file, index);
      } catch {
        update(index, { status: "error", error: "Something went wrong" });
      }
    }
    if (input.current) input.current.value = "";
  }

  return (
    <section className={styles.upload}>
      <h2>Add photos</h2>
      <input ref={input} type="file" accept={MEDIA_ACCEPT} multiple onChange={(event) => onChange(event.target.files)} />
      <p className={styles.hint}>JPG, PNG or WebP, up to 10 MB each. New photos start in their own row at the end; edit the alt text afterwards.</p>
      {items.length > 0 && (
        <ul className={styles.uploads}>
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`} data-status={item.status}>
              {item.name} — {item.status === "uploading" ? "uploading…" : item.status === "done" ? "added" : item.error}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PhotoCard({ photo }: { photo: AdminPhoto }) {
  const [pending, startTransition] = useTransition();
  const { message, report } = useResult();

  return (
    <li className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element -- admin previews use Cloudinary resizing directly */}
      <img src={photo.url.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_600/")} alt={photo.alt} loading="lazy" />
      <form
        action={(formData) =>
          startTransition(async () => {
            report(
              await updatePhotoAction({
                id: photo.id,
                alt: String(formData.get("alt") ?? ""),
                title: String(formData.get("title") ?? ""),
                cover: formData.get("cover") === "on",
                row: Number(formData.get("row")),
                position: Number(formData.get("position")),
              }),
            );
          })
        }
      >
        <label>
          <span>Alt text</span>
          <textarea name="alt" defaultValue={photo.alt} rows={3} maxLength={300} required />
        </label>
        <label>
          <span>Title (optional)</span>
          <input name="title" defaultValue={photo.title} maxLength={120} />
        </label>
        <div className={styles.numbers}>
          <label>
            <span>Row</span>
            <input name="row" type="number" min={0} max={999} defaultValue={photo.row} required />
          </label>
          <label>
            <span>Position</span>
            <input name="position" type="number" min={0} max={999} defaultValue={photo.position} required />
          </label>
          <label className={styles.check}>
            <input name="cover" type="checkbox" defaultChecked={photo.cover} />
            <span>Cover</span>
          </label>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className={styles.danger}
            disabled={pending}
            onClick={() => {
              if (!window.confirm("Delete this photo permanently? This also removes it from Cloudinary.")) return;
              startTransition(async () => report(await deletePhotoAction(photo.id), "Deleted"));
            }}
          >
            Delete
          </button>
        </div>
        {message && <p className={message.error ? styles.error : styles.ok}>{message.text}</p>}
      </form>
    </li>
  );
}
