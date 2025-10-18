'use client'

import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardSettingsLayout from '@/components/layout/dashboard/dashboardSettings'
import ProfileSettingsSection from '@/components/modules/dashboard/settings/ProfileSettingsSection'
import PasswordSettingsSection from '@/components/modules/dashboard/settings/PasswordSettingsSection'
import BrokerSettingsSection from '@/components/modules/dashboard/settings/BrokerSettingsSection'
import NotificationSettingsSection from '@/components/modules/dashboard/settings/NotificationSettingsSection'
import ApiKeysSection from '@/components/modules/dashboard/settings/ApiKeysSection'
import DangerZoneSection from '@/components/modules/dashboard/settings/DangerZoneSection'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto">
          <DashboardSettingsLayout
            profileSettings={<ProfileSettingsSection />}
            passwordSettings={<PasswordSettingsSection />}
            brokerSettings={<BrokerSettingsSection />}
            notificationSettings={<NotificationSettingsSection />}
            apiKeys={<ApiKeysSection />}
            dangerZone={<DangerZoneSection />}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
