"use server";

import { randomBytes } from "node:crypto";
import { updateTag } from "next/cache";
import { z } from "zod";
import { CATEGORIES } from "@/data/photos";
import { verifyAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { destroyImages, fetchUploadedImage, markImagesAttached, mediaUrl, signMediaUpload } from "@/lib/cloudinary";
import { MAX_MEDIA_BYTES, MEDIA_FORMATS, MEDIA_PUBLIC_ID_PATTERN, mediaFolder } from "@/lib/media";

export type ActionResult = { ok: true } | { ok: false; error: string };

const categorySchema = z.enum(CATEGORIES.map((category) => category.slug) as [string, ...string[]]);

const photoFields = {
  alt: z.string().trim().min(1, "Alt text is required").max(300),
  title: z.string().trim().max(120),
};

export async function signUploadAction(category: string) {
  await verifyAdmin();
  const parsed = categorySchema.safeParse(category);
  if (!parsed.success) return null;
  return signMediaUpload(parsed.data);
}

export async function addPhotoAction(input: { category: string; publicId: string; alt: string }): Promise<ActionResult> {
  await verifyAdmin();
  const category = categorySchema.safeParse(input.category);
  const alt = photoFields.alt.safeParse(input.alt);
  if (!category.success || !alt.success) return { ok: false, error: "Invalid photo details" };

  const { publicId } = input;
  if (!MEDIA_PUBLIC_ID_PATTERN.test(publicId) || !publicId.startsWith(`${mediaFolder(category.data)}/`)) {
    return { ok: false, error: "Invalid upload" };
  }

  const image = await fetchUploadedImage(publicId);
  if (!image || !MEDIA_FORMATS.includes(image.format)) return { ok: false, error: "Upload could not be verified" };
  if (image.bytes > MAX_MEDIA_BYTES) {
    await destroyImages([publicId]).catch(() => undefined);
    return { ok: false, error: "Photos must be 10 MB or smaller" };
  }

  const last = await db.photo.findFirst({
    where: { category: category.data },
    orderBy: [{ row: "desc" }, { position: "desc" }],
  });
  await db.photo.create({
    data: {
      id: `p${randomBytes(6).toString("hex")}`,
      cloudinaryPublicId: publicId,
      url: mediaUrl(publicId),
      width: image.width,
      height: image.height,
      alt: alt.data,
      category: category.data,
      cover: !last,
      row: last ? last.row + 1 : 0,
      position: 0,
    },
  });
  await markImagesAttached([publicId]).catch((error) => console.error("Failed to tag upload:", error));
  updateTag("photos");
  return { ok: true };
}

const updateSchema = z.object({
  id: z.string().min(1),
  ...photoFields,
  cover: z.boolean(),
  row: z.number().int().min(0).max(999),
  position: z.number().int().min(0).max(999),
});

export async function updatePhotoAction(input: z.input<typeof updateSchema>): Promise<ActionResult> {
  await verifyAdmin();
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid photo details" };

  const { id, cover, title, ...rest } = parsed.data;
  const photo = await db.photo.findUnique({ where: { id } });
  if (!photo) return { ok: false, error: "Photo not found" };

  await db.$transaction([
    ...(cover
      ? [db.photo.updateMany({ where: { category: photo.category, id: { not: id } }, data: { cover: false } })]
      : []),
    db.photo.update({ where: { id }, data: { ...rest, title: title || null, cover } }),
  ]);
  updateTag("photos");
  return { ok: true };
}

export async function deletePhotoAction(id: string): Promise<ActionResult> {
  await verifyAdmin();
  const photo = await db.photo.findUnique({ where: { id } });
  if (!photo) return { ok: false, error: "Photo not found" };

  await db.photo.delete({ where: { id } });
  if (photo.cover) {
    const next = await db.photo.findFirst({
      where: { category: photo.category },
      orderBy: [{ row: "asc" }, { position: "asc" }],
    });
    if (next) await db.photo.update({ where: { id: next.id }, data: { cover: true } });
  }
  await destroyImages([photo.cloudinaryPublicId]).catch((error) => console.error("Failed to delete image:", error));
  updateTag("photos");
  return { ok: true };
}

const copySchema = z.object({
  slug: categorySchema,
  heading: z.string().trim().min(1).max(120),
  tagline: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(1200),
});

export async function updateCategoryAction(input: z.input<typeof copySchema>): Promise<ActionResult> {
  await verifyAdmin();
  const parsed = copySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Heading, tagline and description are all required" };
  await db.category.upsert({ where: { slug: parsed.data.slug }, create: parsed.data, update: parsed.data });
  updateTag("categories");
  return { ok: true };
}
