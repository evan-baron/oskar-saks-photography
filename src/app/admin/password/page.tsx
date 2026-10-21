import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { verifyAdmin } from "@/lib/dal";
import PasswordForm from "./PasswordForm";
import styles from "@/app/login/login.module.scss";

export const metadata: Metadata = {
  title: "Change password",
  robots: { index: false, follow: false },
};

export default function PasswordPage() {
  return (
    <div className={styles.page}>
      <Suspense fallback={null}>
        <PasswordContent />
      </Suspense>
    </div>
  );
}

async function PasswordContent() {
  const user = await verifyAdmin({ allowTemporaryPassword: true });
  return (
    <div className={styles.card}>
      <h1>{user.mustChangePassword ? "Choose a new password" : "Change password"}</h1>
      {user.mustChangePassword && <p className={styles.note}>You&rsquo;re using a temporary password. Set your own to continue.</p>}
      <PasswordForm />
      {!user.mustChangePassword && (
        <p className={styles.note}>
          <Link href="/admin">Back to admin</Link>
        </p>
      )}
    </div>
  );
}
