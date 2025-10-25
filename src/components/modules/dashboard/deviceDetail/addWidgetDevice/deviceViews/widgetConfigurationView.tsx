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
import { ChevronDown, Plus, X } from 'lucide-react'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import { virtualPinsResponse } from '@/lib/json/response/virtualPin/virtualPinsResponse'
import { getDeviceWidgetDefaultSize } from '@/lib/utils/widgetUtils'
import { getRandomChartColor } from '@/lib/utils/chartColorUtils'

interface WidgetConfigurationViewProps {
  widget: WidgetOption
  onConfigurationSave: (config: DeviceWidgetConfiguration) => void
  onValidationChange?: (isValid: boolean) => void
}

export interface ChartPin {
  pin: string
  color: string
  backgroundColor: string
}

export interface DeviceWidgetConfiguration {
  widgetName: string
  dataPin: string | ChartPin[] // Single pin or multiple pins for chart
  unit?: string
  minValue?: number
  maxValue?: number
  size: number // Size ratio (1 = 1/4, 2 = 1/2, etc.)
  currentValue?: boolean | number
  buttonType?: 'push' | 'toggle' // For button widget only
}

export interface WidgetConfigurationHandle {
  handleSave: () => void
  isValid: boolean
}

// Widget types that support unit
const WIDGETS_WITH_UNIT = ['statistics', 'chart', 'slider', 'gauge']

// Widget types that support min/max values
const WIDGETS_WITH_MIN_MAX = ['slider', 'gauge']

const WidgetConfigurationView = forwardRef<
  WidgetConfigurationHandle,
  WidgetConfigurationViewProps
>(({ widget, onConfigurationSave, onValidationChange }, ref) => {
  const [widgetName, setWidgetName] = useState('')
  const [selectedPin, setSelectedPin] = useState<string | null>(null)
  const [chartPins, setChartPins] = useState<ChartPin[]>([])
  const [unit, setUnit] = useState('')
  const [minValue, setMinValue] = useState<number | ''>('')
  const [maxValue, setMaxValue] = useState<number | ''>('')
  const [buttonType, setButtonType] = useState<'push' | 'toggle'>('push')

  const isChartWidget = widget.id === 'chart'
  const isButtonWidget = widget.id === 'button'
  const hasUnit = WIDGETS_WITH_UNIT.includes(widget.id)
  const hasMinMax = WIDGETS_WITH_MIN_MAX.includes(widget.id)

  const isValid =
    widgetName.trim() !== '' &&
    (isChartWidget ? chartPins.length > 0 : selectedPin !== null) &&
    (!hasMinMax || (minValue !== '' && maxValue !== ''))

  // Notify parent when validation changes
  useEffect(() => {
    onValidationChange?.(isValid)
  }, [isValid, onValidationChange])

  // Add new pin to chart (for chart widget only)
  const handleAddChartPin = (pin: string) => {
    if (chartPins.some((p) => p.pin === pin)) {
      return // Pin already added
    }

    // All pins get random colors
    const color = getRandomChartColor()

    setChartPins([
      ...chartPins,
      {
        pin,
        color: color.borderColor,
        backgroundColor: color.backgroundColor,
      },
    ])
  }

  // Remove pin from chart
  const handleRemoveChartPin = (pinToRemove: string) => {
    const updatedPins = chartPins.filter((p) => p.pin !== pinToRemove)
    setChartPins(updatedPins)
  }

  // Get available pins (not yet added to chart)
  const getAvailablePins = () => {
    return virtualPinsResponse.data.virtualPins.filter(
      (pin) => !chartPins.some((p) => p.pin === pin.value)
    )
  }

  const handleSave = () => {
    if (!isValid) return

    const config: DeviceWidgetConfiguration = {
      widgetName: widgetName.trim(),
      dataPin: isChartWidget ? chartPins : selectedPin!,
      size: getDeviceWidgetDefaultSize(widget.id),
      ...(hasUnit && unit && { unit: unit.trim() }),
      ...(hasMinMax && {
        minValue: Number(minValue),
        maxValue: Number(maxValue),
      }),
      ...(isButtonWidget && { buttonType }),
    }

    onConfigurationSave(config)
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

      {/* Data Pin Selection - Single Pin for non-chart widgets */}
      {!isChartWidget && (
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
      )}

      {/* Multi-Pin Selection for Chart Widget */}
      {isChartWidget && (
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Data Pins <span className="text-destructive">*</span>
          </Label>

          {/* Display added pins */}
          {chartPins.length > 0 && (
            <div className="space-y-2 mb-3">
              {chartPins.map((chartPin) => (
                <div
                  key={chartPin.pin}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
                >
                  {/* Color indicator */}
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: chartPin.color }}
                  />

                  {/* Pin info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {chartPin.pin}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveChartPin(chartPin.pin)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add pin dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-10"
                disabled={getAvailablePins().length === 0}
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {chartPins.length === 0 ? 'Add first pin' : 'Add another pin'}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-64 overflow-y-auto"
              align="start"
            >
              {getAvailablePins().map((pin) => (
                <DropdownMenuItem
                  key={pin.id}
                  onClick={() => handleAddChartPin(pin.value)}
                >
                  {pin.value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-xs text-muted-foreground">
            {chartPins.length === 0
              ? 'Add data pins. Each pin will get a random color.'
              : `${chartPins.length} pin(s) added with random colors.`}
          </p>
        </div>
      )}

      {/* Button Type Selection (Only for button widget) */}
      {isButtonWidget && (
        <div className="space-y-2">
          <Label htmlFor="button-type" className="text-sm font-semibold">
            Button Type <span className="text-destructive">*</span>
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-10"
                id="button-type"
              >
                <span>
                  {buttonType === 'push'
                    ? 'Push Button (Press to activate)'
                    : 'Toggle Button (Press to toggle)'}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[var(--radix-dropdown-menu-trigger-width)]"
              align="start"
            >
              <DropdownMenuItem onClick={() => setButtonType('push')}>
                Push Button
                <span className="text-xs text-muted-foreground ml-2">
                  Press to activate
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setButtonType('toggle')}>
                Toggle Button
                <span className="text-xs text-muted-foreground ml-2">
                  Press to toggle
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-xs text-muted-foreground">
            {buttonType === 'push'
              ? 'Button will be active while pressed, inactive when released'
              : 'Button will toggle state on each press'}
          </p>
        </div>
      )}

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

WidgetConfigurationView.displayName = 'WidgetConfigurationView'

export default WidgetConfigurationView
