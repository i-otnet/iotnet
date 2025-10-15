"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import DashboardOverviewLayout from "@/components/layout/dashboard/dashboardOverviewLayout";
import DashboardOverviewSection from "@/components/modules/dashboard/overview/DashboardOverviewSection";
import QuickAccessSection from "@/components/modules/dashboard/overview/QuickAccessSection";
import SystemStatusSection from "@/components/modules/dashboard/overview/SystemStatusSection";
import RecentActivitySection from "@/components/modules/dashboard/overview/RecentActivitySection";
import GettingStartedSection from "@/components/modules/dashboard/overview/GettingStartedSection";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverviewLayout
        dashboardOverview={<DashboardOverviewSection />}
        quickAccess={<QuickAccessSection />}
        systemStatus={<SystemStatusSection />}
        recentActivity={<RecentActivitySection />}
        gettingStarted={<GettingStartedSection />}
      />
    </DashboardLayout>
  );
}