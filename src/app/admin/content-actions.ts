"use server";

import { updateTag } from "next/cache";
import { verifyAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import { CONTENT, type ContentKey } from "@/lib/contentSchema";
import type { ActionResult } from "./actions";

async function saveContent(key: ContentKey, input: unknown): Promise<ActionResult> {
  await verifyAdmin();
  const parsed = CONTENT[key].schema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path.findLast((part) => typeof part === "string");
    return { ok: false, error: issue ? `${field ? `${field}: ` : ""}${issue.message}` : "Please check the form and try again." };
  }
  await db.siteContent.upsert({ where: { key }, create: { key, data: parsed.data }, update: { data: parsed.data } });
  updateTag("content");
  return { ok: true };
}

export async function updateHomeContentAction(input: unknown) {
  return saveContent("home", input);
}

export async function updateAboutContentAction(input: unknown) {
  return saveContent("about", input);
}

// Services are saved as a whole list: order, additions and removals all arrive together.
export async function updateServicesContentAction(input: unknown) {
  return saveContent("services", input);
}
