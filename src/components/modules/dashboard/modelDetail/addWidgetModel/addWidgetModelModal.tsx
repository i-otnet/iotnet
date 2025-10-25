'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import WidgetModelSelectionView from './modelViews/widgetModelSelectionView'
import WidgetModelDetailView from './modelViews/widgetModelDetailView'
import {
  MODEL_WIDGET_OPTIONS,
  WidgetOption,
} from '@/lib/json/data/widget/widgetOptionsData'

interface AddWidgetModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWidgetSelect?: (widget: WidgetOption) => void
}

type ViewType = 'selection' | 'detail'

export default function AddWidgetModelModal({
  open,
  onOpenChange,
  onWidgetSelect,
}: AddWidgetModelModalProps) {
  const [currentView, setCurrentView] = useState<ViewType>('selection')
  const [selectedWidget, setSelectedWidget] = useState<WidgetOption | null>(
    MODEL_WIDGET_OPTIONS[0] || null
  )

  const handleSelectWidget = (widget: WidgetOption) => {
    setSelectedWidget(widget)
    setCurrentView('detail')
  }

  const handleBack = () => {
    setCurrentView('selection')
  }

  const handleAddWidget = () => {
    if (selectedWidget && onWidgetSelect) {
      onWidgetSelect(selectedWidget)
    }
    handleClose()
  }

  const handleClose = () => {
    setSelectedWidget(MODEL_WIDGET_OPTIONS[0] || null)
    setCurrentView('selection')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] flex flex-col p-0">
        {/* Header - Fixed */}
        <div className="shrink-0 border-b border-border bg-background px-6 py-4">
          <DialogTitle className="text-xl font-bold">
            {currentView === 'selection'
              ? 'Add New Widget'
              : `${selectedWidget?.title} Selected`}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {currentView === 'selection'
              ? 'Select widget type to add to your dashboard'
              : selectedWidget?.description}
          </DialogDescription>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-4">
          {currentView === 'selection' && (
            <WidgetModelSelectionView
              widgets={MODEL_WIDGET_OPTIONS}
              selectedWidgetId={selectedWidget?.id}
              onSelectWidget={handleSelectWidget}
            />
          )}
          {currentView === 'detail' && selectedWidget && (
            <WidgetModelDetailView widget={selectedWidget} />
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="shrink-0 flex gap-2 justify-end border-t border-border bg-background px-6 py-3">
          {currentView === 'detail' && (
            <Button variant="outline" onClick={handleBack} size="sm">
              Back
            </Button>
          )}
          {currentView === 'selection' && (
            <Button variant="outline" onClick={handleClose} size="sm">
              Cancel
            </Button>
          )}
          {currentView === 'selection' && (
            <Button
              onClick={() => handleSelectWidget(selectedWidget!)}
              disabled={!selectedWidget}
              size="sm"
            >
              Continue
            </Button>
          )}
          {currentView === 'detail' && (
            <Button onClick={handleAddWidget} size="sm">
              Add Widget
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
