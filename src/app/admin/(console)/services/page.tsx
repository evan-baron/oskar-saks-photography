import { Suspense } from "react";
import type { Metadata } from "next";
import AdminSkeleton from "@/components/admin/AdminSkeleton/AdminSkeleton";
import { verifyAdmin } from "@/lib/dal";
import { getServicesContent } from "@/lib/siteContent";
import ServicesEditor from "@/components/admin/ContentEditor/ServicesEditor";

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
    <Suspense fallback={<AdminSkeleton variant="form" />}>
      <AdminServicesContent />
    </Suspense>
  );
}
