import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero/PageHero";
import Services from "@/components/sections/Services/Services";
import { getServicesContent, renderTitle } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Family sessions, couples and engagements, events and weddings, and fine-art prints. See what's included and get in touch to book.",
};

export default async function ServicesPage() {
  const content = await getServicesContent();
  return (
    <>
      <PageHero eyebrow="Services" title={renderTitle(content.title)} lede={content.lede} />
      <Services />
    </>
  );
}
