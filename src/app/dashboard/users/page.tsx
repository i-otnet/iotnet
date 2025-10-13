"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import UsersContent from "@/components/modules/dashboard/content/usersContent";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersContent />
    </DashboardLayout>
  );
}