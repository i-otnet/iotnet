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
import {
  getWidgetBorderStyle,
  getWidgetResizeConstraints,
  getWidgetDefaultSize,
} from '@/lib/utils/widgetUtils'
import { useWidgetResize, type WidgetSize } from '@/lib/hooks/useWidgetResize'
import { useWidgetDrag, type WidgetPosition } from '@/lib/hooks/useWidgetDrag'
import ResizeLineIndicator from '@/components/shared/resizeLineIndicator'
import WidgetControls from './widgetControls'
import DragPlaceholder from './dragPlaceholder'

interface WidgetConfig {
  name: string
  virtualPin: string | ChartPin[]
  unit?: string
  minValue?: number
  maxValue?: number
  currentValue?: boolean | number
  buttonType?: 'push' | 'toggle' // For button widget
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
  onPositionChange?: (position: WidgetPosition) => void
  initialSize?: WidgetSize
  initialPosition?: { row: number; col: number }
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
  onPositionChange,
  initialSize,
  initialPosition = { row: 1, col: 1 },
}: DeviceDetailWidgetProps) {
  const [buttonState, setButtonState] = useState(
    typeof config.currentValue === 'boolean' ? config.currentValue : false
  )
  const [isPushButtonPressed, setIsPushButtonPressed] = useState(false)
  const [switchState, setSwitchState] = useState(
    typeof config.currentValue === 'boolean' ? config.currentValue : false
  )
  const [sliderValue, setSliderValue] = useState(
    typeof config.currentValue === 'number'
      ? config.currentValue
      : config.minValue || 0
  )
  const [resizeLineX, setResizeLineX] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const constraints = getWidgetResizeConstraints(widget.id)
  const defaultSize = getWidgetDefaultSize(widget.id, 'device')

  // For chart widgets, force maxRows to 1 to prevent vertical resizing
  const chartConstraints =
    widget.id === 'chart'
      ? { ...constraints, minRows: 1, maxRows: 1 }
      : constraints

  const {
    size,
    isResizing,
    handleResizeStart,
    attachResizeListeners,
    detachResizeListeners,
  } = useWidgetResize({
    initialSize: initialSize || { cols: defaultSize, rows: 1 },
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

  const {
    isDragging,
    dragOffset,
    handleDragStart,
    attachDragListeners,
    detachDragListeners,
  } = useWidgetDrag({
    initialPosition: { col: initialPosition.col, row: initialPosition.row },
    gridColumns: 4,
    onDrag: (newPosition) => {
      onPositionChange?.(newPosition)
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

  useEffect(() => {
    if (isDragging) {
      attachDragListeners()
      // Disable text selection while dragging
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      return () => {
        detachDragListeners()
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    }
  }, [isDragging, attachDragListeners, detachDragListeners])

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
          <div
            className={`h-full ${isEditing ? 'pointer-events-none' : ''}`}
            onMouseUp={(e) => {
              if (config.buttonType === 'push') {
                handleInteraction(() => setIsPushButtonPressed(false))
              }
            }}
            onTouchEnd={(e) => {
              if (config.buttonType === 'push') {
                handleInteraction(() => setIsPushButtonPressed(false))
              }
            }}
          >
            <ButtonWidget
              active={
                config.buttonType === 'push' ? isPushButtonPressed : buttonState
              }
              buttonType={config.buttonType || 'toggle'}
              onClick={() =>
                handleInteraction(() => setButtonState(!buttonState))
              }
              onMouseDown={(e) => {
                if (config.buttonType === 'push') {
                  handleInteraction(() => setIsPushButtonPressed(true))
                }
              }}
              onMouseUp={(e) => {
                if (config.buttonType === 'push') {
                  handleInteraction(() => setIsPushButtonPressed(false))
                }
              }}
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
            value={config.minValue || 0}
            min={config.minValue || 0}
            max={config.maxValue || 100}
          >
            <div className="text-3xl font-bold text-primary">
              {config.minValue || 0} {config.unit || ''}
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
        className={`relative transition-all duration-300 ease-out ${
          isDragging ? 'opacity-100 z-0' : 'opacity-100 z-0'
        }`}
        style={{
          gridColumn: `span ${size.cols}`,
          userSelect: isResizing ? 'none' : 'auto',
          transform: 'translate(0, 0)',
        }}
        data-widget-container="true"
      >
        {isDragging ? (
          <DragPlaceholder name={config.name} />
        ) : (
          <Card
            className={`p-3 relative ${borderStyle} ${
              isEditing ? 'cursor-pointer' : ''
            } transition-all duration-300 h-full flex flex-col`}
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
            <WidgetControls
              widgetId={widget.id}
              isDragging={isDragging}
              isSelected={isSelected}
              isEditing={isEditing}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (containerRef.current) {
                  handleDragStart(e, containerRef.current)
                }
              }}
              onResizeStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const direction = widget.id === 'chart' ? 'e' : 'se'
                if (containerRef.current) {
                  handleResizeStart(e, direction, containerRef.current)
                }
              }}
            />

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
          </Card>
        )}
      </div>

      {/* Global Resize Line Indicator */}
      <ResizeLineIndicator lineX={resizeLineX} isVisible={isResizing} />

      {/* Drag Overlay Ghost - Hanya muncul saat dragging */}
      {isDragging && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${dragOffset.x}px`,
            top: `${dragOffset.y}px`,
            width: containerRef.current?.offsetWidth,
            height: containerRef.current?.offsetHeight,
          }}
        >
          <Card
            className={`p-3 relative ${borderStyle} shadow-lg ring-2 ring-primary opacity-80 h-full flex flex-col`}
          >
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
              <div className="flex-1 pointer-events-none">{renderWidget()}</div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
