'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardAutomationsLayout from '@/components/layout/dashboard/dashboardAutomationsLayout'
import AutomationsOverviewSection from '@/components/modules/dashboard/automations/AutomationsOverviewSection'
import AutomationsListSection from '@/components/modules/dashboard/automations/AutomationsListSection'
import { AddAutomationModal } from '@/components/modules/dashboard/automations/addAutomation/addAutomationModal'
import { mockAutomationsData } from '@/lib/json/data/automation/automationsData'

interface Automation {
  id: number
  name: string
  type: string
  status: string
  trigger: string
  action: string
  lastTriggered: string
  icon: string
  description: string
  createdDate: string
  source: string
  sourceDevice?: string
  sourceModel?: string
}

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [automations, setAutomations] = useState<Automation[]>(
    mockAutomationsData.data.automations
  )
  const [isAddAutomationModalOpen, setIsAddAutomationModalOpen] =
    useState(false)

  // Filter automations based on selected filter and search query
  const filteredAutomations = automations.filter((automation) => {
    const matchesSearch =
      automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      automation.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.action.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      automation.type.toLowerCase().replace(/\s+/g, '-') ===
        selectedFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  // Update filter counts based on current search
  const getFilteredCount = (filterType: string) => {
    if (filterType === 'all') return filteredAutomations.length

    return automations.filter((automation) => {
      const matchesSearch =
        automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        automation.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.action.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        automation.type.toLowerCase().replace(/\s+/g, '-') ===
        filterType.toLowerCase()

      return matchesSearch && matchesType
    }).length
  }

  const handleAutomationAdded = (newAutomation: Automation) => {
    setAutomations([...automations, newAutomation])
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
                totalAutomations={automations.length}
                activeAutomations={
                  automations.filter((a) => a.status === 'active').length
                }
                pausedAutomations={
                  automations.filter((a) => a.status === 'paused').length
                }
                triggeredToday={
                  mockAutomationsData.data.statistics.triggeredToday
                }
                getFilteredCount={getFilteredCount}
                onAddAutomationClick={() => setIsAddAutomationModalOpen(true)}
              />
            }
            automationsList={
              <AutomationsListSection automations={filteredAutomations} />
            }
          />
        </div>
      </main>

      {/* Add Automation Modal */}
      <AddAutomationModal
        open={isAddAutomationModalOpen}
        onOpenChange={setIsAddAutomationModalOpen}
        onAutomationAdded={handleAutomationAdded}
      />
    </DashboardLayout>
  )
}
