import Hero from "@/components/sections/Hero/Hero";
import AboutIntro from "@/components/sections/About/AboutIntro";
import About from "@/components/sections/About/About";
import GalleryPreview from "@/components/sections/Gallery/GalleryPreview";
// import Store from "@/components/sections/Store/Store";
import Services from "@/components/sections/Services/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <About />
      <GalleryPreview />
      {/* <Store /> */}
      <Services preview />
    </>
  );
}
