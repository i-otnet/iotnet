"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import DashboardUsersLayout from "@/components/layout/dashboard/dashboardUsersLayout";
import UsersOverviewSection from "@/components/modules/dashboard/users/UsersOverviewSection";
import UsersTableSection from "@/components/modules/dashboard/users/UsersTableSection";
import BrokerDistributionSection from "@/components/modules/dashboard/users/BrokerDistributionSection";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <DashboardUsersLayout
        usersOverview={<UsersOverviewSection />}
        usersTable={<UsersTableSection />}
        brokerDistribution={<BrokerDistributionSection />}
      />
    </DashboardLayout>
  );
}