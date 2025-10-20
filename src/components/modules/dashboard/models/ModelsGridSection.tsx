'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  AlertTriangle,
  Clock,
  MoreVertical,
  Settings,
  BarChart3,
  Trash2,
  Eye,
  Plus,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { AddModelModal } from './addModel/addModelModal'
import { EditModelModal } from './editModel/editModelModal'
import { FilterModelModal } from './filterModel/filterModelModal'
import { SearchModelModal } from './searchModel/searchModelModal'
import { iconMap } from '@/lib/json/iconsData'

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

interface ModelsGridSectionProps {
  filteredModels: Model[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  onModelAdded?: (newModel: Model) => void
  isAddModelModalOpen?: boolean
  setIsAddModelModalOpen?: (open: boolean) => void
  onInsightsClick?: (modelId: number) => void
}

export default function ModelsGridSection({
  filteredModels,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  onModelAdded,
  isAddModelModalOpen = false,
  setIsAddModelModalOpen = () => {},
  onInsightsClick = () => {},
}: ModelsGridSectionProps) {
  const [editModelModalOpen, setEditModelModalOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [deletedModels, setDeletedModels] = useState<number[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [selectedModelTypes, setSelectedModelTypes] = useState<string[]>([])

  const handleEditModel = (model: Model) => {
    setSelectedModel(model)
    setEditModelModalOpen(true)
  }

  const handleDeleteModel = (model: Model) => {
    setDeletedModels([...deletedModels, model.id])
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <Sparkles className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <Clock className="w-4 h-4 text-muted-foreground" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'inactive':
        return 'bg-muted text-muted-foreground border-muted'
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredModels.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
          <div className="max-w-md w-full border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center bg-primary/5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {searchQuery || selectedFilter !== 'all'
                ? 'No models found'
                : 'Add New Model'}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery
                ? `No models match "${searchQuery}" in the selected category.`
                : selectedFilter !== 'all'
                ? 'No models found in the selected category.'
                : 'Connect a new ML model to your network'}
            </p>
            {searchQuery || selectedFilter !== 'all' ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedFilter('all')
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          {filteredModels.map((model) => {
            // Skip deleted models
            if (deletedModels.includes(model.id)) {
              return null
            }

            const IconComponent = iconMap[model.icon]
            return (
              <Card
                key={model.id}
                className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-primary" />
                        ) : (
                          <Settings className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {model.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {model.type}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => handleEditModel(model)}
                        >
                          <Settings className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => handleDeleteModel(model)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(model.status)}
                      <span className="text-sm font-medium capitalize">
                        {model.status}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(model.status)}
                    >
                      {model.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Framework:</span>
                      <span className="font-medium">{model.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="font-medium">{model.version}</span>
                    </div>
                    {model.accuracy && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="font-medium text-primary">
                          {model.accuracy}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated:</span>
                      <span className="font-medium">{model.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditModel(model)}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Settings
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => onInsightsClick(model.id)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Add New Model Card */}
          <Card
            className="group hover:shadow-lg transition-all duration-200 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/20 hover:bg-muted/30 cursor-pointer"
            onClick={() => setIsAddModelModalOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center min-h-[300px]">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Add New Model</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect a new ML model to your network
              </p>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAddModelModalOpen(true)
                }}
                className="text-muted-foreground hover:text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Add Model Modal */}
      <AddModelModal
        open={isAddModelModalOpen}
        onOpenChange={setIsAddModelModalOpen}
        onModelAdded={(modelData) => {
          onModelAdded?.({
            id: Math.random(),
            name: modelData.name,
            type: modelData.type,
            status: modelData.status,
            framework: modelData.framework,
            lastUpdated: 'just now',
            icon: modelData.icon || 'BrainCircuit',
            version: modelData.version,
          })
          setIsAddModelModalOpen(false)
        }}
      />

      {/* Edit Model Modal */}
      <EditModelModal
        open={editModelModalOpen}
        onOpenChange={setEditModelModalOpen}
        model={selectedModel}
      />

      {/* Filter Model Modal */}
      <FilterModelModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        selectedModelTypes={selectedModelTypes}
        setSelectedModelTypes={setSelectedModelTypes}
      />

      {/* Search Model Modal */}
      <SearchModelModal
        open={showSearchModal}
        onOpenChange={setShowSearchModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  )
}
