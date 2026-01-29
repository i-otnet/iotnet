'use client'

import { Button } from '@/components/ui/button'
import FilterModelDefault from './filterModelDefault'
import {
  MODAL_BACKDROP_CLASSES,
  MODAL_OVERLAY_CLASSES,
  getModalContainerClasses,
  MODAL_HEADER_CLASSES,
  MODAL_FOOTER_CLASSES,
} from '@/lib/utils/modalUtils'

interface FilterModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedModelTypes: string[]
  setSelectedModelTypes: (types: string[]) => void
}

export function FilterModelModal({
  open,
  onOpenChange,
  selectedModelTypes,
  setSelectedModelTypes,
}: FilterModelModalProps) {
  if (!open) return null

  return (
    <div className={MODAL_BACKDROP_CLASSES}>
      <div
        className={MODAL_OVERLAY_CLASSES}
        onClick={() => onOpenChange(false)}
      />
      <div className={getModalContainerClasses('sm')}>
        <div className={MODAL_HEADER_CLASSES}>
          <h2 className="text-lg font-semibold">Filter by Model Type</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <FilterModelDefault
            selectedModelTypes={selectedModelTypes}
            setSelectedModelTypes={setSelectedModelTypes}
          />
        </div>

        <div className={MODAL_FOOTER_CLASSES}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSelectedModelTypes([])
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
