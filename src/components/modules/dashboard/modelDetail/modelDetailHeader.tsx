'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil, Plus, Check } from 'lucide-react'
import AddWidgetModelModal from './addWidgetModel/addWidgetModelModal'

interface ModelDetailHeaderProps {
  modelName: string
  modelType: string
  isEditing?: boolean
  onEditingChange?: (isEditing: boolean) => void
}

export default function ModelDetailHeader({
  modelName,
  modelType,
  isEditing = false,
  onEditingChange,
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
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10 shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{modelName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{modelType}</p>
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
      <AddWidgetModelModal
        open={showAddWidgetModal}
        onOpenChange={setShowAddWidgetModal}
      />
    </div>
  )
}
