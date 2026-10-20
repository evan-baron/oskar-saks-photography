export const SITE_NAME = "Oskar Saks Photography";
export const PHOTOGRAPHER = "Oskar Saks";
export const SITE_TAGLINE = "Photographs made with patience, light, and a little nerve.";
export const SITE_DESCRIPTION =
  "Oskar Saks is a photographer making portraits, weddings, and editorial work. Browse the gallery, order prints, and book a session.";
export const CONTACT_EMAIL = "hello@oskarsaks.com";
export const INSTAGRAM_URL = "https://instagram.com/";
export const INSTAGRAM_HANDLE = "@oskarsaks";
export const LOCATION = "Available for travel";
export const COPYRIGHT_YEAR = 2026;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "store", label: "Store" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
