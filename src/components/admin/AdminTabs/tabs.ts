export const ADMIN_TABS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export type AdminTabId = (typeof ADMIN_TABS)[number]["id"];

export function parseTab(value: string | undefined): AdminTabId {
  return ADMIN_TABS.find((tab) => tab.id === value)?.id ?? "home";
}
