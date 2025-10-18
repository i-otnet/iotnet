'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Zap,
  PlayCircle,
  PauseCircle,
  Activity,
  Search,
  Filter,
} from 'lucide-react'

const automationTypeFilters = [
  { label: 'All Triggers', value: 'all', count: 12 },
  { label: 'Time-based', value: 'time', count: 4 },
  { label: 'Sensor-based', value: 'sensor', count: 5 },
  { label: 'Event-based', value: 'event', count: 3 },
]

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
}

export default function AutomationsOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredAutomations,
  triggeredToday,
  getFilteredCount,
}: AutomationsOverviewSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
          <p className="text-muted-foreground">
            Create and manage automated triggers for your IoT devices
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Add Trigger
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {filteredAutomations.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedFilter === 'all'
                    ? 'Total Triggers'
                    : 'Filtered Triggers'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <PlayCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    filteredAutomations.filter(
                      (auto) => auto.status === 'active'
                    ).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <PauseCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    filteredAutomations.filter(
                      (auto) => auto.status === 'paused'
                    ).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{triggeredToday}</p>
                <p className="text-sm text-muted-foreground">Triggered Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {automationTypeFilters.map((filter) => (
            <Badge
              key={filter.value}
              variant={selectedFilter === filter.value ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1 hover:bg-primary/80"
              onClick={() => setSelectedFilter(filter.value)}
            >
              {filter.label}
              <span className="ml-2 font-semibold">
                {getFilteredCount(filter.value)}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
