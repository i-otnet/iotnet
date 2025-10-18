'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import EditModelDefault from './editModelDefault'

interface Model {
  id: number
  name: string
  type: string
  status: string
  framework: string
  lastUpdated: string
  icon: React.ComponentType<{ className?: string }>
  version: string
  accuracy?: string
}

interface EditModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  model: Model | null
}

export function EditModelModal({
  open,
  onOpenChange,
  model,
}: EditModelModalProps) {
  const [currentView, setCurrentView] = useState<'default'>('default')

  if (!model) return null

  const handleBackToOptions = () => {
    setCurrentView('default')
  }

  const renderContent = () => {
    switch (currentView) {
      case 'default':
        return <EditModelDefault model={model} />
      default:
        return null
    }
  }

  const getHeaderInfo = () => {
    return {
      title: `Edit Model - ${model.name}`,
      description: `Type: ${model.type} • Framework: ${model.framework} • Status: ${model.status}`,
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{headerInfo.title}</span>
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            {headerInfo.description}
          </DialogDescription>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {currentView === 'default' && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
