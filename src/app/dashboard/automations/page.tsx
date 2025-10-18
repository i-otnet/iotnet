'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardAutomationsLayout from '@/components/layout/dashboard/dashboardAutomationsLayout'
import AutomationsOverviewSection from '@/components/modules/dashboard/automations/AutomationsOverviewSection'
import AutomationsListSection from '@/components/modules/dashboard/automations/AutomationsListSection'
import {
  Thermometer,
  Zap,
  Sun,
  CloudRain,
  Activity,
  Bell,
  Timer,
  Lightbulb,
  Fan,
  Lock,
  Camera,
} from 'lucide-react'

// Mock automations data
const mockAutomationsData = {
  totalAutomations: 12,
  activeAutomations: 8,
  pausedAutomations: 3,
  triggeredToday: 24,
  automations: [
    {
      id: 1,
      name: 'Morning Lights',
      type: 'Time-based',
      status: 'active',
      trigger: 'Every day at 6:00 AM',
      action: 'Turn on living room lights',
      lastTriggered: 'Today, 6:00 AM',
      icon: Sun,
      description: 'Automatic morning lighting',
      createdDate: '2024-10-01',
      source: 'devices',
      sourceDevice: 'ESP32-01 (Living Room)',
    },
    {
      id: 2,
      name: 'Temperature Alert',
      type: 'Sensor-based',
      status: 'active',
      trigger: 'When temperature > 30°C',
      action: 'Send notification & turn on AC',
      lastTriggered: 'Yesterday, 2:30 PM',
      icon: Thermometer,
      description: 'High temperature monitoring',
      createdDate: '2024-09-28',
      source: 'devices',
      sourceDevice: 'ESP32-02 (Workshop)',
    },
    {
      id: 3,
      name: 'Evening Security',
      type: 'Time-based',
      status: 'active',
      trigger: 'Every day at 10:00 PM',
      action: 'Lock all doors & arm cameras',
      lastTriggered: 'Yesterday, 10:00 PM',
      icon: Lock,
      description: 'Nightly security routine',
      createdDate: '2024-09-25',
      source: 'devices',
      sourceDevice: 'ESP32-03 (Smart Lock)',
    },
    {
      id: 4,
      name: 'Humidity Control',
      type: 'Sensor-based',
      status: 'paused',
      trigger: 'When humidity > 70%',
      action: 'Turn on dehumidifier',
      lastTriggered: '3 days ago',
      icon: CloudRain,
      description: 'Maintain optimal humidity',
      createdDate: '2024-09-20',
      source: 'devices',
      sourceDevice: 'DHT22 Sensor (Bedroom)',
    },
    {
      id: 5,
      name: 'Energy Saver',
      type: 'Time-based',
      status: 'active',
      trigger: 'Weekdays at 8:00 AM',
      action: 'Turn off all unnecessary devices',
      lastTriggered: 'Today, 8:00 AM',
      icon: Zap,
      description: 'Workday energy optimization',
      createdDate: '2024-09-15',
      source: 'model',
      sourceModel: 'Energy Optimizer Model',
    },
    {
      id: 6,
      name: 'Motion Detected',
      type: 'Event-based',
      status: 'active',
      trigger: 'When motion sensor triggered',
      action: 'Turn on lights & start recording',
      lastTriggered: '2 hours ago',
      icon: Camera,
      description: 'Motion-activated security',
      createdDate: '2024-09-10',
      source: 'devices',
      sourceDevice: 'PIR Sensor (Hallway)',
    },
    {
      id: 7,
      name: 'Night Mode',
      type: 'Time-based',
      status: 'active',
      trigger: 'Every day at 11:00 PM',
      action: 'Dim all lights to 20%',
      lastTriggered: 'Yesterday, 11:00 PM',
      icon: Lightbulb,
      description: 'Automatic night lighting',
      createdDate: '2024-09-05',
      source: 'devices',
      sourceDevice: 'Smart Bulb Hub',
    },
    {
      id: 8,
      name: 'Air Quality Monitor',
      type: 'Sensor-based',
      status: 'active',
      trigger: 'When CO2 > 1000 ppm',
      action: 'Turn on ventilation fan',
      lastTriggered: '5 hours ago',
      icon: Fan,
      description: 'Indoor air quality control',
      createdDate: '2024-08-30',
      source: 'devices',
      sourceDevice: 'MQ-135 (Living Room)',
    },
    {
      id: 9,
      name: 'Reminder System',
      type: 'Time-based',
      status: 'paused',
      trigger: 'Every 2 hours',
      action: 'Send activity reminder',
      lastTriggered: '1 week ago',
      icon: Bell,
      description: 'Periodic activity reminders',
      createdDate: '2024-08-25',
      source: 'model',
      sourceModel: 'Activity Tracker Model',
    },
    {
      id: 10,
      name: 'Device Timeout',
      type: 'Event-based',
      status: 'active',
      trigger: 'When device idle for 30 min',
      action: 'Turn off device',
      lastTriggered: '4 hours ago',
      icon: Timer,
      description: 'Idle device management',
      createdDate: '2024-08-20',
      source: 'model',
      sourceModel: 'Usage Pattern Detector',
    },
    {
      id: 11,
      name: 'Activity Sensor',
      type: 'Sensor-based',
      status: 'paused',
      trigger: 'When no activity for 1 hour',
      action: 'Enable power saving mode',
      lastTriggered: '2 weeks ago',
      icon: Activity,
      description: 'Activity-based optimization',
      createdDate: '2024-08-15',
      source: 'model',
      sourceModel: 'IoT Anomaly Detector',
    },
    {
      id: 12,
      name: 'Weekend Wake',
      type: 'Time-based',
      status: 'inactive',
      trigger: 'Weekends at 8:00 AM',
      action: 'Gradually brighten bedroom lights',
      lastTriggered: 'Never',
      icon: Sun,
      description: 'Gentle weekend wake-up',
      createdDate: '2024-08-10',
      source: 'devices',
      sourceDevice: 'ESP32-01 (Bedroom)',
    },
  ],
}

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Filter automations based on search and filter
  const filteredAutomations = mockAutomationsData.automations.filter(
    (automation) => {
      const matchesSearch =
        automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        automation.trigger.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'time' && automation.type === 'Time-based') ||
        (selectedFilter === 'sensor' && automation.type === 'Sensor-based') ||
        (selectedFilter === 'event' && automation.type === 'Event-based')

      return matchesSearch && matchesFilter
    }
  )

  // Get count for specific filter
  const getFilteredCount = (filterType: string) => {
    if (filterType === 'all') return mockAutomationsData.automations.length
    if (filterType === 'time')
      return mockAutomationsData.automations.filter(
        (a) => a.type === 'Time-based'
      ).length
    if (filterType === 'sensor')
      return mockAutomationsData.automations.filter(
        (a) => a.type === 'Sensor-based'
      ).length
    if (filterType === 'event')
      return mockAutomationsData.automations.filter(
        (a) => a.type === 'Event-based'
      ).length
    return 0
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto">
          <DashboardAutomationsLayout
            automationsOverview={
              <AutomationsOverviewSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filteredAutomations={filteredAutomations}
                totalAutomations={mockAutomationsData.totalAutomations}
                activeAutomations={mockAutomationsData.activeAutomations}
                pausedAutomations={mockAutomationsData.pausedAutomations}
                triggeredToday={mockAutomationsData.triggeredToday}
                getFilteredCount={getFilteredCount}
              />
            }
            automationsList={
              <AutomationsListSection automations={filteredAutomations} />
            }
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
