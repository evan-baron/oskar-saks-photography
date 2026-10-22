import { Suspense } from "react";
import type { Metadata } from "next";
import { verifyAdmin } from "@/lib/dal";
import { getHomeContent } from "@/lib/siteContent";
import HomeEditor from "@/components/admin/ContentEditor/HomeEditor";

import styles from "../../admin.module.scss";

export const metadata: Metadata = {
  title: "Home | Admin",
  robots: { index: false, follow: false },
};

async function AdminHomeContent() {
  await verifyAdmin();
  return <HomeEditor content={await getHomeContent()} />;
}

export default function AdminHomePage() {
  return (
    <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
      <AdminHomeContent />
    </Suspense>
  );
}
