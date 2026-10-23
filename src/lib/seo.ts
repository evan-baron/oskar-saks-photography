import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/siteConfig";

// The picture shown when a link to the site is shared (public/og.jpg, 1200×630).
export const SHARE_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Oskar Saks Photo logo: a camera aperture forming the letter O, with the letters S and P beside it",
};

type PageMetadataInput = {
  // Shown in the tab and search results; the layout's template adds the site name. Leave out for the home page.
  title?: string;
  description: string;
  // The page's own address, e.g. "/about". Search engines treat it as the preferred URL for the page.
  path: string;
};

// Title, description, canonical address and share cards for a page. The share cards are set here rather than once in the layout
// because a page that defines its own openGraph replaces the layout's whole openGraph, image included.
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const shareTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", title: shareTitle, description, url: path, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [SHARE_IMAGE.url] },
  };
}
