'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Cpu, Wifi, WifiOff, Zap, Search, Filter } from 'lucide-react'

const deviceTypeFilters = [
  { label: 'All Devices', value: 'all', count: 10 },
  { label: 'ESP32', value: 'esp32', count: 3 },
  { label: 'ESP8266', value: 'esp8266', count: 1 },
  { label: 'Raspberry Pi', value: 'raspberry', count: 2 },
  { label: 'Orange Pi', value: 'orange', count: 2 },
  { label: 'Wemos', value: 'wemos', count: 2 },
]

interface Device {
  id: number
  status: string
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
}

export default function DevicesOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredDevices,
  newDevicesThisWeek,
  getFilteredCount,
}: DevicesOverviewSectionProps) {
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
        <Button size="default" className="gap-2 w-full sm:w-auto">
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
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Device Type Filters - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-thin">
            {deviceTypeFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={
                  selectedFilter === filter.value ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="whitespace-nowrap flex-shrink-0"
              >
                <span className="text-xs md:text-sm">{filter.label}</span>
                <Badge
                  variant={
                    selectedFilter === filter.value ? 'secondary' : 'outline'
                  }
                  className={`ml-2 ${
                    selectedFilter === filter.value
                      ? 'bg-primary-foreground text-primary border-primary-foreground'
                      : 'text-primary border-primary'
                  }`}
                >
                  {getFilteredCount(filter.value)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
