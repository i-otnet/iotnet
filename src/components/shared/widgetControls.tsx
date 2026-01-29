'use client'

import { Trash2, Edit2, GripVertical, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWidgetTypeName } from '@/lib/utils/widgetUtils'

interface WidgetControlsProps {
  widgetId: string
  isDragging: boolean
  isSelected: boolean
  isEditing: boolean
  onEdit?: () => void
  onDelete?: () => void
  onDragStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void
  onResizeStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void
  showHandles?: boolean
  /** When false, hide only the resize handle (keep drag handle) */
  showResize?: boolean
}

export default function WidgetControls({
  widgetId,
  isDragging,
  isSelected,
  isEditing,
  onEdit,
  onDelete,
  onDragStart,
  onResizeStart,
  showHandles = true,
  showResize = true,
}: WidgetControlsProps) {
  return (
    <>
      {/* Widget Type Label */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-xs font-medium text-primary">
          {getWidgetTypeName(widgetId)}
        </span>
      </div>

      {/* Drag Handle Icon */}
      {showHandles && isEditing && isSelected && (
        <div
          className={`absolute top-2 left-1/2 -translate-x-1/2 z-50 cursor-move group ${
            isDragging ? 'animate-pulse' : ''
          }`}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        >
          <div
            className={`p-1 rounded-full transition-all duration-200 ${
              isDragging
                ? 'bg-primary/20 ring-2 ring-primary'
                : 'group-hover:bg-primary/10'
            }`}
          >
            <GripVertical
              className={`h-5 w-5 ${
                isDragging ? 'text-primary' : 'text-primary'
              } pointer-events-none`}
            />
          </div>
        </div>
      )}

      {/* Resize Handle Icon - Right Middle */}
      {showHandles && showResize && isEditing && isSelected && (
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-50 cursor-ew-resize group select-none"
          onMouseDown={onResizeStart}
          onTouchStart={onResizeStart}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-primary shadow-sm transition-all duration-200 group-hover:bg-primary/10 group-hover:shadow-md">
            <ArrowLeftRight className="h-3 w-3 text-primary pointer-events-none" />
          </div>
        </div>
      )}

      {/* Edit and Delete buttons */}
      {isEditing && isSelected && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white border-primary hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
            >
              <Edit2 className="h-4 w-4 text-primary" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </>
  )
}
