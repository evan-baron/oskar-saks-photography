export type CategorySlug = "families" | "couples" | "events";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: CategorySlug;
  title?: string;
  cover?: boolean;
  featured?: boolean;
  tall?: boolean;
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
  {
    slug: "events",
    label: "Events",
    heading: "Events",
    tagline: "Energy, atmosphere, defining moments",
    description:
      "From dimly lit concert venues and dynamic dance performances to corporate celebrations and large-scale events, we capture the energy, atmosphere, and defining moments that make every occasion unique.",
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
  { id: "e01", src: "/images/galleries/events/event-01.webp", width: 1500, height: 1000, alt: "Guests clapping and watching a performance under purple stage lighting and string lights", category: "events" },
  { id: "e02", src: "/images/galleries/events/event-02.webp", width: 1500, height: 1000, alt: "A man and woman dancing mid-step with arms outstretched in front of a lit forest-silhouette backdrop", category: "events" },
  { id: "e03", src: "/images/galleries/events/event-03.webp", width: 1500, height: 1000, alt: "A wide, empty dance hall with tables set up along the windows and a sunlit hardwood floor", category: "events" },
  { id: "e04", src: "/images/galleries/events/event-04.webp", width: 1500, height: 1000, alt: "A gold and black feathered masquerade mask resting on a white tablecloth beneath string lights", category: "events" },
  { id: "e05", src: "/images/galleries/events/event-05.webp", width: 1500, height: 1000, alt: "A dance studio set for an autumn event with white-clothed tables and orange leaf garlands", category: "events" },
  { id: "e06", src: "/images/galleries/events/event-06.webp", width: 1500, height: 1000, alt: "Tables and white chairs arranged for a dinner beneath strings of warm lights in a dance studio", category: "events" },
  { id: "e07", src: "/images/galleries/events/event-07.webp", width: 1500, height: 1000, alt: "An audience seated at the far end of a dance floor under a disco ball and string lights", category: "events" },
  { id: "e08", src: "/images/galleries/events/event-08.webp", width: 1500, height: 2250, alt: "A woman in black speaking into a microphone and gesturing on a dance floor", category: "events" },
  { id: "e09", src: "/images/galleries/events/event-09.webp", width: 1500, height: 1000, alt: "A woman in a white top and red shorts dancing with a man in a black cape and hat", category: "events" },
  { id: "e10", src: "/images/galleries/events/event-10.webp", width: 1500, height: 1000, alt: "A couple in a playful swing dance dip on a dance floor dotted with light reflections", category: "events" },
  { id: "e11", src: "/images/galleries/events/event-11.webp", width: 1500, height: 1000, alt: "A man in black spinning a woman in a yellow dress during a swing dance", category: "events" },
  { id: "e12", src: "/images/galleries/events/event-12.webp", width: 1500, height: 2250, alt: "A woman in a sparkling black dress dancing with her partner in front of floor-to-ceiling windows at night", category: "events" },
  { id: "e13", src: "/images/galleries/events/event-13.webp", width: 1500, height: 2250, alt: "A woman in a red fringed dress posed in a dance frame with her partner", category: "events", cover: true },
  { id: "e14", src: "/images/galleries/events/event-14.webp", width: 1500, height: 1000, alt: "A hand flipping burgers on a smoking grill", category: "events" },
  { id: "e15", src: "/images/galleries/events/event-15.webp", width: 1500, height: 2250, alt: "A smiling pitmaster in a red hat and bow tie holding up two thick slices of smoked brisket", category: "events" },
  { id: "e16", src: "/images/galleries/events/event-16.webp", width: 1500, height: 1000, alt: "A mascot in an orange and navy jersey greeting children at an outdoor patio party", category: "events" },
  { id: "e17", src: "/images/galleries/events/event-17.webp", width: 1500, height: 1000, alt: "Guests chatting in a group on an evening patio under string lights", category: "events" },
  { id: "e18", src: "/images/galleries/events/event-18.webp", width: 1500, height: 1000, alt: "A woman in black smiling and talking with guests at a candlelit evening reception", category: "events" },
  { id: "e19", src: "/images/galleries/events/event-19.webp", width: 1500, height: 1000, alt: "A group of friends posing with a horse mascot in a shaded backyard", category: "events" },
  { id: "e20", src: "/images/galleries/events/event-20.webp", width: 1500, height: 1000, alt: "Guests mingling around a pergola and lounge furniture at a backyard party", category: "events" },
  { id: "e21", src: "/images/galleries/events/event-21.webp", width: 1500, height: 1000, alt: "A man in a cowboy hat and a woman in a fascinator laughing at a Derby-style party", category: "events" },
  { id: "e22", src: "/images/galleries/events/event-22.webp", width: 1500, height: 2250, alt: "A guitarist silhouetted by blue stage light while performing on a dark stage", category: "events" },
  { id: "e23", src: "/images/galleries/events/event-23.webp", width: 1500, height: 1000, alt: "A bassist in an embroidered western shirt playing under warm red stage lights", category: "events" },
  { id: "e24", src: "/images/galleries/events/event-24.webp", width: 1500, height: 1000, alt: "Party guests in a kitchen applauding and smiling, one in a bright red Denver shirt", category: "events" },
  { id: "e25", src: "/images/galleries/events/event-25.webp", width: 1500, height: 2250, alt: "Close-up of hands on a bass guitar neck, blurred in teal and red stage light", category: "events" },
  { id: "e26", src: "/images/galleries/events/event-26.webp", width: 1500, height: 1000, alt: "Women in fascinators and hats passing a tray of shot glasses and cheering", category: "events" },
  { id: "e27", src: "/images/galleries/events/event-27.webp", width: 1500, height: 2250, alt: "A bassist in a backwards cap playing on a red-lit stage", category: "events" },
  { id: "e28", src: "/images/galleries/events/event-28.webp", width: 1500, height: 2250, alt: "A vocalist in a cap singing into a microphone under purple stage light", category: "events" },
  { id: "e29", src: "/images/galleries/events/event-29.webp", width: 1500, height: 1000, alt: "Two band members performing on a red-lit stage, one leaning back mid-song", category: "events" },
  { id: "e30", src: "/images/galleries/events/event-30.webp", width: 1500, height: 1000, alt: "A woman in a blue fascinator laughing while pouring a drink", category: "events" },
  { id: "e31", src: "/images/galleries/events/event-31.webp", width: 1500, height: 1000, alt: "A guitarist whipping his hair as the band plays behind him on stage", category: "events" },
  { id: "e32", src: "/images/galleries/events/event-32.webp", width: 1500, height: 1000, alt: "Black and white shot of a crowd with raised hands at a concert", category: "events" },
  { id: "e33", src: "/images/galleries/events/event-33.webp", width: 1500, height: 2250, alt: "Black and white portrait of a singer in a patterned guitar strap, mid-song at the microphone", category: "events" },
  { id: "e34", src: "/images/galleries/events/event-34.webp", width: 1500, height: 1000, alt: "Black and white shot of two guitarists performing side by side on stage", category: "events" },
  { id: "e35", src: "/images/galleries/events/event-35.webp", width: 1500, height: 2250, alt: "A keyboardist adjusting his hair while playing a Nord Stage keyboard in blue and purple light", category: "events" },
  { id: "e36", src: "/images/galleries/events/event-36.webp", width: 1500, height: 1000, alt: "Three band members laughing and playing keyboards and guitar on a blue-lit stage", category: "events" },
  { id: "e37", src: "/images/galleries/events/event-37.webp", width: 1500, height: 1000, alt: "An instructor leading a line dance class in a log lodge decorated for Christmas", category: "events" },
  { id: "e38", src: "/images/galleries/events/event-38.webp", width: 1500, height: 1000, alt: "A smiling dance instructor in a blue top with students dancing behind her in a Christmas-decorated lodge", category: "events" },
  { id: "e39", src: "/images/galleries/events/event-39.webp", width: 1500, height: 844, alt: "A couple in a ballroom hold waltzing across a warm wooden dance floor", category: "events" },
  { id: "e40", src: "/images/galleries/events/event-40.webp", width: 1500, height: 1000, alt: "A dancer in a white tulle gown dipped by her partner between two Christmas trees in front of a stone fireplace", category: "events" },
  { id: "e41", src: "/images/galleries/events/event-41.webp", width: 1500, height: 1000, alt: "Two dancers in a dramatic Latin pose on a hardwood floor inside a log lodge", category: "events" },
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
  events: [
    ["e41"],
    ["e12", "e13", "e08"],
    ["e09", "e11"],
    ["e10"],
    ["e23"],
    ["e22", "e27", "e28"],
    ["e29", "e31"],
    ["e36"],
    ["e25", "e35", "e33"],
    ["e34", "e32"],
    ["e37"],
    ["e38", "e39"],
    ["e40"],
    ["e01", "e02"],
    ["e17", "e18"],
    ["e21"],
    ["e15", "e14"],
    ["e19"],
    ["e16", "e20"],
    ["e24", "e26"],
    ["e30", "e04"],
    ["e03"],
    ["e05", "e06"],
    ["e07"],
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
