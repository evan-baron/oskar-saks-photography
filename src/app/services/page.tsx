import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero/PageHero";
import Services from "@/components/sections/Services/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Family sessions, couples and engagements, events and weddings, and fine-art prints. See what's included and get in touch to book.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Ways to <em>work together</em>
          </>
        }
        lede="Every session is built around you. Here's what's included, with starting prices to help you plan. Reach out for a custom quote."
      />
      <Services />
    </>
  );
}
