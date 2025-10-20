'use client'

import { use } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DeviceDetailOverviewSection from '@/components/modules/dashboard/deviceDetail/deviceDetailOverviewSection'
import DeviceDetailGridSection from '@/components/modules/dashboard/deviceDetail/deviceDetailGridSection'
import DeviceDetailHeader from '@/components/modules/dashboard/deviceDetail/deviceDetailHeader'
import ConnectionStatusCard from '@/components/modules/dashboard/deviceDetail/connectionStatus/connectionStatusCard'
import { mockDevicesData } from '@/lib/json/devicesData'

export default function DeviceDetailPage({
  params,
}: {
  params: Promise<{ deviceId: string }>
}) {
  const { deviceId } = use(params)

  // Ambil data device dari devicesData berdasarkan ID
  const device = mockDevicesData.data.devices.find(
    (d) => d.id === parseInt(deviceId)
  )

  if (!device) {
    return (
      <DashboardLayout>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
          <div className="w-full mx-auto max-w-7xl">
            <p className="text-muted-foreground">Device not found</p>
          </div>
        </main>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DeviceDetailOverviewSection deviceId={deviceId}>
            <DeviceDetailHeader
              deviceName={device.name}
              deviceType={device.type}
            />

            <DeviceDetailGridSection deviceId={deviceId}>
              <ConnectionStatusCard
                status={device.status as 'online' | 'offline'}
              />
            </DeviceDetailGridSection>
          </DeviceDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
