'use client'

import { useRef } from 'react'

interface DragDropGridProps {
  children?: React.ReactNode
  columns?: number
  rows?: number
  gap?: number
  cellHeight?: number
  showGrid?: boolean
  isEditing?: boolean
}

export default function DragDropGrid({
  children,
  columns = 4,
  gap = 16,
  showGrid = true,
  isEditing = false,
}: DragDropGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full">
      {/* Dot Grid Background Pattern (only visible in edit mode) */}
      {showGrid && isEditing && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
            opacity: 0.25,
          }}
        />
      )}

      {/* Grid Container */}
      <div
        ref={gridRef}
        className="relative w-full grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {/* Children (Widgets) */}
        {children}
      </div>
    </div>
  )
}
