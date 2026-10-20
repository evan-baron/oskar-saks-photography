import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Gallery from "@/components/sections/Gallery/Gallery";
import Store from "@/components/sections/Store/Store";
import Services from "@/components/sections/Services/Services";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Store />
      <Services />
      <Contact />
    </>
  );
}
