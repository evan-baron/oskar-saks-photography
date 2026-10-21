import "server-only";
import { randomBytes } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { MEDIA_FORMATS, MEDIA_UPLOAD_TAG, mediaFolder } from "@/lib/media";

function readConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

function configured() {
  const config = readConfig();
  if (!config) return null;
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  });
  return config;
}

export function isMediaConfigured() {
  return readConfig() !== null;
}

export function mediaUrl(publicId: string) {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME ?? ""}/image/upload/${publicId}`;
}

// Signed parameters the browser posts straight to Cloudinary, so image bytes never pass through the server.
export function signMediaUpload(category: string) {
  const config = configured();
  if (!config) return null;

  const folder = mediaFolder(category);
  const params = {
    asset_folder: folder,
    allowed_formats: MEDIA_FORMATS.join(","),
    overwrite: "false",
    public_id: `${folder}/${randomBytes(9).toString("hex")}`,
    tags: MEDIA_UPLOAD_TAG,
    timestamp: Math.floor(Date.now() / 1000),
  };
  const signature = cloudinary.utils.api_sign_request(params, config.apiSecret);
  return { cloudName: config.cloudName, apiKey: config.apiKey, signature, params };
}

export type UploadedImage = { width: number; height: number; bytes: number; format: string };

export async function fetchUploadedImage(publicId: string): Promise<UploadedImage | null> {
  if (!configured()) return null;
  try {
    const resource = await cloudinary.api.resource(publicId, { resource_type: "image" });
    return { width: resource.width, height: resource.height, bytes: resource.bytes, format: resource.format };
  } catch {
    return null;
  }
}

export async function markImagesAttached(publicIds: string[]) {
  if (publicIds.length === 0 || !configured()) return;
  await cloudinary.uploader.remove_tag(MEDIA_UPLOAD_TAG, publicIds);
}

export async function destroyImages(publicIds: string[]) {
  if (publicIds.length === 0 || !configured()) return;
  await cloudinary.api.delete_resources(publicIds, { resource_type: "image", type: "upload" });
}
