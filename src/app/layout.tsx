import { ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import { DM_Mono, Young_Serif, Schibsted_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/layout/Footer/Footer";
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
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero.webp", width: 2000, height: 1335 }],
  },
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
        <Header />
        <ViewTransition>
          <main>{children}</main>
        </ViewTransition>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
