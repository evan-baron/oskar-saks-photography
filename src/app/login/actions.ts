"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/session";

export type LoginState = { error?: string };

const loginSchema = z.object({ email: z.email().max(200), password: z.string().min(1).max(200) });

// bcrypt hash of a random string, compared against when the email is unknown so timing doesn't reveal valid emails.
const DUMMY_HASH = "$2b$12$wmaqnILQRK7uD3/FmxvuROmGhajlNxzxv2Yk3/fF8y4vief37Bgvy";

const MAX_ATTEMPTS = 6;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter your email and password." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyAttempts(`${ip}:${parsed.data.email.toLowerCase()}`)) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  const valid = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid || user.role !== "admin") return { error: "Incorrect email or password." };

  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
