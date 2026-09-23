import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/permissions";

export const metadata: Metadata = { title: "एडमिन डैशबोर्ड | पंडित सुमित शर्मा जी", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!await currentAdmin()) redirect("/admin/login");
  return <AdminDashboard />;
}
