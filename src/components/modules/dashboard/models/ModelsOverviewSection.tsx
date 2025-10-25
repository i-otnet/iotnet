'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, BrainCircuit, Sparkles, Filter, PauseCircle } from 'lucide-react'
import { mockModelsData } from '@/lib/json/data/model/modelsData'
import { FilterModelModal } from './filterModel/filterModelModal'
import SearchModelDefault from './searchModel/searchModelDefault'

interface Model {
  accuracy?: string
}

interface ModelsOverviewSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  filteredModels: Model[]
  totalModels: number
  deployedModels: number
  inactiveModels: number
  newModelsThisWeek: number
  getFilteredCount: (filterType: string) => number
  onAddModelClick?: () => void
}

export default function ModelsOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredModels,
  totalModels,
  deployedModels,
  inactiveModels,
  onAddModelClick,
}: ModelsOverviewSectionProps) {
  const [selectedModelTypes, setSelectedModelTypes] = useState<string[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Generate model type filters from actual data for displaying badges
  const generateModelFilters = useMemo(() => {
    const models = mockModelsData.data.models

    // Count model types
    const typeCount: Record<string, number> = {}
    models.forEach((model) => {
      const type = model.type
      typeCount[type] = (typeCount[type] || 0) + 1
    })

    // Convert to array and sort by count (descending)
    const sortedTypes = Object.entries(typeCount)
      .map(([type, count]) => ({
        label: type,
        value: type.toLowerCase().replace(/\s+/g, '-'),
        count,
        fullType: type,
      }))
      .sort((a, b) => b.count - a.count)

    return sortedTypes
  }, [])
  // Calculate average accuracy
  const avgAccuracy =
    filteredModels.length > 0
      ? (
          filteredModels.reduce((sum, model) => {
            const accuracy = parseFloat(model.accuracy || '0')
            return sum + accuracy
          }, 0) / filteredModels.length
        ).toFixed(1)
      : '0'

  return (
    <div className="flex flex-col gap-4">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Models
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage and deploy your machine learning models
          </p>
        </div>
        <Button
          size="default"
          className="gap-2 w-full sm:w-auto"
          onClick={onAddModelClick}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Deploy Model</span>
          <span className="sm:hidden">Deploy</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <BrainCircuit className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">{totalModels}</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Total Models
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-green-500/10">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {deployedModels}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Deployed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-muted">
                <PauseCircle className="w-4 h-4 md:w-6 md:h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {inactiveModels}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Inactive
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">{avgAccuracy}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Avg. Accuracy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar - Responsive */}
      <div className="flex flex-col gap-4">
        {/* Mobile Layout: Search + Filter in one line */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <div className="flex-1 min-w-0">
            <SearchModelDefault
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          {/* Filter Button - Mobile */}
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Desktop Search Input with Filter Button */}
          <div className="hidden sm:flex items-center gap-2 flex-1">
            <div className="flex-1">
              <SearchModelDefault
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Model Type Filters - Horizontal Scroll (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
            {/* All Models Filter - Desktop */}
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className="whitespace-nowrap shrink-0"
            >
              <span className="text-xs md:text-sm">All Models</span>
              <Badge
                variant={selectedFilter === 'all' ? 'secondary' : 'outline'}
                className={`ml-2 ${
                  selectedFilter === 'all'
                    ? 'bg-primary-foreground text-primary border-primary-foreground'
                    : 'text-primary border-primary'
                }`}
              >
                {mockModelsData.data.models.length}
              </Badge>
            </Button>

            {/* Selected Model Type Filters from Filter Modal */}
            {selectedModelTypes.map((modelType) => {
              const filterData = generateModelFilters.find(
                (f) => f.value === modelType
              )
              if (!filterData) return null

              return (
                <Button
                  key={filterData.value}
                  variant={
                    selectedFilter === filterData.value ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(filterData.value)}
                  className="whitespace-nowrap shrink-0"
                >
                  <span className="text-xs md:text-sm">{filterData.label}</span>
                  <Badge
                    variant={
                      selectedFilter === filterData.value
                        ? 'secondary'
                        : 'outline'
                    }
                    className={`ml-2 ${
                      selectedFilter === filterData.value
                        ? 'bg-primary-foreground text-primary border-primary-foreground'
                        : 'text-primary border-primary'
                    }`}
                  >
                    {filterData.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Mobile Filter Buttons - Only model types from modal (horizontal scroll) */}
        <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {/* Selected Model Type Filters from Filter Modal */}
          {selectedModelTypes.map((modelType) => {
            const filterData = generateModelFilters.find(
              (f) => f.value === modelType
            )
            if (!filterData) return null

            return (
              <Button
                key={filterData.value}
                variant={
                  selectedFilter === filterData.value ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setSelectedFilter(filterData.value)}
                className="whitespace-nowrap shrink-0 text-xs"
              >
                <span>{filterData.label}</span>
                <Badge
                  variant={
                    selectedFilter === filterData.value
                      ? 'secondary'
                      : 'outline'
                  }
                  className={`ml-1 text-xs ${
                    selectedFilter === filterData.value
                      ? 'bg-primary-foreground text-primary border-primary-foreground'
                      : 'text-primary border-primary'
                  }`}
                >
                  {filterData.count}
                </Badge>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModelModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        selectedModelTypes={selectedModelTypes}
        setSelectedModelTypes={setSelectedModelTypes}
      />
    </div>
  )
}
