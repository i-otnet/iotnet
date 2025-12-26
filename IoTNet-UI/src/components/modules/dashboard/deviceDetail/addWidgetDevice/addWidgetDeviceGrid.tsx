'use client'

import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import AddWidgetDeviceCard from './addWidgetDeviceCard'

interface AddWidgetDeviceGridProps {
  widgets: WidgetOption[]
  selectedWidgetId?: string
  onSelectWidget: (widget: WidgetOption) => void
}

export default function AddWidgetDeviceGrid({
  widgets,
  selectedWidgetId,
  onSelectWidget,
}: AddWidgetDeviceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {widgets.map((widget) => (
        <AddWidgetDeviceCard
          key={widget.id}
          widget={widget}
          isSelected={selectedWidgetId === widget.id}
          onSelect={onSelectWidget}
        />
      ))}
    </div>
  )
}
