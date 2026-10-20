export type PhotoCategory = "Portrait" | "Wedding" | "Travel" | "Editorial";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: PhotoCategory;
  title: string;
};

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  "Portrait",
  "Wedding",
  "Travel",
  "Editorial",
];

export const HERO_PHOTO = {
  src: "/images/hero.webp",
  width: 2000,
  height: 1335,
  alt: "A couple walking arm in arm through falling snow",
};

export const ABOUT_PHOTO = {
  src: "/images/about.webp",
  width: 2500,
  height: 3333,
  alt: "Oskar and Katya smiling together beneath a string-lit tree in golden evening light",
};

export const PHOTOS: Photo[] = [
  { id: "p01", src: "/images/gallery-01.svg", width: 1200, height: 1500, alt: "Placeholder photograph 01", category: "Portrait", title: "Window Light" },
  { id: "p02", src: "/images/gallery-02.svg", width: 1800, height: 1200, alt: "Placeholder photograph 02", category: "Travel", title: "Long Road North" },
  { id: "p03", src: "/images/gallery-03.svg", width: 1200, height: 1200, alt: "Placeholder photograph 03", category: "Wedding", title: "First Look" },
  { id: "p04", src: "/images/gallery-04.svg", width: 1200, height: 1800, alt: "Placeholder photograph 04", category: "Editorial", title: "Studio Study" },
  { id: "p05", src: "/images/gallery-05.svg", width: 1800, height: 1200, alt: "Placeholder photograph 05", category: "Wedding", title: "The Vows" },
  { id: "p06", src: "/images/gallery-06.svg", width: 1200, height: 1500, alt: "Placeholder photograph 06", category: "Portrait", title: "Quiet Hours" },
  { id: "p07", src: "/images/gallery-07.svg", width: 1200, height: 1200, alt: "Placeholder photograph 07", category: "Travel", title: "Salt and Stone" },
  { id: "p08", src: "/images/gallery-08.svg", width: 1200, height: 1800, alt: "Placeholder photograph 08", category: "Editorial", title: "Silk" },
  { id: "p09", src: "/images/gallery-09.svg", width: 1800, height: 1200, alt: "Placeholder photograph 09", category: "Portrait", title: "Golden Hour" },
  { id: "p10", src: "/images/gallery-10.svg", width: 1200, height: 1500, alt: "Placeholder photograph 10", category: "Wedding", title: "After the Dance" },
  { id: "p11", src: "/images/gallery-11.svg", width: 1200, height: 1200, alt: "Placeholder photograph 11", category: "Travel", title: "Harbour Fog" },
  { id: "p12", src: "/images/gallery-12.svg", width: 1200, height: 1800, alt: "Placeholder photograph 12", category: "Editorial", title: "Hard Light" },
];
