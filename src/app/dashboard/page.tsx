'use client'

import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardOverviewLayout from '@/components/layout/dashboard/dashboardOverviewLayout'
import DashboardOverviewSection from '@/components/modules/dashboard/overview/DashboardOverviewSection'
import QuickAccessSection from '@/components/modules/dashboard/overview/QuickAccessSection'
import SystemStatusSection from '@/components/modules/dashboard/overview/SystemStatusSection'
import RecentActivitySection from '@/components/modules/dashboard/overview/RecentActivitySection'
import GettingStartedSection from '@/components/modules/dashboard/overview/GettingStartedSection'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DashboardOverviewLayout
            dashboardOverview={<DashboardOverviewSection />}
            quickAccess={<QuickAccessSection />}
            systemStatus={<SystemStatusSection />}
            recentActivity={<RecentActivitySection />}
            gettingStarted={<GettingStartedSection />}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
