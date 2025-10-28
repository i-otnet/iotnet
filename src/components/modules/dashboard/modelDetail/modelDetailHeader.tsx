'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil, Plus, Check } from 'lucide-react'
import type { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import type { ModelWidgetConfiguration } from './addWidgetModel/modelViews/widgetConfigurationView'
import AddWidgetModelModal from './addWidgetModel/addWidgetModelModal'

interface ModelDetailHeaderProps {
  modelName: string
  modelType: string
  isEditing?: boolean
  onEditingChange?: (isEditing: boolean) => void
  onWidgetSelect?: (
    widget: WidgetOption,
    config: ModelWidgetConfiguration
  ) => void
}

export default function ModelDetailHeader({
  modelName,
  modelType,
  isEditing = false,
  onEditingChange,
  onWidgetSelect,
}: ModelDetailHeaderProps) {
  const router = useRouter()
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false)

  const handleEdit = () => {
    onEditingChange?.(true)
  }

  const handleDone = () => {
    onEditingChange?.(false)
  }

  return (
    // Mobile-first: keep title and controls side-by-side, truncate long names
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10 shrink-0"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold truncate">
            {modelName}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
            {modelType}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center shrink-0">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={() => setShowAddWidgetModal(true)}
              className="flex items-center whitespace-nowrap px-3 py-2"
              aria-label="Add Widget"
            >
              <Plus className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Add Widget</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDone}
              className="border-2 border-primary text-primary hover:bg-primary/5 flex items-center whitespace-nowrap px-3 py-2"
              aria-label="Done editing"
            >
              <Check className="h-5 w-5 text-primary" />
              <span className="ml-2 hidden sm:inline">Done</span>
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={handleEdit}
            className="flex items-center px-3 py-2"
            aria-label="Edit"
          >
            <Pencil className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Edit</span>
          </Button>
        )}
      </div>
      <AddWidgetModelModal
        open={showAddWidgetModal}
        onOpenChange={setShowAddWidgetModal}
        onWidgetSelect={onWidgetSelect}
      />
    </div>
  )
}
