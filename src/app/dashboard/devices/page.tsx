'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardDevicesLayout from '@/components/layout/dashboard/dashboardDevicesLayout'
import DevicesOverviewSection from '@/components/modules/dashboard/devices/DevicesOverviewSection'
import DevicesGridSection from '@/components/modules/dashboard/devices/DevicesGridSection'
import { mockDevicesData } from '@/lib/json/devicesData'

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Filter devices based on selected filter and search query
  const filteredDevices = mockDevicesData.data.devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'esp32' &&
        device.type.toLowerCase().includes('esp32')) ||
      (selectedFilter === 'esp8266' &&
        device.type.toLowerCase().includes('esp8266')) ||
      (selectedFilter === 'raspberry' &&
        device.type.toLowerCase().includes('raspberry')) ||
      (selectedFilter === 'orange' &&
        device.type.toLowerCase().includes('orange')) ||
      (selectedFilter === 'wemos' &&
        device.type.toLowerCase().includes('wemos'))

    return matchesSearch && matchesFilter
  })

  // Update filter counts based on current search
  const getFilteredCount = (filterType: string) => {
    if (filterType === 'all') return filteredDevices.length

    return mockDevicesData.data.devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        (filterType === 'esp32' &&
          device.type.toLowerCase().includes('esp32')) ||
        (filterType === 'esp8266' &&
          device.type.toLowerCase().includes('esp8266')) ||
        (filterType === 'raspberry' &&
          device.type.toLowerCase().includes('raspberry')) ||
        (filterType === 'orange' &&
          device.type.toLowerCase().includes('orange')) ||
        (filterType === 'wemos' && device.type.toLowerCase().includes('wemos'))

      return matchesSearch && matchesType
    }).length
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
                totalDevices={mockDevicesData.data.statistics.totalDevices}
                activeDevices={mockDevicesData.data.statistics.activeDevices}
                offlineDevices={mockDevicesData.data.statistics.offlineDevices}
                newDevicesThisWeek={
                  mockDevicesData.data.statistics.newDevicesThisWeek
                }
                getFilteredCount={getFilteredCount}
              />
            }
            devicesGrid={
              <DevicesGridSection
                filteredDevices={filteredDevices}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedFilter={setSelectedFilter}
              />
            }
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
