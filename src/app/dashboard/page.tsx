"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import OverviewContent from "@/components/modules/dashboard/overviewContent";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <OverviewContent />
    </DashboardLayout>
  );
}