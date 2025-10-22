'use client'

import { use, useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DeviceDetailOverviewSection from '@/components/modules/dashboard/deviceDetail/deviceDetailOverviewSection'
import DeviceDetailGridSection from '@/components/modules/dashboard/deviceDetail/deviceDetailGridSection'
import DeviceDetailHeader from '@/components/modules/dashboard/deviceDetail/deviceDetailHeader'
import ConnectionStatusCard from '@/components/shared/connectionStatusCard'
import WidgetRenderer from '@/components/modules/dashboard/deviceDetail/deviceDetailWidget'
import RedirectPage from '@/components/shared/redirectPage'
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with delay for redirect effect
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [deviceId])

  // Handle clicking outside widget to deselect
  useEffect(() => {
    if (!isEditing) {
      setSelectedWidgetId(null)
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if click is on a widget or widget button
      const isWidgetClick = target.closest('[data-widget-id]')
      if (!isWidgetClick) {
        setSelectedWidgetId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isEditing])

  if (isLoading) {
    return (
      <RedirectPage
        isRedirecting={true}
        message="Loading Device"
        subMessage="Please wait a moment..."
      />
    )
  }

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

  const handleEditWidget = (widgetId: string) => {}

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

            {/* Connection Status - Full Width, Outside Grid */}
            <div className="mb-6">
              <ConnectionStatusCard
                status={device.status as 'online' | 'offline'}
              />
            </div>

            {/* Widget Grid Section */}
            <DeviceDetailGridSection isEditing={isEditing}>
              {widgets.map((w) => {
                // Get grid column span for this widget
                const gridColSpan =
                  w.widget.id === 'chart' || w.widget.id === 'slider' ? 2 : 1

                return (
                  <div
                    key={w.id}
                    data-widget-id={w.id}
                    className="relative z-10"
                    style={{
                      gridColumn: `span ${gridColSpan}`,
                    }}
                  >
                    <WidgetRenderer
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
                      onEdit={() => handleEditWidget(w.id)}
                      onDelete={() => handleDeleteWidget(w.id)}
                    />
                  </div>
                )
              })}
            </DeviceDetailGridSection>
          </DeviceDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
