'use client'

import { Button } from '@/components/ui/button'
import FilterAutomationDefault from './filterAutomationDefault'
import {
  MODAL_BACKDROP_CLASSES,
  MODAL_OVERLAY_CLASSES,
  getModalContainerClasses,
  MODAL_HEADER_CLASSES,
  MODAL_FOOTER_CLASSES,
} from '@/lib/utils/modalUtils'

interface FilterAutomationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAutomationTypes: string[]
  setSelectedAutomationTypes: (types: string[]) => void
}

export function FilterAutomationModal({
  open,
  onOpenChange,
  selectedAutomationTypes,
  setSelectedAutomationTypes,
}: FilterAutomationModalProps) {
  if (!open) return null

  return (
    <div className={MODAL_BACKDROP_CLASSES}>
      <div
        className={MODAL_OVERLAY_CLASSES}
        onClick={() => onOpenChange(false)}
      />
      <div className={getModalContainerClasses('sm')}>
        <div className={MODAL_HEADER_CLASSES}>
          <h2 className="text-lg font-semibold">Filter Automations</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <FilterAutomationDefault
            selectedAutomationTypes={selectedAutomationTypes}
            setSelectedAutomationTypes={setSelectedAutomationTypes}
          />
        </div>

        <div className={MODAL_FOOTER_CLASSES}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSelectedAutomationTypes([])
              onOpenChange(false)
            }}
          >
            Clear
          </Button>
          <Button className="flex-1" onClick={() => onOpenChange(false)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}
