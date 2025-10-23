'use client'

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { WidgetOption } from '@/lib/json/widgetOptionsData'
import { virtualPinsResponse } from '@/lib/json/virtualPinsResponse'
import { DeviceWidgetConfiguration } from '@/components/modules/dashboard/deviceDetail/addWidgetDevice/deviceViews/widgetConfigurationView'

interface EditWidgetConfigurationViewProps {
  widget: WidgetOption
  config: DeviceWidgetConfiguration
  onConfigurationSave: (config: DeviceWidgetConfiguration) => void
  onValidationChange?: (isValid: boolean) => void
}

export interface WidgetConfigurationHandle {
  handleSave: () => void
  isValid: boolean
}

// Widget types that support unit
const WIDGETS_WITH_UNIT = ['statistics', 'chart', 'slider', 'gauge']

// Widget types that support min/max values
const WIDGETS_WITH_MIN_MAX = ['slider', 'gauge']

const EditWidgetConfigurationView = forwardRef<
  WidgetConfigurationHandle,
  EditWidgetConfigurationViewProps
>(({ widget, config, onConfigurationSave, onValidationChange }, ref) => {
  const [widgetName, setWidgetName] = useState(config.widgetName)
  const [selectedPin, setSelectedPin] = useState<string | null>(
    typeof config.dataPin === 'string' ? config.dataPin : null
  )
  const [unit, setUnit] = useState(config.unit || '')
  const [minValue, setMinValue] = useState<number | ''>(config.minValue || '')
  const [maxValue, setMaxValue] = useState<number | ''>(config.maxValue || '')

  const hasUnit = WIDGETS_WITH_UNIT.includes(widget.id)
  const hasMinMax = WIDGETS_WITH_MIN_MAX.includes(widget.id)

  const isValid =
    widgetName.trim() !== '' &&
    selectedPin !== null &&
    (!hasMinMax || (minValue !== '' && maxValue !== ''))

  // Notify parent when validation changes
  useEffect(() => {
    onValidationChange?.(isValid)
  }, [isValid, onValidationChange])

  const handleSave = () => {
    if (!isValid) return

    const updatedConfig: DeviceWidgetConfiguration = {
      widgetName: widgetName.trim(),
      dataPin: selectedPin!,
      size: config.size,
      ...(hasUnit && unit && { unit: unit.trim() }),
      ...(hasMinMax && {
        minValue: Number(minValue),
        maxValue: Number(maxValue),
      }),
    }

    onConfigurationSave(updatedConfig)
  }

  useImperativeHandle(ref, () => ({
    handleSave,
    isValid,
  }))

  return (
    <div className="w-full max-w-2xl mx-auto py-2 space-y-4">
      {/* Widget Name */}
      <div className="space-y-2">
        <Label htmlFor="widget-name" className="text-sm font-semibold">
          Widget Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="widget-name"
          placeholder={`e.g., ${widget.title} Monitor`}
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="h-10"
        />
        <p className="text-xs text-muted-foreground">
          Give your widget a descriptive name
        </p>
      </div>

      {/* Data Pin Selection */}
      <div className="space-y-2">
        <Label htmlFor="data-pin" className="text-sm font-semibold">
          Data Pin <span className="text-destructive">*</span>
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-10"
              id="data-pin"
            >
              <span>
                {selectedPin ? selectedPin : 'Select a virtual pin...'}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-64 overflow-y-auto"
            align="start"
          >
            {virtualPinsResponse.data.virtualPins.map((pin) => (
              <DropdownMenuItem
                key={pin.id}
                onClick={() => setSelectedPin(pin.value)}
              >
                {pin.value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-xs text-muted-foreground">
          Select the virtual pin that will provide data to this widget
        </p>
      </div>

      {/* Unit (Optional for certain widgets) */}
      {hasUnit && (
        <div className="space-y-2">
          <Label htmlFor="unit" className="text-sm font-semibold">
            Unit <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="unit"
            placeholder="e.g., °C, %, ppm, etc."
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty if not applicable
          </p>
        </div>
      )}

      {/* Min and Max Values (Only for slider and gauge) */}
      {hasMinMax && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-value" className="text-sm font-semibold">
              Min Value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="min-value"
              type="number"
              placeholder="0"
              value={minValue}
              onChange={(e) =>
                setMinValue(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-value" className="text-sm font-semibold">
              Max Value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="max-value"
              type="number"
              placeholder="100"
              value={maxValue}
              onChange={(e) =>
                setMaxValue(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="h-10"
            />
          </div>
        </div>
      )}
    </div>
  )
})

EditWidgetConfigurationView.displayName = 'EditWidgetConfigurationView'

export default EditWidgetConfigurationView
