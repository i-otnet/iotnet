'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { mockDevicesData } from '@/lib/json/data/device/devicesData'

interface FilterDeviceDefaultProps {
  selectedDeviceTypes: string[]
  setSelectedDeviceTypes: (types: string[]) => void
}

interface DeviceFilter {
  label: string
  value: string
  count: number
  fullType: string
}

export default function FilterDeviceDefault({
  selectedDeviceTypes,
  setSelectedDeviceTypes,
}: FilterDeviceDefaultProps) {
  // Generate device type filters from actual data
  const generateDeviceFilters: DeviceFilter[] = (() => {
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
  })()

  return (
    <div className="space-y-3">
      {generateDeviceFilters.map((filter) => {
        const isChecked = selectedDeviceTypes.includes(filter.value)
        const isAtMaxLimit = selectedDeviceTypes.length >= 2
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
                  if (selectedDeviceTypes.length < 2) {
                    setSelectedDeviceTypes([
                      ...selectedDeviceTypes,
                      filter.value,
                    ])
                  }
                } else {
                  setSelectedDeviceTypes(
                    selectedDeviceTypes.filter((t) => t !== filter.value)
                  )
                }
              }}
              className="w-4 h-4 rounded disabled:cursor-not-allowed"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{filter.label}</p>
              <p className="text-xs text-muted-foreground">
                {filter.count} device{filter.count !== 1 ? 's' : ''}
              </p>
            </div>
            <Badge variant="outline">{filter.count}</Badge>
          </label>
        )
      })}
      {selectedDeviceTypes.length >= 2 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Maximum 2 device types can be selected
          </p>
        </div>
      )}
    </div>
  )
}
