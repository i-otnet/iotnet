'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardDevicesLayout from '@/components/layout/dashboard/dashboardDevicesLayout'
import DevicesOverviewSection from '@/components/modules/dashboard/devices/DevicesOverviewSection'
import DevicesGridSection from '@/components/modules/dashboard/devices/DevicesGridSection'
import {
  Smartphone,
  Router,
  Lightbulb,
  Shield,
  Camera,
  Activity,
  Cpu,
  Settings,
} from 'lucide-react'

// Mock devices data
const mockDevicesData = {
  totalDevices: 10,
  activeDevices: 8,
  offlineDevices: 2,
  newDevicesThisWeek: 3,
  devices: [
    {
      id: 1,
      name: 'ESP32-01',
      type: 'ESP32 DevKit',
      status: 'online',
      location: 'Living Room',
      lastSeen: '2 minutes ago',
      icon: Smartphone,
      firmwareVersion: 'v2.1.0',
      chipId: '240AC4A1B2C8',
    },
    {
      id: 2,
      name: 'ESP32-02',
      type: 'ESP32-S3',
      status: 'online',
      location: 'Workshop',
      lastSeen: '1 minute ago',
      icon: Router,
      firmwareVersion: 'v2.3.1',
      chipId: 'ESP32S3',
    },
    {
      id: 3,
      name: 'Raspberry Pi 4B',
      type: 'Single Board Computer',
      status: 'online',
      location: 'Server Room',
      lastSeen: '30 seconds ago',
      icon: Router,
      firmwareVersion: 'Raspbian 11',
      chipId: 'BCM2711',
    },
    {
      id: 4,
      name: 'Smart Lamp Controller',
      type: 'ESP8266 NodeMCU',
      status: 'offline',
      location: 'Bedroom',
      lastSeen: '2 hours ago',
      icon: Lightbulb,
      firmwareVersion: 'v3.0.2',
      chipId: 'ESP8266EX',
    },
    {
      id: 5,
      name: 'Door Lock Module',
      type: 'ESP32-C3',
      status: 'online',
      location: 'Front Door',
      lastSeen: '5 minutes ago',
      icon: Shield,
      firmwareVersion: 'v1.9.4',
      chipId: 'ESP32C3',
    },
    {
      id: 6,
      name: 'Security Camera Hub',
      type: 'Raspberry Pi Zero 2W',
      status: 'online',
      location: 'Garage',
      lastSeen: '3 minutes ago',
      icon: Camera,
      firmwareVersion: 'Raspbian Lite',
      chipId: 'RP3A0-AU',
    },
    {
      id: 7,
      name: 'Orange Pi 5',
      type: 'Orange Pi Board',
      status: 'online',
      location: 'Lab',
      lastSeen: '1 minute ago',
      icon: Router,
      firmwareVersion: 'Ubuntu 22.04',
      chipId: 'RK3588S',
    },
    {
      id: 8,
      name: 'Weather Station',
      type: 'Wemos D1 Mini',
      status: 'online',
      location: 'Garden',
      lastSeen: '4 minutes ago',
      icon: Activity,
      firmwareVersion: 'v2.7.4',
      chipId: 'ESP8266',
    },
    {
      id: 9,
      name: 'IoT Sensor Hub',
      type: 'Wemos D1 R32',
      status: 'online',
      location: 'Basement',
      lastSeen: '2 minutes ago',
      icon: Cpu,
      firmwareVersion: 'v1.0.6',
      chipId: 'ESP32',
    },
    {
      id: 10,
      name: 'Home Automation',
      type: 'Orange Pi Zero 2W',
      status: 'offline',
      location: 'Control Room',
      lastSeen: '6 hours ago',
      icon: Settings,
      firmwareVersion: 'Armbian 23.02',
      chipId: 'H618',
    },
  ],
}

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Filter devices based on selected filter and search query
  const filteredDevices = mockDevicesData.devices.filter((device) => {
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

    return mockDevicesData.devices.filter((device) => {
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
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto">
          <DashboardDevicesLayout
            devicesOverview={
              <DevicesOverviewSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filteredDevices={filteredDevices}
                totalDevices={mockDevicesData.totalDevices}
                activeDevices={mockDevicesData.activeDevices}
                offlineDevices={mockDevicesData.offlineDevices}
                newDevicesThisWeek={mockDevicesData.newDevicesThisWeek}
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
