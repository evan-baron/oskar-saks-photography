type Layoutable = { width: number; height: number };

export const COLUMNS = 3;

// More columns on very wide screens. Keep these widths in sync with the matching media queries in
// categoryPage.module.scss, which lets the gallery span the full screen from the first one.
export const WIDE_COLUMNS_FROM = 1800;
export const ULTRAWIDE_COLUMNS_FROM = 2400;

export function columnsForWidth(width: number) {
  if (width >= ULTRAWIDE_COLUMNS_FROM) return 5;
  if (width >= WIDE_COLUMNS_FROM) return 4;
  return COLUMNS;
}

// Approximate gap between stacked photos, as a fraction of column width, so column heights stay balanced.
const GAP_ALLOWANCE = 0.03;

// Masonry (three columns by default): every photo fills its column's width at its natural shape (nothing is cropped), and each photo goes
// into whichever column is currently shortest. That keeps the column bottoms close together while the photos
// still read in order, left to right and top to bottom.
export function buildColumns<T extends Layoutable>(photos: T[], count = COLUMNS): T[][] {
  const columns: T[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);
  for (const photo of photos) {
    let shortest = 0;
    for (let index = 1; index < count; index += 1) if (heights[index] < heights[shortest] - 1e-9) shortest = index;
    columns[shortest].push(photo);
    heights[shortest] += photo.height / photo.width + GAP_ALLOWANCE;
  }
  return columns;
}
