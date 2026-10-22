import { COLUMN_OPTIONS, DEFAULT_COLUMNS, type ColumnCount } from "@/lib/galleryLayout";

const STORAGE_KEY = "gallery-columns";
const listeners = new Set<() => void>();

// The chosen column count is remembered in this browser and shared by every gallery. Storage can be blocked, so it is only ever a bonus.
export function readColumns(): ColumnCount {
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    return COLUMN_OPTIONS.find((option) => option === stored) ?? DEFAULT_COLUMNS;
  } catch {
    return DEFAULT_COLUMNS;
  }
}

export function writeColumns(count: ColumnCount) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(count));
  } catch {
    // Not persisted; the choice still applies until the page is reloaded.
  }
  memory = count;
  listeners.forEach((listener) => listener());
}

// Falls back to this when storage is unavailable, so the buttons still respond.
let memory: ColumnCount | null = null;

export function currentColumns(): ColumnCount {
  return memory ?? readColumns();
}

export function subscribeToColumns(onChange: () => void) {
  // A change made in another tab arrives as a storage event; storage is the truth again.
  const onStorage = () => {
    memory = null;
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}
