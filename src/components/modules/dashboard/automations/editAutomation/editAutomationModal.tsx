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
import EditAutomationDefault from './editAutomationDefault'
import EditAutomationBuilder from './editAutomationBuilder'

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

interface EditAutomationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  automation: Automation | null
  onAutomationUpdated?: (automation: Automation) => void
}

export function EditAutomationModal({
  open,
  onOpenChange,
  automation,
  onAutomationUpdated,
}: EditAutomationModalProps) {
  const [currentView, setCurrentView] = useState<'default' | 'flow'>('default')
  const [editedAutomation, setEditedAutomation] = useState<Automation | null>(
    automation
  )
  const builderRef = useRef<{ submit: () => void } | null>(null)

  if (!automation) return null

  const handleAutomationChange = (updatedAutomation: Automation) => {
    setEditedAutomation(updatedAutomation)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'default':
        return (
          <EditAutomationDefault
            automation={editedAutomation || automation}
            onAutomationChange={handleAutomationChange}
          />
        )
      case 'flow':
        return (
          <EditAutomationBuilder
            ref={builderRef}
            automation={editedAutomation || automation}
            onSubmit={(updatedAutomation) => {
              setEditedAutomation(updatedAutomation)
              setCurrentView('default')
            }}
            onCancel={() => setCurrentView('default')}
          />
        )
      default:
        return null
    }
  }

  const handleSaveChanges = () => {
    if (editedAutomation && onAutomationUpdated) {
      onAutomationUpdated(editedAutomation)
    }
    onOpenChange(false)
  }

  const handleUpdateAutomation = () => {
    builderRef.current?.submit?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {currentView === 'default'
              ? `Edit Automation - ${automation.name}`
              : 'Edit Automation Flow'}
          </DialogTitle>
          <DialogDescription>
            {currentView === 'default'
              ? `Type: ${automation.type} • Status: ${automation.status}`
              : 'Modify your workflow: Trigger → Action'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>

        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {currentView === 'default' && (
            <>
              <Button variant="outline" onClick={() => setCurrentView('flow')}>
                Edit Automation Flow
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </>
          )}
          {currentView === 'flow' && (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentView('default')}
              >
                Back
              </Button>
              <Button onClick={handleUpdateAutomation}>
                Update Automation
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
