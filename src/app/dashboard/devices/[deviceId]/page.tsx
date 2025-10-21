'use client'

import { use, useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DeviceDetailOverviewSection from '@/components/modules/dashboard/deviceDetail/deviceDetailOverviewSection'
import DeviceDetailGridSection from '@/components/modules/dashboard/deviceDetail/deviceDetailGridSection'
import DeviceDetailHeader from '@/components/modules/dashboard/deviceDetail/deviceDetailHeader'
import ConnectionStatusCard from '@/components/shared/connectionStatusCard'
import WidgetRenderer from '@/components/modules/dashboard/deviceDetail/deviceDetailWidget'
import { mockDevicesData } from '@/lib/json/devicesData'
import { WidgetOption } from '@/lib/json/widgetOptionsData'
import { DeviceWidgetConfiguration } from '@/components/modules/dashboard/deviceDetail/addWidgetDevice/deviceViews/widgetConfigurationView'

interface SavedDeviceWidget {
  id: string
  widget: WidgetOption
  config: DeviceWidgetConfiguration
}

export default function DeviceDetailPage({
  params,
}: {
  params: Promise<{ deviceId: string }>
}) {
  const { deviceId } = use(params)
  const device = mockDevicesData.data.devices.find(
    (d) => d.id === parseInt(deviceId)
  )

  const [widgets, setWidgets] = useState<SavedDeviceWidget[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)

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

  const handleAddWidget = (
    widget: WidgetOption,
    config: DeviceWidgetConfiguration
  ) => {
    const newWidget: SavedDeviceWidget = {
      id: `widget-${Date.now()}`,
      widget,
      config,
    }
    setWidgets([...widgets, newWidget])
  }

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(widgets.filter((w) => w.id !== widgetId))
    setSelectedWidgetId(null)
  }

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DeviceDetailOverviewSection>
            <DeviceDetailHeader
              deviceName={device.name}
              deviceType={device.type}
              onAddWidget={handleAddWidget}
              isEditing={isEditing}
              onEditingChange={setIsEditing}
            />

            <DeviceDetailGridSection>
              <ConnectionStatusCard
                status={device.status as 'online' | 'offline'}
              />
              {widgets.map((w) => (
                <WidgetRenderer
                  key={w.id}
                  widget={w.widget}
                  config={{
                    name: w.config.widgetName,
                    virtualPin: w.config.dataPin,
                    unit: w.config.unit,
                    minValue: w.config.minValue,
                    maxValue: w.config.maxValue,
                  }}
                  isEditing={isEditing}
                  isSelected={selectedWidgetId === w.id}
                  onSelect={() => setSelectedWidgetId(w.id)}
                  onDelete={() => handleDeleteWidget(w.id)}
                />
              ))}
            </DeviceDetailGridSection>
          </DeviceDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
