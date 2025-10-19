'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import AutomationBuilder, { AutomationBuilderRef } from './automationBuilder'

interface Automation {
  id: number
  name: string
  type: string
  status: string
  trigger: string
  action: string
  lastTriggered: string
  icon: string
  description: string
  createdDate: string
  source: string
  sourceDevice?: string
  sourceModel?: string
}

interface AddAutomationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAutomationAdded: (automation: Automation) => void
}

export function AddAutomationModal({
  open,
  onOpenChange,
  onAutomationAdded,
}: AddAutomationModalProps) {
  const builderRef = useRef<AutomationBuilderRef>(null)

  const handleFormSubmit = (data: Automation) => {
    onAutomationAdded(data)
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleCreateAutomation = () => {
    builderRef.current?.submit()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Create Automation Flow</DialogTitle>
          <DialogDescription>
            Build a workflow: Trigger → Action (like n8n, Blynk style)
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <AutomationBuilder
            ref={builderRef}
            onSubmit={handleFormSubmit}
            onCancel={handleClose}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateAutomation}>Create Automation</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
