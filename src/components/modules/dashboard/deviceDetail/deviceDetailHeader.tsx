'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil, Plus, Check } from 'lucide-react'
import AddWidgetDeviceModal from './addWidgetDevice/addWidgetDeviceModal'
import { WidgetOption } from '@/lib/json/widgetOptionsData'
import { DeviceWidgetConfiguration } from './addWidgetDevice/deviceViews/widgetConfigurationView'

interface DeviceDetailHeaderProps {
  deviceName: string
  deviceType: string
  onAddWidget?: (
    widget: WidgetOption,
    config: DeviceWidgetConfiguration
  ) => void
  isEditing?: boolean
  onEditingChange?: (isEditing: boolean) => void
}

export default function DeviceDetailHeader({
  deviceName,
  deviceType,
  onAddWidget,
  isEditing = false,
  onEditingChange,
}: DeviceDetailHeaderProps) {
  const router = useRouter()
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false)

  const handleEdit = () => {
    onEditingChange?.(true)
  }

  const handleDone = () => {
    onEditingChange?.(false)
  }

  const handleWidgetSelect = (
    widget: WidgetOption,
    config: DeviceWidgetConfiguration
  ) => {
    onAddWidget?.(widget, config)
    setShowAddWidgetModal(false)
  }

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10 flex-shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{deviceName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{deviceType}</p>
        </div>
      </div>
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <Button
              size="lg"
              variant="default"
              onClick={() => setShowAddWidgetModal(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Widget
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDone}
              className="border-2 border-primary text-primary hover:bg-primary/5"
            >
              <Check className="h-5 w-5 mr-2 text-primary" />
              Done
            </Button>
          </>
        ) : (
          <Button size="lg" onClick={handleEdit}>
            <Pencil className="h-5 w-5 mr-2" />
            Edit
          </Button>
        )}
      </div>
      <AddWidgetDeviceModal
        open={showAddWidgetModal}
        onOpenChange={setShowAddWidgetModal}
        onWidgetSelect={handleWidgetSelect}
      />
    </div>
  )
}
