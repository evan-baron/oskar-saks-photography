export type Print = {
  id: string;
  photoId: string;
  title: string;
  detail: string;
  price: number;
};

export const PRINTS: Print[] = [
  { id: "print-1", photoId: "f05", title: "Red Rocks Laughter", detail: "Archival pigment print, 12 × 16 in", price: 85 },
  { id: "print-2", photoId: "c04", title: "Autumn Creek", detail: "Archival pigment print, 16 × 24 in", price: 140 },
  { id: "print-3", photoId: "c10", title: "Evening Lamplight", detail: "Archival pigment print, 12 × 18 in", price: 95 },
  { id: "print-4", photoId: "c17", title: "Love Lights", detail: "Archival pigment print, 20 × 20 in", price: 160 },
];
