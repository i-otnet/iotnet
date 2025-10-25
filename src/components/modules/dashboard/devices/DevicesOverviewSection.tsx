'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Cpu, Wifi, WifiOff, Zap, Filter } from 'lucide-react'
import { mockDevicesData } from '@/lib/json/data/device/devicesData'
import { FilterDeviceModal } from './filterDevice/filterDeviceModal'
import SearchDeviceDefault from './searchDevice/searchDeviceDefault'

interface Device {
  id: number
  status: string
  type: string
}

interface DevicesOverviewSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  filteredDevices: Device[]
  totalDevices: number
  activeDevices: number
  offlineDevices: number
  newDevicesThisWeek: number
  getFilteredCount: (filterType: string) => number
  onAddDeviceClick?: () => void
}

export default function DevicesOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredDevices,
  newDevicesThisWeek,
  onAddDeviceClick,
}: DevicesOverviewSectionProps) {
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState<string[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Generate device type filters from actual data for displaying badges
  const generateDeviceFilters = useMemo(() => {
    const devices = mockDevicesData.data.devices

    // Count device types
    const typeCount: Record<string, number> = {}
    devices.forEach((device) => {
      const type = device.type
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
            Devices
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage and monitor all your IoT devices
          </p>
        </div>
        <Button
          size="default"
          className="gap-2 w-full sm:w-auto"
          onClick={onAddDeviceClick}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Device</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Cpu className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {filteredDevices.length}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {selectedFilter === 'all' ? 'Total Devices' : 'Filtered'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-green-500/10">
                <Wifi className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {
                    filteredDevices.filter(
                      (device) => device.status === 'online'
                    ).length
                  }
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Online
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-muted">
                <WifiOff className="w-4 h-4 md:w-6 md:h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {
                    filteredDevices.filter(
                      (device) => device.status === 'offline'
                    ).length
                  }
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Offline
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {newDevicesThisWeek}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  New This Week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar - Responsive */}
      <div className="flex flex-col gap-4">
        {/* Mobile Layout: Search + All Devices Badge in one line */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <div className="flex-1 min-w-0">
            <SearchDeviceDefault
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          {/* All Devices Badge Button - Mobile */}
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className="whitespace-nowrap flex-shrink-0 text-xs"
          >
            <span>All</span>
            <Badge
              variant={selectedFilter === 'all' ? 'secondary' : 'outline'}
              className={`ml-1 text-xs ${
                selectedFilter === 'all'
                  ? 'bg-primary-foreground text-primary border-primary-foreground'
                  : 'text-primary border-primary'
              }`}
            >
              {mockDevicesData.data.devices.length}
            </Badge>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Desktop Search Input with Filter (visible on sm and above) */}
          <div className="hidden sm:flex items-center gap-2 flex-1">
            <div className="flex-1">
              <SearchDeviceDefault
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

          {/* Device Type Filters - Horizontal Scroll (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
            {/* All Devices Filter - Desktop */}
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className="whitespace-nowrap flex-shrink-0"
            >
              <span className="text-xs md:text-sm">All Devices</span>
              <Badge
                variant={selectedFilter === 'all' ? 'secondary' : 'outline'}
                className={`ml-2 ${
                  selectedFilter === 'all'
                    ? 'bg-primary-foreground text-primary border-primary-foreground'
                    : 'text-primary border-primary'
                }`}
              >
                {mockDevicesData.data.devices.length}
              </Badge>
            </Button>

            {/* Selected Device Type Filters from Filter Modal */}
            {selectedDeviceTypes.map((deviceType) => {
              const filterData = generateDeviceFilters.find(
                (f) => f.value === deviceType
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

        {/* Mobile Filter Buttons - Only device types from modal (horizontal scroll) */}
        <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {/* Selected Device Type Filters from Filter Modal */}
          {selectedDeviceTypes.map((deviceType) => {
            const filterData = generateDeviceFilters.find(
              (f) => f.value === deviceType
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
      <FilterDeviceModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        selectedDeviceTypes={selectedDeviceTypes}
        setSelectedDeviceTypes={setSelectedDeviceTypes}
      />
    </div>
  )
}
