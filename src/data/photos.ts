export type CategorySlug = "families" | "couples";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: CategorySlug;
  title?: string;
  cover?: boolean;
};

export type Category = {
  slug: CategorySlug;
  label: string;
  heading: string;
  tagline: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "families",
    label: "Families",
    heading: "Family Photography",
    tagline: "Real connection, unhurried",
    description:
      "Family photos should feel effortless, natural, and fun. As a husband-and-wife team, we work together to create a relaxed, enjoyable experience while capturing genuine moments against Colorado’s beautiful backdrops—whether you have a favorite location in mind or let us find the perfect spot for you.",
  },
  {
    slug: "couples",
    label: "Couples",
    heading: "Couples Shoots",
    tagline: "Quiet moments, honest light",
    description:
      "Whether you’re just beginning your journey together or have been married for decades, we’re here to capture the love and connection that make your relationship unique. From candid laughter to quiet, intimate moments, we’ll help you create beautiful memories to look back on for years to come.",
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

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
  { id: "c01", src: "/images/galleries/couples/couple-01.webp", width: 1500, height: 2250, alt: "A couple laughing together in autumn light, she in a red dress and he in a soft blue sweater", category: "couples", cover: true },
  { id: "c02", src: "/images/galleries/couples/couple-02.webp", width: 1500, height: 2250, alt: "A woman in a red dress looking back at the camera with a smile as her partner stands softly blurred in the foreground", category: "couples" },
  { id: "c03", src: "/images/galleries/couples/couple-03.webp", width: 1500, height: 1000, alt: "A woman in a red dress resting her head in her partner's lap on a park bench among autumn trees", category: "couples" },
  { id: "c04", src: "/images/galleries/couples/couple-04.webp", width: 1500, height: 2250, alt: "A couple embracing beside a tree with a creek and a red footbridge behind them", category: "couples" },
  { id: "c05", src: "/images/galleries/couples/couple-05.webp", width: 1500, height: 2250, alt: "A couple kissing in an embrace beside a creek in autumn", category: "couples" },
  { id: "c06", src: "/images/galleries/couples/couple-06.webp", width: 1500, height: 1000, alt: "A man twirling his partner in a red dress on a dirt path beside the creek", category: "couples" },
  { id: "c07", src: "/images/galleries/couples/couple-07.webp", width: 1500, height: 1000, alt: "A couple holding each other close beside a creek under a wooden footbridge", category: "couples" },
  { id: "c08", src: "/images/galleries/couples/couple-08.webp", width: 1500, height: 2250, alt: "A man lifting his partner in a red dress into the air in a joyful embrace", category: "couples" },
  { id: "c09", src: "/images/galleries/couples/couple-09.webp", width: 1500, height: 1000, alt: "A couple sitting close together on a black park bench at dusk", category: "couples" },
  { id: "c10", src: "/images/galleries/couples/couple-10.webp", width: 1500, height: 2250, alt: "A couple leaning against a vintage double street lamp as the sky glows at sunset", category: "couples" },
  { id: "c11", src: "/images/galleries/couples/couple-11.webp", width: 1500, height: 2250, alt: "A woman swinging playfully around a lamp post in a park at dusk", category: "couples" },
  { id: "c12", src: "/images/galleries/couples/couple-12.webp", width: 1500, height: 1000, alt: "A couple walking hand in hand along a path under a pastel evening sky", category: "couples" },
  { id: "c13", src: "/images/galleries/couples/couple-13.webp", width: 1500, height: 1000, alt: "A couple walking through a town square with a lit Christmas tree at twilight", category: "couples" },
  { id: "c14", src: "/images/galleries/couples/couple-14.webp", width: 1500, height: 1000, alt: "A couple pressing foreheads together against glowing bokeh lights at night", category: "couples" },
  { id: "c15", src: "/images/galleries/couples/couple-15.webp", width: 1500, height: 1000, alt: "A couple embracing and smiling at each other in front of softly glowing string lights", category: "couples" },
  { id: "c16", src: "/images/galleries/couples/couple-16.webp", width: 1500, height: 1000, alt: "A couple hugging in the dark with warm string lights glowing behind them", category: "couples" },
  { id: "c17", src: "/images/galleries/couples/couple-17.webp", width: 1500, height: 1000, alt: "A couple sitting together in front of a giant glowing LOVE sign at night", category: "couples" },
  { id: "c18", src: "/images/galleries/couples/couple-18.webp", width: 1500, height: 1000, alt: "A couple sharing a quiet moment beside a shop window with festive lights behind them", category: "couples" },
  { id: "f01", src: "/images/galleries/families/family-01.webp", width: 1500, height: 1000, alt: "A couple holding their newborn on a paved path with red rock formations behind them", category: "families" },
  { id: "f02", src: "/images/galleries/families/family-02.webp", width: 1500, height: 2250, alt: "A father holding his newborn on a trail among the red rocks", category: "families" },
  { id: "f03", src: "/images/galleries/families/family-03.webp", width: 1500, height: 2000, alt: "Parents kissing while holding their baby on a blanket, red rocks rising behind", category: "families" },
  { id: "f04", src: "/images/galleries/families/family-04.webp", width: 1500, height: 2250, alt: "Parents sitting on a blanket with their newborn beneath a sloping red rock", category: "families" },
  { id: "f05", src: "/images/galleries/families/family-05.webp", width: 1500, height: 2250, alt: "A mother laughing as she cradles her newborn", category: "families", cover: true },
  { id: "f06", src: "/images/galleries/families/family-06.webp", width: 1500, height: 1125, alt: "Black and white close-up of a mother smiling down at her newborn while a father looks on", category: "families" },
  { id: "f07", src: "/images/galleries/families/family-07.webp", width: 1500, height: 1000, alt: "A couple embracing on a path in golden light with red rocks behind", category: "families" },
  { id: "f08", src: "/images/galleries/families/family-08.webp", width: 1500, height: 2250, alt: "A family of four posed beside a wooden fence with red rocks behind them", category: "families" },
  { id: "f09", src: "/images/galleries/families/family-09.webp", width: 1500, height: 2250, alt: "Close-up of a couple in profile about to kiss, red rocks softly blurred behind", category: "families" },
  { id: "f10", src: "/images/galleries/families/family-10.webp", width: 1500, height: 2250, alt: "A couple embracing on a dirt trail", category: "families" },
  { id: "f11", src: "/images/galleries/families/family-11.webp", width: 1500, height: 2250, alt: "A family walking hand in hand down a trail toward the camera", category: "families" },
  { id: "f12", src: "/images/galleries/families/family-12.webp", width: 1500, height: 2250, alt: "A mother and her teenage son smiling together", category: "families" },
  { id: "f13", src: "/images/galleries/families/family-13.webp", width: 1500, height: 1000, alt: "A multi-generational family gathered together among the red rocks", category: "families" },
  { id: "f14", src: "/images/galleries/families/family-14.webp", width: 1500, height: 2250, alt: "A father lifting his son high while a mother holds their daughter", category: "families" },
  { id: "f15", src: "/images/galleries/families/family-15.webp", width: 1500, height: 2250, alt: "Grandfather and grandchildren posed with their parents in front of red rocks", category: "families" },
  { id: "f16", src: "/images/galleries/families/family-16.webp", width: 1500, height: 1000, alt: "Three generations of women laughing together with a baby", category: "families" },
  { id: "f17", src: "/images/galleries/families/family-17.webp", width: 1500, height: 1000, alt: "A mother and her young son on a long dirt path lined with split-rail fence", category: "families" },
  { id: "f18", src: "/images/galleries/families/family-18.webp", width: 1500, height: 1000, alt: "A young boy running joyfully down a dirt trail", category: "families" },
];

