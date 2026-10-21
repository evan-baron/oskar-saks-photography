"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { verifyAdmin } from "@/lib/dal";
import { db } from "@/lib/db";

export type PasswordState = { error?: string };

const MIN_LENGTH = 12;
const COMMON = new Set(["password", "password123", "123456789012", "qwertyuiopas", "administrator"]);

const schema = z
  .object({
    current: z.string().min(1, "Enter your current password."),
    next: z
      .string()
      .min(MIN_LENGTH, `Use at least ${MIN_LENGTH} characters.`)
      .max(200)
      .refine((value) => !COMMON.has(value.toLowerCase()), "That password is too common."),
    confirm: z.string(),
  })
  .refine((data) => data.next === data.confirm, { message: "The new passwords don't match.", path: ["confirm"] })
  .refine((data) => data.next !== data.current, { message: "Choose a different password than the current one.", path: ["next"] });

export async function changePassword(_prev: PasswordState, formData: FormData): Promise<PasswordState> {
  const user = await verifyAdmin({ allowTemporaryPassword: true });

  const parsed = schema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };

  const record = await db.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
  if (!record || !(await bcrypt.compare(parsed.data.current, record.passwordHash))) {
    return { error: "Your current password is incorrect." };
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(parsed.data.next, 12), mustChangePassword: false },
  });
  redirect("/admin");
}
