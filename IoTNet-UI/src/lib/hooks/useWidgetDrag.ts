'use client'

import { useCallback, useRef, useState } from 'react'

export interface WidgetPosition {
  col: number
  row: number
}

export interface UseWidgetDragProps {
  initialPosition?: WidgetPosition
  gridColumns?: number
  onDragStart?: (position: WidgetPosition) => void
  onDrag?: (position: WidgetPosition) => void
  onDragEnd?: (position: WidgetPosition) => void
}

const DRAG_CONFIG = {
  // Hold time before drag starts (ms)
  HOLD_TIME: 200,
  // Minimum movement to consider as drag (px)
  MIN_DRAG_DISTANCE: 10,
  // Smooth animation duration
  ANIMATION_DURATION: 300,
}

export function useWidgetDrag({
  initialPosition = { col: 1, row: 1 },
  gridColumns = 4,
  onDragStart,
  onDrag,
  onDragEnd,
}: UseWidgetDragProps = {}) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragSize, setDragSize] = useState({ width: 0, height: 0 })

  const dragRef = useRef<{
    startX: number
    startY: number
    currentX: number
    currentY: number
    holdTimer: NodeJS.Timeout | null
    isHeld: boolean
    startPosition: WidgetPosition
    containerStartX: number
    containerStartY: number
    containerWidth: number
    containerHeight: number
    lastOffsetX: number
    lastOffsetY: number
  } | null>(null)

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, containerElement: HTMLElement) => {
      e.preventDefault()
      e.stopPropagation()

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      // Save container start position
      const rect = containerElement.getBoundingClientRect()

      // Start holding timer
      const holdTimer = setTimeout(() => {
        if (dragRef.current) {
          dragRef.current.isHeld = true
          setIsDragging(true)
          // Set drag offset and size to the container's position when drag starts
          setDragOffset({
            x: dragRef.current.containerStartX,
            y: dragRef.current.containerStartY,
          })
          setDragSize({
            width: dragRef.current.containerWidth,
            height: dragRef.current.containerHeight,
          })
          onDragStart?.(initialPosition)
        }
      }, DRAG_CONFIG.HOLD_TIME)

      dragRef.current = {
        startX: clientX,
        startY: clientY,
        currentX: clientX,
        currentY: clientY,
        holdTimer,
        isHeld: false,
        startPosition: { ...initialPosition },
        containerStartX: rect.left,
        containerStartY: rect.top,
        containerWidth: rect.width,
        containerHeight: rect.height,
        lastOffsetX: 0,
        lastOffsetY: 0,
      }
    },
    [initialPosition, onDragStart]
  )

  const animationFrameRef = useRef<number | null>(null)

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      dragRef.current.currentX = clientX
      dragRef.current.currentY = clientY

      // If not yet held, check if movement exceeds MIN_DRAG_DISTANCE (cancel hold)
      if (!dragRef.current.isHeld) {
        const deltaX = Math.abs(clientX - dragRef.current.startX)
        const deltaY = Math.abs(clientY - dragRef.current.startY)

        // If movement is too large, cancel drag
        if (
          deltaX > DRAG_CONFIG.MIN_DRAG_DISTANCE ||
          deltaY > DRAG_CONFIG.MIN_DRAG_DISTANCE
        ) {
          if (dragRef.current.holdTimer) {
            clearTimeout(dragRef.current.holdTimer)
            dragRef.current.holdTimer = null
          }
          dragRef.current = null
          setDragOffset({ x: 0, y: 0 })
          return
        }
        // Not held yet, do nothing
        return
      }

      // Already held, now track movement
      const deltaX = clientX - dragRef.current.startX
      const deltaY = clientY - dragRef.current.startY

      // Calculate new offset
      const newOffsetX = dragRef.current.containerStartX + deltaX
      const newOffsetY = dragRef.current.containerStartY + deltaY

      // Only update state if the offset changed significantly (avoids excessive re-renders)
      if (
        dragRef.current.lastOffsetX !== newOffsetX ||
        dragRef.current.lastOffsetY !== newOffsetY
      ) {
        dragRef.current.lastOffsetX = newOffsetX
        dragRef.current.lastOffsetY = newOffsetY

        // Use requestAnimationFrame for smooth updates without blocking
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          setDragOffset({
            x: newOffsetX,
            y: newOffsetY,
          })
        })
      }

      // Calculate grid position based on pixel movement
      const gridContainer = document.querySelector(
        '[style*="gridTemplateColumns"]'
      ) as HTMLElement
      if (!gridContainer) return

      const gridRect = gridContainer.getBoundingClientRect()
      const baseWidth = gridRect.width / gridColumns
      const baseHeight = baseWidth * 0.75

      // Compute movement in grid cells
      const colMovement = Math.floor(deltaX / baseWidth)
      const rowMovement = Math.floor(deltaY / baseHeight)

      const newPosition: WidgetPosition = {
        col: Math.max(
          1,
          Math.min(gridColumns, dragRef.current.startPosition.col + colMovement)
        ),
        row: Math.max(1, dragRef.current.startPosition.row + rowMovement),
      }

      onDrag?.(newPosition)
    },
    [gridColumns, onDrag]
  )

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current) return

    // Cancel animation frame if still pending
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Cancel hold timer if still waiting
    if (dragRef.current.holdTimer) {
      clearTimeout(dragRef.current.holdTimer)
    }

    if (dragRef.current.isHeld) {
      setIsDragging(false)
      onDragEnd?.(dragRef.current.startPosition)
    }

    dragRef.current = null
    setDragOffset({ x: 0, y: 0 })
    setDragSize({ width: 0, height: 0 })
  }, [onDragEnd])

  const attachDragListeners = useCallback(() => {
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchmove', handleDragMove, { passive: false })
    document.addEventListener('touchend', handleDragEnd)
  }, [handleDragMove, handleDragEnd])

  const detachDragListeners = useCallback(() => {
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
    document.removeEventListener('touchmove', handleDragMove)
    document.removeEventListener('touchend', handleDragEnd)
  }, [handleDragMove, handleDragEnd])

  return {
    isDragging,
    dragOffset,
    dragSize,
    handleDragStart,
    attachDragListeners,
    detachDragListeners,
  }
}
