'use client'

import { WidgetOption } from '@/lib/json/widgetOptionsData'
import AddWidgetDeviceGrid from '../addWidgetDeviceGrid'

interface WidgetDeviceSelectionViewProps {
  widgets: WidgetOption[]
  selectedWidgetId?: string
  onSelectWidget: (widget: WidgetOption) => void
}

export default function WidgetDeviceSelectionView({
  widgets,
  selectedWidgetId,
  onSelectWidget,
}: WidgetDeviceSelectionViewProps) {
  return (
    <AddWidgetDeviceGrid
      widgets={widgets}
      selectedWidgetId={selectedWidgetId}
      onSelectWidget={onSelectWidget}
    />
  )
}
