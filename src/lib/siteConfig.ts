export const SITE_NAME = "Oskar Saks Photography";
export const PHOTOGRAPHER = "Oskar Saks";
export const SITE_TAGLINE = "Authentic moments, beautiful light, and memories that last a lifetime.";
export const SITE_DESCRIPTION =
  "Oskar Saks is a photographer photographing families and couples in Colorado. Browse the galleries, order prints, and book a session.";
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

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
