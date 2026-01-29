'use client'

import { Button } from '@/components/ui/button'
import SearchDeviceDefault from './searchDeviceDefault'
import {
  MODAL_BACKDROP_CLASSES,
  MODAL_OVERLAY_CLASSES,
  getModalContainerClasses,
  MODAL_HEADER_CLASSES,
  MODAL_FOOTER_CLASSES,
} from '@/lib/utils/modalUtils'

interface SearchDeviceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchDeviceModal({
  open,
  onOpenChange,
  searchQuery,
  setSearchQuery,
}: SearchDeviceModalProps) {
  if (!open) return null

  return (
    <div className={MODAL_BACKDROP_CLASSES}>
      <div
        className={MODAL_OVERLAY_CLASSES}
        onClick={() => onOpenChange(false)}
      />
      <div className={getModalContainerClasses('sm')}>
        <div className={MODAL_HEADER_CLASSES}>
          <h2 className="text-lg font-semibold">Search Devices</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <SearchDeviceDefault
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className={MODAL_FOOTER_CLASSES}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSearchQuery('')
              onOpenChange(false)
            }}
          >
            Clear
          </Button>
          <Button className="flex-1" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
