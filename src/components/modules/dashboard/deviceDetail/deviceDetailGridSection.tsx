'use client'

import DragDropGrid from '@/components/shared/dragDropGrid'

interface DeviceDetailGridSectionProps {
  children?: React.ReactNode
  isEditing?: boolean
  columns?: number
  rows?: number
  showGrid?: boolean
}

export default function DeviceDetailGridSection({
  children,
  isEditing = false,
  columns = 4,
  rows = 6,
  showGrid = true,
}: DeviceDetailGridSectionProps) {
  return (
    <DragDropGrid
      columns={columns}
      rows={rows}
      gap={16}
      cellHeight={150}
      showGrid={showGrid}
      isEditing={isEditing}
    >
      {children}
    </DragDropGrid>
  )
}
