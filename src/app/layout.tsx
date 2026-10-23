import { Suspense, ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import { DM_Mono, Young_Serif, Schibsted_Grotesk } from "next/font/google";
import SiteHeader from "@/components/layout/Header/SiteHeader";
import ContactSection from "@/components/sections/Contact/ContactSection";
import Footer from "@/components/layout/Footer/Footer";
import HideOnAdmin from "@/components/layout/HideOnAdmin/HideOnAdmin";
import AdminShortcut from "@/components/layout/AdminShortcut/AdminShortcut";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { SHARE_IMAGE } from "@/lib/seo";
import {
  PHOTOGRAPHER,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  getSiteUrl,
} from "@/lib/siteConfig";
import "./reset.css";
import "./globals.scss";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PHOTOGRAPHER }],
  creator: PHOTOGRAPHER,
  keywords: [
    "Denver photographer",
    "Colorado photographer",
    "family photography",
    "couples photography",
    "engagement photos",
    "event photography",
    "concert photography",
    "Oskar Saks",
  ],
  // Favicons live in /public; there is no app/favicon.ico, so each is linked here.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
  // Defaults for any page that doesn't call pageMetadata(); the pages that do replace these with their own.
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [SHARE_IMAGE.url] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f7fb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${youngSerif.variable} ${schibsted.variable} ${dmMono.variable}`}
    >
      <body>
        <SiteJsonLd />
        <SiteHeader />
        <ViewTransition>
          <main>{children}</main>
        </ViewTransition>
        <HideOnAdmin>
          <ContactSection />
        </HideOnAdmin>
        <Footer />
        <Suspense fallback={null}>
          <AdminShortcut />
        </Suspense>
      </body>
    </html>
  );
}
