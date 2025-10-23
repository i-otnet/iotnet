'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import ButtonWidget from '@/components/modules/widgets/widgetDevices/buttonWidget'
import ChartWidget from '@/components/modules/widgets/widgetDevices/chartWidget'
import GaugeWidget from '@/components/modules/widgets/widgetDevices/gaugeWidget'
import SliderWidget from '@/components/modules/widgets/widgetDevices/sliderWidget'
import StatWidget from '@/components/modules/widgets/widgetDevices/statWidget'
import SwitchWidget from '@/components/modules/widgets/widgetDevices/switchWidget'
import { WidgetOption } from '@/lib/json/widgetOptionsData'
import { mockChartData } from '@/lib/json/mockChartData'
import type { ChartPin } from '@/lib/json/deviceWidgetsMockData'
import { generateChartDataFromPins } from '@/lib/utils/chartColorUtils'
import { Trash2, Edit2, GripVertical, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getWidgetBorderStyle,
  getWidgetTypeName,
  getWidgetResizeConstraints,
  getWidgetDefaultSize,
} from '@/lib/utils/widgetUtils'
import { useWidgetResize, type WidgetSize } from '@/lib/hooks/useWidgetResize'
import ResizeLineIndicator from '@/components/shared/resizeLineIndicator'

interface WidgetConfig {
  name: string
  virtualPin: string | ChartPin[]
  unit?: string
  minValue?: number
  maxValue?: number
}

interface DeviceDetailWidgetProps {
  widget: WidgetOption
  config: WidgetConfig
  isEditing?: boolean
  isSelected?: boolean
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onSizeChange?: (size: WidgetSize) => void
}

