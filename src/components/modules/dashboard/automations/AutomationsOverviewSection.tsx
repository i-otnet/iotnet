'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Zap,
  PlayCircle,
  PauseCircle,
  Activity,
  Filter,
} from 'lucide-react'
import { mockAutomationsData } from '@/lib/json/automationsData'
import { FilterAutomationModal } from './filterAutomation/filterAutomationModal'
import SearchAutomationDefault from './searchAutomation/searchAutomationDefault'

interface Automation {
  id: number
  status: string
}

interface AutomationsOverviewSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  filteredAutomations: Automation[]
  totalAutomations: number
  activeAutomations: number
  pausedAutomations: number
  triggeredToday: number
  getFilteredCount: (filterType: string) => number
  onAddAutomationClick?: () => void
}

export default function AutomationsOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredAutomations,
  triggeredToday,
  onAddAutomationClick,
}: AutomationsOverviewSectionProps) {
  const [selectedAutomationTypes, setSelectedAutomationTypes] = useState<
    string[]
  >([])
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Generate automation type filters from actual data for displaying badges
  const generateAutomationFilters = useMemo(() => {
    const automations = mockAutomationsData.data.automations

    // Count automation types
    const typeCount: Record<string, number> = {}
    automations.forEach((automation) => {
      const type = automation.type
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

  return (
    <div className="flex flex-col gap-4">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Automations
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Create and manage automated triggers for your IoT devices
          </p>
        </div>
        <Button
          size="default"
          className="gap-2 w-full sm:w-auto"
          onClick={onAddAutomationClick}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Trigger</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {filteredAutomations.length}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {selectedFilter === 'all'
                    ? 'Total Triggers'
                    : 'Filtered Triggers'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-green-500/10">
                <PlayCircle className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {
                    filteredAutomations.filter(
                      (auto) => auto.status === 'active'
                    ).length
                  }
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Active
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
                  {
                    filteredAutomations.filter(
                      (auto) => auto.status === 'paused'
                    ).length
                  }
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Paused
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Activity className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {triggeredToday}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Triggered Today
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
            <SearchAutomationDefault
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          {/* Filter Button - Mobile */}
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Desktop Search Input with Filter Button */}
          <div className="hidden sm:flex items-center gap-2 flex-1">
            <div className="flex-1">
              <SearchAutomationDefault
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Automation Type Filters - Horizontal Scroll (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
            {/* All Automations Filter - Desktop */}
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className="whitespace-nowrap flex-shrink-0"
            >
              <span className="text-xs md:text-sm">All Triggers</span>
              <Badge
                variant={selectedFilter === 'all' ? 'secondary' : 'outline'}
                className={`ml-2 ${
                  selectedFilter === 'all'
                    ? 'bg-primary-foreground text-primary border-primary-foreground'
                    : 'text-primary border-primary'
                }`}
              >
                {mockAutomationsData.data.automations.length}
              </Badge>
            </Button>

            {/* Selected Automation Type Filters from Filter Modal */}
            {selectedAutomationTypes.map((automationType) => {
              const filterData = generateAutomationFilters.find(
                (f) => f.value === automationType
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
                  className="whitespace-nowrap flex-shrink-0"
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

        {/* Mobile Filter Buttons - Only automation types from modal (horizontal scroll) */}
        <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {/* Selected Automation Type Filters from Filter Modal */}
          {selectedAutomationTypes.map((automationType) => {
            const filterData = generateAutomationFilters.find(
              (f) => f.value === automationType
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
                className="whitespace-nowrap flex-shrink-0 text-xs"
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
      <FilterAutomationModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        selectedAutomationTypes={selectedAutomationTypes}
        setSelectedAutomationTypes={setSelectedAutomationTypes}
      />
    </div>
  )
}
