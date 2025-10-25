'use client'

import { useCallback, useRef, useState } from 'react'

export interface WidgetSize {
  cols: number
  rows: number
}

export interface ResizeHandle {
  direction: 'e' | 'w' | 's' | 'n' | 'se' | 'sw' | 'ne' | 'nw'
  cursor: string
}

export interface UseWidgetResizeProps {
  initialSize?: WidgetSize
  minSize?: WidgetSize
  maxSize?: WidgetSize
  gridColumns?: number
  onResizeStart?: (size: WidgetSize) => void
  onResize?: (size: WidgetSize) => void
  onResizeEnd?: (size: WidgetSize) => void
  onResizeMove?: (clientX: number) => void
}

export const RESIZE_HANDLES: ResizeHandle[] = [
  { direction: 'e', cursor: 'ew-resize' },
  { direction: 'w', cursor: 'ew-resize' },
  { direction: 's', cursor: 'ns-resize' },
  { direction: 'n', cursor: 'ns-resize' },
  { direction: 'se', cursor: 'nwse-resize' },
  { direction: 'sw', cursor: 'nesw-resize' },
  { direction: 'ne', cursor: 'nesw-resize' },
  { direction: 'nw', cursor: 'nwse-resize' },
]

// Configuration from complete algorithm documentation
const RESIZE_CONFIG = {
  throttleDelay: 50,
  smoothFactor: 0.2,
  animationDuration: '0.3s',
  initialResizeDelay: 50,
}

