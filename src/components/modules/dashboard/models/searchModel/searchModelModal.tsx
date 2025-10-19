'use client'

import { Button } from '@/components/ui/button'
import SearchModelDefault from './searchModelDefault'
import {
  MODAL_BACKDROP_CLASSES,
  MODAL_OVERLAY_CLASSES,
  getModalContainerClasses,
  MODAL_HEADER_CLASSES,
  MODAL_FOOTER_CLASSES,
} from '@/lib/utils/modalUtils'

interface SearchModelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchModelModal({
  open,
  onOpenChange,
  searchQuery,
  setSearchQuery,
}: SearchModelModalProps) {
  if (!open) return null

  return (
    <div className={MODAL_BACKDROP_CLASSES}>
      <div
        className={MODAL_OVERLAY_CLASSES}
        onClick={() => onOpenChange(false)}
      />
      <div className={getModalContainerClasses('sm')}>
        <div className={MODAL_HEADER_CLASSES}>
          <h2 className="text-lg font-semibold">Search Models</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <SearchModelDefault
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className={MODAL_FOOTER_CLASSES}>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
