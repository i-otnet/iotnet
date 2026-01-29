'use client'

import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import * as LucideIcons from 'lucide-react'

interface WidgetDeviceDetailViewProps {
  widget: WidgetOption
}

export default function WidgetDeviceDetailView({
  widget,
}: WidgetDeviceDetailViewProps) {
  const IconComponent =
    (LucideIcons[
      widget.icon as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>) || null

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {IconComponent && (
        <IconComponent className="h-16 w-16 text-primary mb-4" />
      )}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {widget.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
        {widget.description}
      </p>
    </div>
  )
}
