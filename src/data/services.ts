export type Service = {
  id: string;
  title: string;
  description: string;
  startingAt: number;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    id: "families",
    title: "Family Sessions",
    description:
      "Relaxed, natural sessions on location that capture how your family really is together, from big laughs to quiet in-between moments.",
    startingAt: 350,
    includes: ["60 minute session", "25 edited images", "Online gallery"],
  },
  {
    id: "couples",
    title: "Couples & Engagements",
    description:
      "Gentle direction and beautiful light for engagements, anniversaries, and milestones. Katya helps everyone feel at ease from the first minute.",
    startingAt: 400,
    includes: ["90 minute session", "35 edited images", "Online gallery"],
  },
  {
    id: "events",
    title: "Events & Weddings",
    description:
      "Unhurried, documentary coverage from getting ready to the last dance, so you can be present for all of it.",
    startingAt: 2400,
    includes: ["Up to 8 hours", "Full edited gallery", "Print release"],
  },
  {
    id: "prints",
    title: "Prints & Custom Work",
    description:
      "Fine-art prints of any image in the gallery, or a commission made for a specific space.",
    startingAt: 85,
    includes: ["Archival paper", "Signed and numbered", "Carefully packaged"],
  },
];
