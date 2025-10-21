'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import ButtonWidget from '@/components/modules/widgets/widgetDevices/buttonWidget'
import ChartWidget from '@/components/modules/widgets/widgetDevices/chartWidget'
import GaugeWidget from '@/components/modules/widgets/widgetDevices/gaugeWidget'
import SliderWidget from '@/components/modules/widgets/widgetDevices/sliderWidget'
import StatWidget from '@/components/modules/widgets/widgetDevices/statWidget'
import SwitchWidget from '@/components/modules/widgets/widgetDevices/switchWidget'
import { WidgetOption } from '@/lib/json/widgetOptionsData'
import { Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getWidgetBorderStyle,
  getWidgetTypeName,
  getWidgetColSpan,
} from '@/lib/utils/widgetUtils'

interface WidgetConfig {
  name: string
  virtualPin: string
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
}

export default function DeviceDetailWidget({
  widget,
  config,
  isEditing = false,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}: DeviceDetailWidgetProps) {
  const [buttonState, setButtonState] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [sliderValue, setSliderValue] = useState(config.minValue || 0)

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
  const renderWidget = () => {
    switch (widget.id) {
      case 'statistics':
        return <StatWidget value={`0 ${config.unit || ''}`} color="primary" />
      case 'chart':
        return (
          <ChartWidget>
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          </ChartWidget>
        )
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
          <div className={`h-full ${isEditing ? 'pointer-events-none' : ''}`}>
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
            title={config.unit}
            value={0}
            min={config.minValue || 0}
            max={config.maxValue || 100}
          >
            <div className="text-3xl font-bold text-primary">0</div>
          </GaugeWidget>
        )
      default:
        return <div>Unknown widget type</div>
    }
  }

  const borderStyle = getWidgetBorderStyle(isEditing, isSelected)
  const colSpan = getWidgetColSpan(widget.id)

  return (
    <Card
      className={`p-4 relative ${colSpan} ${borderStyle} ${
        isEditing ? 'cursor-pointer' : ''
      } transition-all h-full flex flex-col`}
      onClick={handleCardClick}
    >
      {/* Widget Type Label (visible in edit mode) */}
      {isEditing && (
        <div className="absolute top-2 left-2 z-10">
          <span className="text-xs font-medium text-primary">
            {getWidgetTypeName(widget.id)}
          </span>
        </div>
      )}

      {/* Edit and Delete buttons (visible when selected in edit mode) */}
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
      <div className={`flex flex-col h-full ${isEditing ? 'mt-6' : ''}`}>
        <div className="mb-3">
          <h3 className="text-sm font-medium text-foreground">{config.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pin: {config.virtualPin}
          </p>
        </div>
        <div className="flex-1 min-h-[100px]">{renderWidget()}</div>
      </div>
    </Card>
  )
}
