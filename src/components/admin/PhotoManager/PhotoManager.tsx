"use client";

import { useEffect, useId, useRef, useState, useTransition, type ChangeEvent } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  addPhotoAction,
  deletePhotoAction,
  reorderPhotosAction,
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
};

type AdminCategory = {
  slug: string;
  label: string;
  heading: string;
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
        <strong>Drag a photo by its image</strong> to reorder; the others shift to make room. The gallery shows photos in
        three columns at their natural shape, uncropped, placing each one in the shortest column, so the order reads
        left to right. The <strong>cover</strong> is the photo shown on the gallery cards.
      </p>
      {category.photos.length === 0 ? (
        <p className={styles.empty}>No photos in this gallery yet. Upload some above.</p>
      ) : (
        <SortableGrid
          key={`${category.slug}:${category.photos.map((photo) => `${photo.id}.${photo.alt}.${photo.title}.${photo.cover}`).join("|")}`}
          slug={category.slug}
          photos={category.photos}
        />
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
      <p className={styles.hint}>JPG, PNG or WebP, up to 10 MB each. New photos are added to the end; edit the alt text afterwards.</p>
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

function SortableGrid({ slug, photos }: { slug: string; photos: AdminPhoto[] }) {
  const [items, setItems] = useState(photos);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Mouse drags start after a few pixels (so clicks still work); touch needs a short press so scrolling isn't hijacked.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 220, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((photo) => photo.id === active.id);
    const to = items.findIndex((photo) => photo.id === over.id);
    if (from === -1 || to === -1) return;

    const previous = items;
    const next = arrayMove(items, from, to);
    setItems(next);
    setError(null);
    startTransition(async () => {
      const result = await reorderPhotosAction({ category: slug, ids: next.map((photo) => photo.id) });
      if (!result.ok) {
        setItems(previous);
        setError(result.error);
      }
    });
  }

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      {/* A fixed id keeps the library's accessibility ids identical on the server and in the browser. */}
      <DndContext id={`photos-${slug}`} sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map((photo) => photo.id)} strategy={rectSortingStrategy}>
          <ul className={styles.grid}>
            {items.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}

function PhotoCard({ photo }: { photo: AdminPhoto }) {
  const [pending, startTransition] = useTransition();
  const { message, report } = useResult();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id });
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, startDelete] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function confirmDelete() {
    setDeleteError(null);
    startDelete(async () => {
      const result = await deletePhotoAction(photo.id);
      if (result.ok) setConfirmingDelete(false);
      else setDeleteError(result.error);
    });
  }

  // Checkboxes save as soon as they change, so there's no separate step to forget.
  const saveNow = (event: ChangeEvent<HTMLInputElement>) => event.currentTarget.form?.requestSubmit();

  return (
    <li
      ref={setNodeRef}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className={styles.handle} {...attributes} {...listeners} aria-label="Drag to reorder">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin previews use Cloudinary resizing directly */}
        <img
          src={photo.url.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_600/")}
          alt={photo.alt}
          loading="lazy"
          draggable={false}
        />
        <span className={styles.moveIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
          </svg>
        </span>
      </div>
      <form
        action={(formData) =>
          startTransition(async () => {
            report(
              await updatePhotoAction({
                id: photo.id,
                alt: String(formData.get("alt") ?? ""),
                title: String(formData.get("title") ?? ""),
                cover: formData.get("cover") === "on",
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
        <div className={styles.checks}>
          <label className={styles.check}>
            <input name="cover" type="checkbox" defaultChecked={photo.cover} onChange={saveNow} />
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
            onClick={() => setConfirmingDelete(true)}
          >
            Delete
          </button>
        </div>
        {message && <p className={message.error ? styles.error : styles.ok}>{message.text}</p>}
      </form>
      <DeleteDialog
        open={confirmingDelete}
        photo={photo}
        deleting={deleting}
        error={deleteError}
        onCancel={() => {
          if (deleting) return;
          setConfirmingDelete(false);
          setDeleteError(null);
        }}
        onConfirm={confirmDelete}
      />
    </li>
  );
}

type DeleteDialogProps = {
  open: boolean;
  photo: AdminPhoto;
  deleting: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteDialog({ open, photo, deleting, error, onCancel, onConfirm }: DeleteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onCancel}
      onCancel={(event) => {
        if (deleting) event.preventDefault();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- admin previews use Cloudinary resizing directly */}
      <img
        className={styles.dialogPreview}
        src={photo.url.replace("/upload/", "/upload/f_auto,q_auto,c_fill,w_160,h_160/")}
        alt=""
      />
      <h2 id={titleId} className={styles.dialogTitle}>
        Delete this photo?
      </h2>
      <p className={styles.dialogText}>
        This permanently removes it from the gallery and from Cloudinary. It can&rsquo;t be undone.
      </p>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.dialogActions}>
        <button type="button" className={styles.outline} disabled={deleting} onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className={styles.dangerSolid} disabled={deleting} onClick={onConfirm}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </dialog>
  );
}