export default function DeviceDetailWidget({
  widget,
  config,
  isEditing = false,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  onSizeChange,
}: DeviceDetailWidgetProps) {
  const [buttonState, setButtonState] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [sliderValue, setSliderValue] = useState(config.minValue || 0)
  const [gaugeValue, setGaugeValue] = useState(config.minValue || 0)
  const [resizeLineX, setResizeLineX] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const constraints = getWidgetResizeConstraints(widget.id, 'device')
  const defaultSize = getWidgetDefaultSize(widget.id, 'device')

  // For chart widgets, force maxRows to 1 to prevent vertical resizing
  const chartConstraints =
    widget.id === 'chart'
      ? { ...constraints, minRows: 1, maxRows: 1 }
      : constraints

  const {
    size,
    dragLinePosition,
    isResizing,
    handleResizeStart,
    attachResizeListeners,
    detachResizeListeners,
  } = useWidgetResize({
    initialSize: { cols: defaultSize, rows: 1 },
    minSize: { cols: chartConstraints.minCols, rows: chartConstraints.minRows },
    maxSize: { cols: chartConstraints.maxCols, rows: chartConstraints.maxRows },
    gridColumns: 4,
    onResize: (newSize) => {
      onSizeChange?.(newSize)
    },
    onResizeMove: (clientX) => {
      setResizeLineX(clientX)
    },
  })

  useEffect(() => {
    if (isResizing) {
      attachResizeListeners()
      // Disable text selection while resizing
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      return () => {
        detachResizeListeners()
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    } else {
      // Clear line saat resize selesai
      setResizeLineX(null)
    }
  }, [isResizing, attachResizeListeners, detachResizeListeners])

  const handleCardClick = () => {
    if (isEditing && onSelect) {
      onSelect()
    }
  }

  const handleInteraction = (callback: () => void) => {
    if (!isEditing) {
      callback()
    }
  }

  // Generate chart data from pins configuration
  const getChartData = () => {
    if (Array.isArray(config.virtualPin)) {
      // Multi-pin chart - use utility function
      return generateChartDataFromPins(config.virtualPin, mockChartData)
    } else {
      // Single pin (fallback for old data) - add required borderColor
      return {
        labels: mockChartData.labels,
        datasets: mockChartData.datasets.map((dataset) => ({
          ...dataset,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        })),
      }
    }
  }

  const renderWidget = () => {
    switch (widget.id) {
      case 'statistics':
        return (
          <div
            className={`h-full w-full ${
              isEditing ? 'pointer-events-none' : ''
            }`}
          >
            <StatWidget value={`0 ${config.unit || ''}`} color="primary" />
          </div>
        )
      case 'chart':
        return <ChartWidget data={getChartData()} />
      case 'button':
        return (
          <div className={`h-full ${isEditing ? 'pointer-events-none' : ''}`}>
            <ButtonWidget
              active={buttonState}
              onClick={() =>
                handleInteraction(() => setButtonState(!buttonState))
              }
            />
          </div>
        )
      case 'slider':
        return (
          <div
            className={`h-full w-full ${
              isEditing ? 'pointer-events-none' : ''
            }`}
          >
            <SliderWidget
              value={sliderValue}
              min={config.minValue || 0}
              max={config.maxValue || 100}
              onChange={(val) => handleInteraction(() => setSliderValue(val))}
              label={`${sliderValue} ${config.unit || ''}`}
            />
          </div>
        )
      case 'switch':
        return (
          <div className={`h-full ${isEditing ? 'pointer-events-none' : ''}`}>
            <SwitchWidget
              enabled={switchState}
              onChange={(val) => handleInteraction(() => setSwitchState(val))}
              label="Device Status"
            />
          </div>
        )
      case 'gauge':
        return (
          <GaugeWidget
            value={gaugeValue}
            min={config.minValue || 0}
            max={config.maxValue || 100}
          >
            <div className="text-3xl font-bold text-primary">
              {gaugeValue} {config.unit || ''}
            </div>
          </GaugeWidget>
        )
      default:
        return <div>Unknown widget type</div>
    }
  }

  const borderStyle = getWidgetBorderStyle(isEditing, isSelected)

  return (
    <>
      <div
        ref={containerRef}
        className="relative transition-all duration-150"
        style={{
          gridColumn: `span ${size.cols}`,
          userSelect: isResizing ? 'none' : 'auto',
        }}
        data-widget-container="true"
      >
        <Card
          className={`p-3 relative ${borderStyle} ${
            isEditing ? 'cursor-pointer' : ''
          } transition-all h-full flex flex-col`}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (isEditing && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              handleCardClick()
            }
          }}
          role={isEditing ? 'button' : undefined}
          tabIndex={isEditing ? 0 : -1}
        >
          {/* Widget Type Label */}
          <div className="absolute top-2 left-2 z-10">
            <span className="text-xs font-medium text-primary">
              {getWidgetTypeName(widget.id)}
            </span>
          </div>

          {/* Drag Handle Icon */}
          {isEditing && isSelected && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 cursor-move group">
              <div className="p-1 rounded-full transition-all duration-200 group-hover:bg-primary/10">
                <GripVertical className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}

          {/* Resize Handle Icon - Right Middle */}
          {isEditing && isSelected && (
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-50 cursor-ew-resize group select-none"
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // For chart widgets, only allow horizontal resize (direction 'e')
                // For other widgets, allow both directions (direction 'se')
                const direction = widget.id === 'chart' ? 'e' : 'se'
                containerRef.current &&
                  handleResizeStart(e, direction, containerRef.current)
              }}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // For chart widgets, only allow horizontal resize (direction 'e')
                // For other widgets, allow both directions (direction 'se')
                const direction = widget.id === 'chart' ? 'e' : 'se'
                containerRef.current &&
                  handleResizeStart(e, direction, containerRef.current)
              }}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-primary shadow-sm transition-all duration-200 group-hover:bg-primary/10 group-hover:shadow-md">
                <ArrowLeftRight className="h-3 w-3 text-primary pointer-events-none" />
              </div>
            </div>
          )}

          {/* Edit and Delete buttons */}
          {isEditing && isSelected && (
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-white border-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit()
                  }}
                >
                  <Edit2 className="h-4 w-4 text-primary" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Widget Content */}
          <div className="flex flex-col h-full mt-6 justify-between">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-foreground">
                {config.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pin:{' '}
                {Array.isArray(config.virtualPin)
                  ? config.virtualPin.map((p) => p.pin).join(', ')
                  : config.virtualPin}
              </p>
            </div>
            <div className="flex-1">{renderWidget()}</div>
          </div>

          {/* Resizing overlay dengan grid lines */}
          {isResizing && (
            <>
              <div className="absolute inset-0 bg-primary/5 border-2 border-primary rounded-lg pointer-events-none z-40 select-none" />

              {/* Current size indicator */}
              <div className="absolute bottom-2 left-2 z-50 bg-primary/90 text-white text-xs px-2 py-1 rounded font-medium pointer-events-none">
                {size.cols}col{size.cols > 1 ? 's' : ''}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Global Resize Line Indicator */}
      <ResizeLineIndicator lineX={resizeLineX} isVisible={isResizing} />
    </>
  )
}
