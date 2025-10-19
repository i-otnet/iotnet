'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardModelsLayout from '@/components/layout/dashboard/dashboardModelsLayout'
import ModelsOverviewSection from '@/components/modules/dashboard/models/ModelsOverviewSection'
import ModelsGridSection from '@/components/modules/dashboard/models/ModelsGridSection'
import { mockModelsData } from '@/lib/json/modelsData'

interface Model {
  id: number
  name: string
  type: string
  status: string
  framework: string
  lastUpdated: string
  icon: string
  version: string
  accuracy?: string
}

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [models, setModels] = useState<Model[]>(mockModelsData.data.models)
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false)

  // Filter models based on selected filter and search query
  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.framework.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'classification' &&
        model.type.toLowerCase() === 'classification') ||
      (selectedFilter === 'regression' &&
        model.type.toLowerCase() === 'regression') ||
      (selectedFilter === 'clustering' &&
        model.type.toLowerCase() === 'clustering') ||
      (selectedFilter === 'time-series' &&
        model.type.toLowerCase() === 'time series')

    return matchesSearch && matchesFilter
  })

  // Update filter counts based on current search
  const getFilteredCount = (filterType: string) => {
    if (filterType === 'all') return filteredModels.length

    return models.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.framework.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        (filterType === 'classification' &&
          model.type.toLowerCase() === 'classification') ||
        (filterType === 'regression' &&
          model.type.toLowerCase() === 'regression') ||
        (filterType === 'clustering' &&
          model.type.toLowerCase() === 'clustering') ||
        (filterType === 'time-series' &&
          model.type.toLowerCase() === 'time series')

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
          <DashboardModelsLayout
            modelsOverview={
              <ModelsOverviewSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filteredModels={filteredModels}
                totalModels={mockModelsData.data.statistics.totalModels}
                deployedModels={mockModelsData.data.statistics.deployedModels}
                inactiveModels={mockModelsData.data.statistics.inactiveModels}
                newModelsThisWeek={
                  mockModelsData.data.statistics.newModelsThisWeek
                }
                getFilteredCount={getFilteredCount}
                onAddModelClick={() => setIsAddModelModalOpen(true)}
              />
            }
            modelsGrid={
              <ModelsGridSection
                filteredModels={filteredModels}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                onModelAdded={(newModel: Model) =>
                  setModels([...models, newModel])
                }
                isAddModelModalOpen={isAddModelModalOpen}
                setIsAddModelModalOpen={setIsAddModelModalOpen}
              />
            }
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
