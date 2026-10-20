export const CONTACT_PREFILL_EVENT = "contact:prefill";

export type ContactPrefill = {
  topic: string;
  message?: string;
};

export function prefillContact(detail: ContactPrefill) {
  window.dispatchEvent(new CustomEvent<ContactPrefill>(CONTACT_PREFILL_EVENT, { detail }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
