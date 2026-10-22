import { Fragment, type ReactNode } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { CONTENT, type ContentKey } from "@/lib/contentSchema";

type Content<K extends ContentKey> = (typeof CONTENT)[K]["defaults"];

// Copy is editable in the admin; the defaults in src/lib/contentSchema.ts are the fallback for a page nobody has edited.
async function loadContent<K extends ContentKey>(key: K): Promise<Content<K>> {
  "use cache";
  cacheTag("content");
  cacheLife("days");
  const row = await db.siteContent.findUnique({ where: { key } });
  const parsed = row && CONTENT[key].schema.safeParse(row.data);
  return (parsed && parsed.success ? parsed.data : CONTENT[key].defaults) as Content<K>;
}

export const getHomeContent = () => loadContent("home");
export const getAboutContent = () => loadContent("about");
export const getServicesContent = () => loadContent("services");
export const getContactContent = () => loadContent("contact");

// "Two People\nOne Shared *Vision*": a line break stays a break, *word* becomes <em>.
export function renderTitle(value: string): ReactNode {
  return value.split("\n").map((line, lineIndex) => [
    lineIndex > 0 ? <br key={`br-${lineIndex}`} /> : null,
    ...line.split(/\*([^*]+)\*/).map((part, index) =>
      index % 2 === 1 ? <em key={`${lineIndex}-${index}`}>{part}</em> : <Fragment key={`${lineIndex}-${index}`}>{part}</Fragment>,
    ),
  ]);
}
