'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { mockModelsData } from '@/lib/json/modelsData'

interface FilterModelDefaultProps {
  selectedModelTypes: string[]
  setSelectedModelTypes: (types: string[]) => void
}

interface ModelFilter {
  label: string
  value: string
  count: number
  fullType: string
}

export default function FilterModelDefault({
  selectedModelTypes,
  setSelectedModelTypes,
}: FilterModelDefaultProps) {
  // Generate model type filters from actual data
  const generateModelFilters: ModelFilter[] = (() => {
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
  })()

  return (
    <div className="space-y-3">
      {generateModelFilters.map((filter) => {
        const isChecked = selectedModelTypes.includes(filter.value)
        const isAtMaxLimit = selectedModelTypes.length >= 2
        const isDisabled = isAtMaxLimit && !isChecked

        return (
          <label
            key={filter.value}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              isDisabled
                ? 'border-muted/30 bg-muted/30 opacity-50 cursor-not-allowed'
                : 'border-muted hover:bg-muted/50'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              disabled={isDisabled}
              onChange={(e) => {
                if (e.target.checked) {
                  if (selectedModelTypes.length < 2) {
                    setSelectedModelTypes([...selectedModelTypes, filter.value])
                  }
                } else {
                  setSelectedModelTypes(
                    selectedModelTypes.filter((t) => t !== filter.value)
                  )
                }
              }}
              className="w-4 h-4 rounded disabled:cursor-not-allowed"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{filter.label}</p>
              <p className="text-xs text-muted-foreground">
                {filter.count} model{filter.count !== 1 ? 's' : ''}
              </p>
            </div>
            <Badge variant="outline">{filter.count}</Badge>
          </label>
        )
      })}
      {selectedModelTypes.length >= 2 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Maximum 2 model types can be selected
          </p>
        </div>
      )}
    </div>
  )
}
