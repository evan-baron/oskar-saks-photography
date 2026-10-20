export type Service = {
  id: string;
  title: string;
  description: string;
  startingAt: number;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    id: "portraits",
    title: "Portraits",
    description:
      "Individuals, couples, and families photographed in natural light, on location or in studio.",
    startingAt: 350,
    includes: ["60 minute session", "25 edited images", "Online gallery"],
  },
  {
    id: "weddings",
    title: "Weddings & Events",
    description:
      "Unhurried, documentary coverage from getting ready to the last dance, so you can be present for all of it.",
    startingAt: 2400,
    includes: ["Up to 8 hours", "Full edited gallery", "Print release"],
  },
  {
    id: "editorial",
    title: "Editorial & Brand",
    description:
      "Campaign, lookbook, and magazine work with a clear visual direction, built around your story.",
    startingAt: 1200,
    includes: ["Half or full day", "Pre-production call", "Licensed usage"],
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
