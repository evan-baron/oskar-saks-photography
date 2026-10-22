import PageHero from "@/components/ui/PageHero/PageHero";
import { getAboutContent, renderTitle } from "@/lib/siteContent";

// "Hi, I'm Oskar": the same introduction the About page opens with, shown on the home page above the About section.
// It carries the home page's "about" id, so the nav's About tab lights up from here.
export default async function AboutIntro() {
  const content = await getAboutContent();
  return (
    <PageHero
      asSection={{ id: "about" }}
      eyebrow="About"
      title={renderTitle(content.pageTitle)}
      lede={content.intro}
      portrait={{ src: "/images/oskar.webp", alt: "Portrait of photographer Oskar Saks" }}
    />
  );
}
