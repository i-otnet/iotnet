'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardAutomationsLayout from '@/components/layout/dashboard/dashboardAutomationsLayout'
import AutomationsOverviewSection from '@/components/modules/dashboard/automations/AutomationsOverviewSection'
import AutomationsListSection from '@/components/modules/dashboard/automations/AutomationsListSection'
import { mockAutomationsData } from '@/lib/json/automationsData'

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Filter automations based on search and filter
  const filteredAutomations = mockAutomationsData.data.automations.filter(
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
    if (filterType === 'all') return mockAutomationsData.data.automations.length
    if (filterType === 'time')
      return mockAutomationsData.data.automations.filter(
        (a) => a.type === 'Time-based'
      ).length
    if (filterType === 'sensor')
      return mockAutomationsData.data.automations.filter(
        (a) => a.type === 'Sensor-based'
      ).length
    if (filterType === 'event')
      return mockAutomationsData.data.automations.filter(
        (a) => a.type === 'Event-based'
      ).length
    return 0
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DashboardAutomationsLayout
            automationsOverview={
              <AutomationsOverviewSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filteredAutomations={filteredAutomations}
                totalAutomations={
                  mockAutomationsData.data.statistics.totalAutomations
                }
                activeAutomations={
                  mockAutomationsData.data.statistics.activeAutomations
                }
                pausedAutomations={
                  mockAutomationsData.data.statistics.pausedAutomations
                }
                triggeredToday={
                  mockAutomationsData.data.statistics.triggeredToday
                }
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
