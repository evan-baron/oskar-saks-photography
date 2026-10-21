export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;
export const MEDIA_FORMATS = ["jpg", "jpeg", "png", "webp"];
export const MEDIA_ACCEPT = "image/jpeg,image/png,image/webp";
export const MEDIA_UPLOAD_TAG = "pending-gallery-upload";
export const MEDIA_FOLDER = "oskar-saks/gallery";
export const MEDIA_PUBLIC_ID_PATTERN = /^oskar-saks\/gallery\/(families|couples|events)\/[A-Za-z0-9_-]{2,40}$/;

export function mediaFolder(category: string) {
  return `${MEDIA_FOLDER}/${category}`;
}
