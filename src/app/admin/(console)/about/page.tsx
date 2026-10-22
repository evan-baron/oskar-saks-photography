import { Suspense } from "react";
import type { Metadata } from "next";
import AdminSkeleton from "@/components/admin/AdminSkeleton/AdminSkeleton";
import { verifyAdmin } from "@/lib/dal";
import { getAboutContent } from "@/lib/siteContent";
import AboutEditor from "@/components/admin/ContentEditor/AboutEditor";

export const metadata: Metadata = {
  title: "About | Admin",
  robots: { index: false, follow: false },
};

async function AdminAboutContent() {
  await verifyAdmin();
  return <AboutEditor content={await getAboutContent()} />;
}

export default function AdminAboutPage() {
  return (
    <Suspense fallback={<AdminSkeleton variant="form" />}>
      <AdminAboutContent />
    </Suspense>
  );
}
