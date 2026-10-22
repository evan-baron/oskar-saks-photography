import { Suspense } from "react";
import type { Metadata } from "next";
import AdminSkeleton from "@/components/admin/AdminSkeleton/AdminSkeleton";
import { verifyAdmin } from "@/lib/dal";
import { getHomeContent } from "@/lib/siteContent";
import HomeEditor from "@/components/admin/ContentEditor/HomeEditor";

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
    <Suspense fallback={<AdminSkeleton variant="form" />}>
      <AdminHomeContent />
    </Suspense>
  );
}
