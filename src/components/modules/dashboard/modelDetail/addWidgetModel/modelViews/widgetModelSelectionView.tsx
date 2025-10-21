'use client'

import { WidgetOption } from '@/lib/json/widgetOptionsData'
import AddWidgetModelGrid from '../addWidgetModelGrid'

interface WidgetModelSelectionViewProps {
  widgets: WidgetOption[]
  selectedWidgetId?: string
  onSelectWidget: (widget: WidgetOption) => void
}

export default function WidgetModelSelectionView({
  widgets,
  selectedWidgetId,
  onSelectWidget,
}: WidgetModelSelectionViewProps) {
  return (
    <AddWidgetModelGrid
      widgets={widgets}
      selectedWidgetId={selectedWidgetId}
      onSelectWidget={onSelectWidget}
    />
  )
}
