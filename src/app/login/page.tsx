import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/dal";
import LoginForm from "./LoginForm";
import styles from "./login.module.scss";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={null}>
        <LoginGate />
      </Suspense>
    </main>
  );
}

async function LoginGate() {
  if (await hasAdminSession()) redirect("/admin");
  return (
    <div className={styles.card}>
      <h1>Sign in</h1>
      <LoginForm />
    </div>
  );
}
