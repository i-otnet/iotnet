'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import AddModelByQuickSetup, {
  AddModelByQuickSetupRef,
} from './addModelByQuickSetup'

interface ModelData {
  name: string
  type: string
  framework: string
  version: string
  status: string
  icon?: React.ComponentType<{ className?: string }>
  accuracy?: string
}

interface AddModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onModelAdded?: (modelData: ModelData) => void
  onBack?: () => void
}

export function AddModelModal({
  open,
  onOpenChange,
  onModelAdded,
  onBack,
}: AddModelModalProps) {
  const quickSetupRef = useRef<AddModelByQuickSetupRef>(null)

  const handleFormSubmit = (data: ModelData) => {
    onModelAdded?.(data)
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleAddModelClick = () => {
    quickSetupRef.current?.submit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Model</DialogTitle>
          <DialogDescription>
            Connect a new ML model to your system
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <AddModelByQuickSetup
            ref={quickSetupRef}
            onSubmit={handleFormSubmit}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddModelClick}>Add Model</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
