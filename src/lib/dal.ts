import "server-only";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// Every admin page and server action calls this; the proxy redirect is only an optimistic first check.
// Users still on a temporary password are held at the change-password page until they pick a new one.
export async function verifyAdmin({ allowTemporaryPassword = false } = {}) {
  const { userId } = await getSession();
  if (!userId) redirect("/");
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, mustChangePassword: true },
  });
  if (!user || user.role !== "admin") redirect("/");
  if (user.mustChangePassword && !allowTemporaryPassword) redirect("/admin/password");
  return user;
}

export async function hasAdminSession() {
  const { userId } = await getSession();
  if (!userId) return false;
  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
  return user?.role === "admin";
}
