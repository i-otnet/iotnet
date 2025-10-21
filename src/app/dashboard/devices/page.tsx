'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardDevicesLayout from '@/components/layout/dashboard/dashboardDevicesLayout'
import DevicesOverviewSection from '@/components/modules/dashboard/devices/DevicesOverviewSection'
import DevicesGridSection from '@/components/modules/dashboard/devices/DevicesGridSection'
import { mockDevicesData } from '@/lib/json/devicesData'

interface Device {
  id: number
  name: string
  type: string
  status: string
  location: string
  lastSeen: string
  icon: string
  firmwareVersion: string
  chipId: string
}

export default function DevicesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [devices, setDevices] = useState(mockDevicesData.data.devices)
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false)

  // Filter devices based on selected filter and search query
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      device.type.toLowerCase().replace(/\s+/g, '-') ===
        selectedFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  // Update filter counts based on current search
  const getFilteredCount = (filterType: string) => {
    if (filterType === 'all') return filteredDevices.length

    return devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        device.type.toLowerCase().replace(/\s+/g, '-') ===
        filterType.toLowerCase()

      return matchesSearch && matchesType
    }).length
  }

  const handleDeviceAdded = (newDevice: Device) => {
    setDevices([...devices, newDevice])
  }

  const handleInsightsClick = (deviceId: number) => {
    router.push(`/dashboard/devices/${deviceId}`)
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DashboardDevicesLayout
            devicesOverview={
              <DevicesOverviewSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filteredDevices={filteredDevices}
                totalDevices={devices.length}
                activeDevices={
                  devices.filter((d) => d.status === 'online').length
                }
                offlineDevices={
                  devices.filter((d) => d.status === 'offline').length
                }
                newDevicesThisWeek={
                  mockDevicesData.data.statistics.newDevicesThisWeek
                }
                getFilteredCount={getFilteredCount}
                onAddDeviceClick={() => setIsAddDeviceModalOpen(true)}
              />
            }
            devicesGrid={
              <DevicesGridSection
                filteredDevices={filteredDevices}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedFilter={setSelectedFilter}
                onDeviceAdded={handleDeviceAdded}
                isAddDeviceModalOpen={isAddDeviceModalOpen}
                setIsAddDeviceModalOpen={setIsAddDeviceModalOpen}
                onInsightsClick={handleInsightsClick}
              />
            }
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
