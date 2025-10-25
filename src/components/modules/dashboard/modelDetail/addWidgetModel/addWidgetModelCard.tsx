'use client'

import * as LucideIcons from 'lucide-react'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'

interface WidgetModelCardProps {
  widget: WidgetOption
  isSelected?: boolean
  onSelect: (widget: WidgetOption) => void
}

export default function AddWidgetModelCard({
  widget,
  isSelected = false,
  onSelect,
}: WidgetModelCardProps) {
  // Get the icon component from lucide-react
  const IconComponent =
    (LucideIcons[
      widget.icon as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>) || null

  return (
    <button
      onClick={() => onSelect(widget)}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 shadow-sm'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/20'
      }`}
    >
      <div className="flex items-start gap-3">
        {IconComponent && (
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent
              className={`h-5 w-5 ${
                isSelected
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
            {widget.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-snug">
            {widget.description}
          </p>
        </div>
      </div>
    </button>
  )
}
