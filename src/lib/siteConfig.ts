export const SITE_NAME = "Oskar Saks Photography";
export const PHOTOGRAPHER = "Oskar Saks";
export const SITE_TAGLINE = "Authentic moments, beautiful light, and memories that last a lifetime.";
export const SITE_DESCRIPTION =
  "Oskar Saks is a Denver photographer capturing families, couples, and events across Colorado. Browse the galleries and book a session.";
export const CONTACT_EMAIL = "oskarsaksphoto@gmail.com";
// Username only, without the @. Contact details are editable in the admin; these are the defaults.
export const INSTAGRAM_HANDLE = "oskarsaksphoto";
export const instagramUrl = (handle: string) => `https://instagram.com/${handle}`;
export const LOCATION = "Denver";
export const COPYRIGHT_YEAR = 2026;

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  // { id: "store", label: "Store", href: "/#store" },
  { id: "services", label: "Services", href: "/services" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];

// The address people reach the site at. oskarsaksphoto.com redirects (308) to the www host, so www is the canonical one that
// canonical links, the sitemap and share images must use.
const PRODUCTION_URL = "https://www.oskarsaksphoto.com";

// NEXT_PUBLIC_SITE_URL overrides it (e.g. to test another domain); otherwise production builds use the real site and local
// development uses localhost.
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
}
