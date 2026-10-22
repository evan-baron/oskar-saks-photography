import { Suspense, ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import { verifyAdmin } from "@/lib/dal";
import { logout } from "@/app/login/actions";
import AdminSkeleton from "@/components/admin/AdminSkeleton/AdminSkeleton";
import styles from "../admin.module.scss";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // Data refreshes after uploads and edits shouldn't animate (and the browser aborts transitions in hidden tabs).
    <ViewTransition default="none">
      <div className={styles.page}>
        <Suspense fallback={<AdminSkeleton variant="header" />}>
          <AdminHeader />
        </Suspense>
        {children}
      </div>
    </ViewTransition>
  );
}

async function AdminHeader() {
  const user = await verifyAdmin();
  return (
    <header className={styles.head}>
      <div>
        <h1>Site admin</h1>
        <p>Signed in as {user.email}</p>
      </div>
      <div className={styles.headActions}>
        <Link href="/admin/password" className={styles.ghost}>
          Change password
        </Link>
        <form action={logout}>
          <button type="submit" className={styles.ghost}>
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
