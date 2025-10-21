'use client'

import { WidgetOption } from '@/lib/json/widgetOptionsData'
import * as LucideIcons from 'lucide-react'

interface WidgetModelDetailViewProps {
  widget: WidgetOption
}

export default function WidgetModelDetailView({
  widget,
}: WidgetModelDetailViewProps) {
  const IconComponent =
    (LucideIcons[
      widget.icon as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>) || null

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {IconComponent && (
        <IconComponent className="h-16 w-16 text-cyan-600 dark:text-cyan-400 mb-4" />
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