export function getPhotosByCategory(slug: CategorySlug) {
  return PHOTOS.filter((photo) => photo.category === slug);
}

const GALLERY_ROWS: Partial<Record<CategorySlug, string[][]>> = {
  families: [
    ["f01"],
    ["f02", "f03", "f05"],
    ["f06", "f04"],
    ["f13"],
    ["f08", "f10", "f11"],
    ["f07", "f09"],
    ["f16"],
    ["f12", "f14", "f15"],
    ["f17", "f18"],
  ],
  couples: [
    ["c03"],
    ["c01", "c02", "c04"],
    ["c05", "c06"],
    ["c08", "c07"],
    ["c09"],
    ["c10", "c11", "c12"],
    ["c13"],
    ["c14", "c15"],
    ["c16", "c18"],
    ["c17"],
  ],
};

const FALLBACK_ROW_SIZE = 3;

export function getGalleryRows(slug: CategorySlug): Photo[][] {
  const photos = getPhotosByCategory(slug);
  const layout = GALLERY_ROWS[slug];
  if (!layout) {
    const rows: Photo[][] = [];
    for (let i = 0; i < photos.length; i += FALLBACK_ROW_SIZE) {
      rows.push(photos.slice(i, i + FALLBACK_ROW_SIZE));
    }
    return rows;
  }
  return layout.map((ids) =>
    ids
      .map((id) => photos.find((photo) => photo.id === id))
      .filter((photo): photo is Photo => photo !== undefined),
  );
}
