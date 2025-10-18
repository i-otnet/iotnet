'use client'

import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardUsersLayout from '@/components/layout/dashboard/dashboardUsersLayout'
import UsersOverviewSection from '@/components/modules/dashboard/users/UsersOverviewSection'
import UsersTableSection from '@/components/modules/dashboard/users/UsersTableSection'
import BrokerDistributionSection from '@/components/modules/dashboard/users/BrokerDistributionSection'

export default function UsersPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto">
          <DashboardUsersLayout
            usersOverview={<UsersOverviewSection />}
            usersTable={<UsersTableSection />}
            brokerDistribution={<BrokerDistributionSection />}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