export function useWidgetResize({
  initialSize = { cols: 1, rows: 1 },
  minSize = { cols: 1, rows: 1 },
  maxSize = { cols: 4, rows: 4 },
  gridColumns = 4,
  onResizeStart,
  onResize,
  onResizeEnd,
  onResizeMove,
}: UseWidgetResizeProps = {}) {
  const [size, setSize] = useState<WidgetSize>(initialSize)
  const [dragLinePosition, setDragLinePosition] = useState(0)
  const [isResizing, setIsResizing] = useState(false)

  const resizeRef = useRef<{
    startX: number
    startY: number
    widgetLeftEdge: number
    startSize: WidgetSize
    direction: string
    gridContainerWidth: number
    containerHeight: number
    resizeDelta: number
    baseWidth: number
    throttleTimer: NodeJS.Timeout | null
    lastRan: number
  } | null>(null)

  // Phase 1: Initialization
  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      direction: string,
      containerElement: HTMLElement
    ) => {
      e.preventDefault()
      e.stopPropagation()

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const rect = containerElement.getBoundingClientRect()

      // Get the grid container
      const gridContainer = containerElement.closest(
        '[style*="gridTemplateColumns"]'
      ) as HTMLElement

      // Calculate grid container width: viewport - sidebar
      const sidebar = document.querySelector(
        '[class*="sidebar"]'
      ) as HTMLElement
      const sidebarWidth = sidebar?.offsetWidth || 0
      const viewportWidth = window.innerWidth
      const gridContainerWidth =
        gridContainer?.getBoundingClientRect().width ||
        viewportWidth - sidebarWidth

      // Get grid container position
      const gridContainerRect = gridContainer?.getBoundingClientRect()
      const gridContainerLeft = gridContainerRect?.left || 0

      // START FROM MOUSE POSITION (in grid coordinates)
      // This is consistent for both scale up and scale down
      const startXInGrid = clientX - gridContainerLeft

      // Calculate baseWidth from CURRENT size, not initial
      // This ensures accurate calculations during resize
      const baseWidth = gridContainerWidth / gridColumns

      resizeRef.current = {
        startX: startXInGrid, // Mouse position in grid coordinate
        startY: clientY,
        widgetLeftEdge: rect.left - gridContainerLeft,
        startSize: { ...size },
        direction,
        gridContainerWidth,
        containerHeight: rect.height,
        resizeDelta: 0,
        baseWidth: baseWidth,
        throttleTimer: null,
        lastRan: Date.now(),
      }

      setIsResizing(true)
      onResizeStart?.(size)

      document.body.style.cursor =
        RESIZE_HANDLES.find((h) => h.direction === direction)?.cursor ||
        'default'
    },
    [size, gridColumns, onResizeStart]
  )

  // Phase 2-5: Resize Loop with Throttle
  const handleResizeMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!resizeRef.current) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const { startX, startY, startSize, direction, baseWidth } =
        resizeRef.current

      // Throttle execution
      const now = Date.now()
      const timeSinceLastRun = now - resizeRef.current.lastRan

      const executeResize = () => {
        // Phase 2: Calculate raw delta
        // Get current grid coordinate of mouse
        const gridContainerRect = document
          .querySelector('[style*="gridTemplateColumns"]')
          ?.getBoundingClientRect()
        const gridContainerLeft = gridContainerRect?.left || 0
        const clientXInGrid = clientX - gridContainerLeft

        // rawDelta = how far mouse has moved from start position
        // Consistent for both scale up and scale down
        const rawDeltaX = clientXInGrid - startX
        const deltaY = clientY - startY

        // Phase 2b: Apply smooth factor uniformly
        // Same smooth factor for both directions for consistent feel
        resizeRef.current!.resizeDelta =
          resizeRef.current!.resizeDelta +
          (rawDeltaX - resizeRef.current!.resizeDelta) *
            RESIZE_CONFIG.smoothFactor

        const smoothedDeltaX = resizeRef.current!.resizeDelta

        // Phase 3: Calculate proposed width
        // proposedWidth = baseWidth × startCols + resizeDelta
        const proposedWidth = baseWidth * startSize.cols + smoothedDeltaX

        // Phase 4: Convert to column span (Core Formula)
        // calculatedSpan = max(minCols, min(maxCols, round(proposedWidth / baseWidth)))
        const calculatedSpan = Math.max(
          minSize.cols,
          Math.min(maxSize.cols, Math.round(proposedWidth / baseWidth))
        )

        // Line indicator shows proposed position
        // For east/west resize, show column-based position
        const linePositionRatio = proposedWidth / baseWidth

        setDragLinePosition(linePositionRatio)

        const newCols = calculatedSpan
        let newRows = startSize.rows

        // Handle vertical resize only for directions that include vertical component
        // 's' = south, 'n' = north, 'se'/'sw'/'ne'/'nw' = diagonal
        // For 'e'/'w' (horizontal only), newRows stays as startSize.rows
        if (direction.includes('s')) {
          const rowHeight = baseWidth * 0.75
          const rowIncrement = deltaY / rowHeight
          newRows = Math.round((startSize.rows + rowIncrement) * 2) / 2
          newRows = Math.max(1, Math.round(newRows))
        } else if (direction.includes('n')) {
          const rowHeight = baseWidth * 0.75
          const rowIncrement = -deltaY / rowHeight
          newRows = Math.round((startSize.rows + rowIncrement) * 2) / 2
          newRows = Math.max(1, Math.round(newRows))
        }

        newRows = Math.max(minSize.rows, Math.min(maxSize.rows, newRows))

        const newSize = { cols: newCols, rows: newRows }

        // Phase 5: Update only if span changed
        if (newSize.cols !== size.cols || newSize.rows !== size.rows) {
          setSize(newSize)
          onResize?.(newSize)
        }

        resizeRef.current!.lastRan = Date.now()
      }

      if (timeSinceLastRun >= RESIZE_CONFIG.throttleDelay) {
        executeResize()
      } else {
        // Queue for later
        if (resizeRef.current!.throttleTimer) {
          clearTimeout(resizeRef.current!.throttleTimer)
        }

        resizeRef.current!.throttleTimer = setTimeout(() => {
          executeResize()
        }, RESIZE_CONFIG.throttleDelay - timeSinceLastRun)
      }

      onResizeMove?.(clientX)
    },
    [size, minSize, maxSize, onResize, onResizeMove]
  )

  // Phase 6-7: Cleanup
  const handleResizeEnd = useCallback(() => {
    if (!resizeRef.current) return

    if (resizeRef.current.throttleTimer) {
      clearTimeout(resizeRef.current.throttleTimer)
    }

    resizeRef.current = null
    setIsResizing(false)
    document.body.style.cursor = 'default'
    onResizeEnd?.(size)
  }, [size, onResizeEnd])

  // Attach global event listeners
  const attachResizeListeners = useCallback(() => {
    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
    document.addEventListener('touchmove', handleResizeMove)
    document.addEventListener('touchend', handleResizeEnd)
  }, [handleResizeMove, handleResizeEnd])

  const detachResizeListeners = useCallback(() => {
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
    document.removeEventListener('touchmove', handleResizeMove)
    document.removeEventListener('touchend', handleResizeEnd)
  }, [handleResizeMove, handleResizeEnd])

  return {
    size,
    dragLinePosition,
    setSize,
    isResizing,
    handleResizeStart,
    attachResizeListeners,
    detachResizeListeners,
  }
}
