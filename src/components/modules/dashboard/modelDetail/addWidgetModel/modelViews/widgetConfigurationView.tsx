'use client'

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import { getModelWidgetDefaultSize } from '@/lib/utils/widgetUtils'

interface WidgetConfigurationViewProps {
  widget: WidgetOption
  onConfigurationSave: (config: ModelWidgetConfiguration) => void
  onValidationChange?: (isValid: boolean) => void
}

export interface ModelWidgetConfiguration {
  widgetName: string
  description?: string
  size: number
}

export interface WidgetConfigurationHandle {
  handleSave: () => void
  isValid: boolean
}

const WidgetConfigurationView = forwardRef<
  WidgetConfigurationHandle,
  WidgetConfigurationViewProps
>(({ widget, onConfigurationSave, onValidationChange }, ref) => {
  const [widgetName, setWidgetName] = useState('')
  const [description, setDescription] = useState('')

  // Only show description input for the special "description" widget
  // Assumption: the widget that accepts a description has id === 'description'.
  // If the actual id differs, update the CONDITION below.
  const showDescription = widget.id === 'description'

  const isValid = widgetName.trim() !== ''

  useEffect(() => {
    onValidationChange?.(isValid)
  }, [isValid, onValidationChange])

  const handleSave = () => {
    if (!isValid) return

    const config: ModelWidgetConfiguration = {
      widgetName: widgetName.trim(),
      size: getModelWidgetDefaultSize(widget.id),
      ...(showDescription &&
        description.trim() && { description: description.trim() }),
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

      {/* Description (markdown allowed) - only for description widget */}
      {showDescription && (
        <div className="space-y-2">
          <Label htmlFor="widget-description" className="text-sm font-semibold">
            Description{' '}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <textarea
            id="widget-description"
            placeholder={`Describe this widget (supports markdown)`}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="min-h-[140px] w-full rounded-md border border-border px-3 py-2 bg-transparent resize-vertical"
          />
          <p className="text-xs text-muted-foreground">
            You can use Markdown formatting in the description.
          </p>
        </div>
      )}
    </div>
  )
})

WidgetConfigurationView.displayName = 'WidgetConfigurationView'

export default WidgetConfigurationView
