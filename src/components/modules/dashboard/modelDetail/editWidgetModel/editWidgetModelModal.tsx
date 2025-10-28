'use client'

import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import EditWidgetConfigurationView, {
  type WidgetConfigurationHandle,
} from './modelViews/editWidgetConfigurationView'
import { ModelWidgetConfiguration } from '../addWidgetModel/modelViews/widgetConfigurationView'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'

interface EditWidgetModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  widget: WidgetOption
  config: ModelWidgetConfiguration
  onConfigurationSave?: (config: ModelWidgetConfiguration) => void
}

export default function EditWidgetModelModal({
  open,
  onOpenChange,
  widget,
  config,
  onConfigurationSave,
}: EditWidgetModelModalProps) {
  const [isValid, setIsValid] = useState(false)
  const configRef = useRef<WidgetConfigurationHandle | null>(null)

  const handleConfigurationSave = (updatedConfig: ModelWidgetConfiguration) => {
    if (onConfigurationSave) {
      onConfigurationSave(updatedConfig)
    }
    handleClose()
  }

  const handleSaveFromFooter = () => {
    if (configRef.current?.handleSave) {
      configRef.current.handleSave()
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>Edit {widget.title} Widget</DialogTitle>
          <DialogDescription>
            Update your widget configuration
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <EditWidgetConfigurationView
            ref={configRef}
            widget={widget}
            config={config}
            onConfigurationSave={handleConfigurationSave}
            onValidationChange={setIsValid}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveFromFooter} disabled={!isValid}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
