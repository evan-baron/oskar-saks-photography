import { Suspense } from "react";
import type { Metadata } from "next";
import { verifyAdmin } from "@/lib/dal";
import { getServicesContent } from "@/lib/siteContent";
import ServicesEditor from "@/components/admin/ContentEditor/ServicesEditor";

import styles from "../../admin.module.scss";

export const metadata: Metadata = {
  title: "Services | Admin",
  robots: { index: false, follow: false },
};

async function AdminServicesContent() {
  await verifyAdmin();
  return <ServicesEditor content={await getServicesContent()} />;
}

export default function AdminServicesPage() {
  return (
    <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
      <AdminServicesContent />
    </Suspense>
  );
}
