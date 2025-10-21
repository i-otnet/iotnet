'use client'

import { WidgetOption } from '@/lib/json/widgetOptionsData'
import AddWidgetModelCard from './addWidgetModelCard'

interface AddWidgetModelGridProps {
  widgets: WidgetOption[]
  selectedWidgetId?: string
  onSelectWidget: (widget: WidgetOption) => void
}

export default function AddWidgetModelGrid({
  widgets,
  selectedWidgetId,
  onSelectWidget,
}: AddWidgetModelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {widgets.map((widget) => (
        <AddWidgetModelCard
          key={widget.id}
          widget={widget}
          isSelected={selectedWidgetId === widget.id}
          onSelect={onSelectWidget}
        />
      ))}
    </div>
  )
}
