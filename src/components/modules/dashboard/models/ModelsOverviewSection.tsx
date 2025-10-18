'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  BrainCircuit,
  Sparkles,
  Search,
  Filter,
  PauseCircle,
} from 'lucide-react'

const modelTypeFilters = [
  { label: 'All Models', value: 'all', count: 8 },
  { label: 'Classification', value: 'classification', count: 3 },
  { label: 'Regression', value: 'regression', count: 2 },
  { label: 'Clustering', value: 'clustering', count: 1 },
  { label: 'Time Series', value: 'timeseries', count: 2 },
]

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
  getFilteredCount,
}: ModelsOverviewSectionProps) {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Models</h1>
          <p className="text-muted-foreground">
            Manage and deploy your machine learning models
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Deploy Model
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalModels}</p>
                <p className="text-sm text-muted-foreground">Total Models</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deployedModels}</p>
                <p className="text-sm text-muted-foreground">Deployed</p>
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
                <p className="text-2xl font-bold">{inactiveModels}</p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgAccuracy}%</p>
                <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
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
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Model Type Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {modelTypeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.value)}
              className="whitespace-nowrap"
            >
              {filter.label}
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
  )
}
