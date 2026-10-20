export type Print = {
  id: string;
  photoId: string;
  title: string;
  detail: string;
  price: number;
};

export const PRINTS: Print[] = [
  { id: "print-1", photoId: "p01", title: "Window Light", detail: "Archival pigment print, 12 × 16 in", price: 85 },
  { id: "print-2", photoId: "p02", title: "Long Road North", detail: "Archival pigment print, 16 × 24 in", price: 140 },
  { id: "print-3", photoId: "p09", title: "Golden Hour", detail: "Archival pigment print, 12 × 18 in", price: 95 },
  { id: "print-4", photoId: "p11", title: "Harbour Fog", detail: "Archival pigment print, 20 × 20 in", price: 160 },
];
