type Layoutable = { width: number; height: number };

// Column counts the viewer can pick between in the gallery's "viewing style" control.
export const COLUMN_OPTIONS = [2, 3, 5, 7] as const;
export type ColumnCount = (typeof COLUMN_OPTIONS)[number];
export const DEFAULT_COLUMNS: ColumnCount = 5;

// Below this width the control only offers two or three columns (three by default); 5 and 7 need the extra room. Keep it in
// sync with the matching media queries in photoGrid.module.scss and categoryPage.module.scss (.bodyWide).
export const WIDE_COLUMNS_FROM = 1800;
export const NARROW_COLUMNS: ColumnCount = 3;
export const NARROW_OPTIONS: readonly ColumnCount[] = [2, 3];

// Approximate gap between stacked photos, as a fraction of column width, so column heights stay balanced.
const GAP_ALLOWANCE = 0.03;

// Masonry (the column count is the viewer's choice): every photo fills its column's width at its natural shape (nothing is cropped), and each photo goes
// into whichever column is currently shortest. That keeps the column bottoms close together while the photos
// still read in order, left to right and top to bottom.
export function buildColumns<T extends Layoutable>(photos: T[], count: number = DEFAULT_COLUMNS): T[][] {
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
