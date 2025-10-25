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
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  const dragRef = useRef<{
    startX: number
    startY: number
    currentX: number
    currentY: number
    holdTimer: NodeJS.Timeout | null
    isHeld: boolean
    startPosition: WidgetPosition
  } | null>(null)

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, containerElement: HTMLElement) => {
      e.preventDefault()
      e.stopPropagation()

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      // Simpan posisi start container
      const rect = containerElement.getBoundingClientRect()
      setStartPosition({ x: rect.left, y: rect.top })

      // Start holding timer
      const holdTimer = setTimeout(() => {
        if (dragRef.current) {
          dragRef.current.isHeld = true
          setIsDragging(true)
          // Set drag offset ke posisi container saat drag mulai (avoid pojok kiri atas flash)
          setDragOffset({ x: startPosition.x, y: startPosition.y })
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
      }
    },
    [initialPosition, onDragStart]
  )

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      dragRef.current.currentX = clientX
      dragRef.current.currentY = clientY

      // Jika belum di-hold, check jika gerakan melebihi MIN_DRAG_DISTANCE (cancel hold)
      if (!dragRef.current.isHeld) {
        const deltaX = Math.abs(clientX - dragRef.current.startX)
        const deltaY = Math.abs(clientY - dragRef.current.startY)

        // Jika gerakan terlalu jauh, cancel drag
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
        // Belum di-hold, jadi jangan lakukan apa-apa
        return
      }

      // Sudah di-hold, sekarang track gerakan
      const deltaX = clientX - dragRef.current.startX
      const deltaY = clientY - dragRef.current.startY

      // Update visual offset saat drag - gunakan client position absolut
      setDragOffset({
        x: startPosition.x + deltaX,
        y: startPosition.y + deltaY,
      })

      // Calculate grid position berdasarkan pixel movement
      const gridContainer = document.querySelector(
        '[style*="gridTemplateColumns"]'
      ) as HTMLElement
      if (!gridContainer) return

      const gridRect = gridContainer.getBoundingClientRect()
      const baseWidth = gridRect.width / gridColumns
      const baseHeight = baseWidth * 0.75

      // Hitung pergerakan dalam grid cells
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

    // Cancel hold timer jika masih menunggu
    if (dragRef.current.holdTimer) {
      clearTimeout(dragRef.current.holdTimer)
    }

    if (dragRef.current.isHeld) {
      setIsDragging(false)
      onDragEnd?.(dragRef.current.startPosition)
    }

    dragRef.current = null
    setDragOffset({ x: 0, y: 0 })
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
    handleDragStart,
    attachDragListeners,
    detachDragListeners,
  }
}
