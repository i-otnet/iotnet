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
import WidgetDeviceSelectionView from './deviceViews/widgetDeviceSelectionView'
import WidgetConfigurationView, {
  type DeviceWidgetConfiguration,
  type WidgetConfigurationHandle,
} from './deviceViews/widgetConfigurationView'
import {
  DEVICE_WIDGET_OPTIONS,
  WidgetOption,
} from '@/lib/json/data/widget/widgetOptionsData'

interface AddWidgetDeviceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWidgetSelect?: (
    widget: WidgetOption,
    config: DeviceWidgetConfiguration
  ) => void
}

type ViewType = 'selection' | 'configuration'

export default function AddWidgetDeviceModal({
  open,
  onOpenChange,
  onWidgetSelect,
}: AddWidgetDeviceModalProps) {
  const [currentView, setCurrentView] = useState<ViewType>('selection')
  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(
    null
  )
  const [isValid, setIsValid] = useState(false)
  const configRef = useRef<WidgetConfigurationHandle | null>(null)

  const handleSelectWidget = (widget: WidgetOption) => {
    setSelectedWidget(widget)
    setCurrentView('configuration')
  }

  const handleConfigurationSave = (config: DeviceWidgetConfiguration) => {
    if (selectedWidget && onWidgetSelect) {
      onWidgetSelect(selectedWidget, config)
    }
    handleClose()
  }

  const handleBack = () => {
    if (currentView === 'configuration') {
      setCurrentView('selection')
    }
  }

  const handleSaveFromFooter = () => {
    if (configRef.current?.handleSave) {
      configRef.current.handleSave()
    }
  }

  const handleClose = () => {
    setSelectedWidget(null)
    setCurrentView('selection')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>
            {currentView === 'selection'
              ? 'Add New Widget'
              : `Configure ${selectedWidget?.title}`}
          </DialogTitle>
          <DialogDescription>
            {currentView === 'selection'
              ? 'Select widget type to add to your dashboard'
              : 'Set up your widget configuration'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {currentView === 'selection' && (
            <WidgetDeviceSelectionView
              widgets={DEVICE_WIDGET_OPTIONS}
              selectedWidgetId={selectedWidget?.id}
              onSelectWidget={handleSelectWidget}
            />
          )}
          {currentView === 'configuration' && selectedWidget && (
            <WidgetConfigurationView
              ref={configRef}
              widget={selectedWidget}
              onConfigurationSave={handleConfigurationSave}
              onValidationChange={setIsValid}
            />
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          {currentView === 'configuration' && (
            <>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSaveFromFooter} disabled={!isValid}>
                Add Widget
              </Button>
            </>
          )}
          {currentView === 'selection' && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
