'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Maximize2 } from 'lucide-react'
import {
  useWidgetResize,
  type UseWidgetResizeProps,
  type WidgetSize,
} from '@/lib/hooks/useWidgetResize'

interface ResizableWidgetProps extends UseWidgetResizeProps {
  children: React.ReactNode
  className?: string
  isEditing?: boolean
  isSelected?: boolean
  onSizeChange?: (size: WidgetSize) => void
}

export default function ResizableWidget({
  children,
  className,
  isEditing = false,
  isSelected = false,
  initialSize = { cols: 1, rows: 1 },
  minSize = { cols: 1, rows: 1 },
  maxSize = { cols: 4, rows: 4 },
  gridColumns = 4,
  onSizeChange,
  onResizeStart,
  onResize,
  onResizeEnd,
}: ResizableWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    size,
    isResizing,
    handleResizeStart,
    attachResizeListeners,
    detachResizeListeners,
  } = useWidgetResize({
    initialSize,
    minSize,
    maxSize,
    gridColumns,
    onResizeStart,
    onResize: (newSize) => {
      onResize?.(newSize)
      onSizeChange?.(newSize)
    },
    onResizeEnd,
  })

  useEffect(() => {
    if (isResizing) {
      attachResizeListeners()
      // Disable text selection while resizing
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      return () => {
        detachResizeListeners()
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    }
  }, [isResizing, attachResizeListeners, detachResizeListeners])

  const showHandle = isEditing && isSelected

  return (
    <div
      ref={containerRef}
      className={cn('relative transition-all duration-200', className)}
      style={{
        gridColumn: `span ${size.cols}`,
        userSelect: isResizing ? 'none' : 'auto',
      }}
    >
      {/* Widget Content */}
      <div className="h-full w-full">{children}</div>

      {/* Resize Handle - Bottom Right Corner */}
      {showHandle && (
        <div
          className="absolute -bottom-2 -right-2 z-50 cursor-nwse-resize group select-none"
          onMouseDown={(e) =>
            containerRef.current &&
            handleResizeStart(e, 'se', containerRef.current)
          }
          onTouchStart={(e) =>
            containerRef.current &&
            handleResizeStart(e, 'se', containerRef.current)
          }
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-primary shadow-sm transition-all duration-200 group-hover:bg-primary/10 group-hover:shadow-md group-active:scale-110">
            <Maximize2 className="h-3 w-3 text-primary pointer-events-none" />
          </div>
        </div>
      )}

      {/* Resizing overlay */}
      {isResizing && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg pointer-events-none z-40 select-none" />
      )}
    </div>
  )
}
