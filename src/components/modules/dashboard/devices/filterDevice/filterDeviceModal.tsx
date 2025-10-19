'use client'

import { Button } from '@/components/ui/button'
import FilterDeviceDefault from './filterDeviceDefault'
import {
  MODAL_BACKDROP_CLASSES,
  MODAL_OVERLAY_CLASSES,
  getModalContainerClasses,
  MODAL_HEADER_CLASSES,
  MODAL_FOOTER_CLASSES,
} from '@/lib/utils/modalUtils'

interface FilterDeviceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDeviceTypes: string[]
  setSelectedDeviceTypes: (types: string[]) => void
}

export function FilterDeviceModal({
  open,
  onOpenChange,
  selectedDeviceTypes,
  setSelectedDeviceTypes,
}: FilterDeviceModalProps) {
  if (!open) return null

  return (
    <div className={MODAL_BACKDROP_CLASSES}>
      <div
        className={MODAL_OVERLAY_CLASSES}
        onClick={() => onOpenChange(false)}
      />
      <div className={getModalContainerClasses('sm')}>
        <div className={MODAL_HEADER_CLASSES}>
          <h2 className="text-lg font-semibold">Filter by Device Type</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <FilterDeviceDefault
            selectedDeviceTypes={selectedDeviceTypes}
            setSelectedDeviceTypes={setSelectedDeviceTypes}
          />
        </div>

        <div className={MODAL_FOOTER_CLASSES}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSelectedDeviceTypes([])
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
