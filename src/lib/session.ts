import "server-only";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { sealData, unsealData } from "iron-session";

export type SessionData = { userId?: number };

import { SESSION_COOKIE } from "@/lib/sessionCookie";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function password() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set to at least 32 characters");
  return secret;
}

export async function getSession(): Promise<SessionData> {
  // Unsealing compares the cookie's expiry with the current time, so this must run at request time.
  await connection();
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return {};
  try {
    return await unsealData<SessionData>(cookie, { password: password(), ttl: SESSION_TTL_SECONDS });
  } catch {
    return {};
  }
}

export async function createSession(userId: number) {
  const sealed = await sealData({ userId } satisfies SessionData, { password: password(), ttl: SESSION_TTL_SECONDS });
  (await cookies()).set(SESSION_COOKIE, sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
