'use client'

import React from 'react'

interface ModelMetricsWidgetProps {
  accuracy?: number
  precision?: number
  recall?: number
  f1Score?: number
}

export default function ModelMetricsWidget({
  accuracy,
  precision,
  recall,
  f1Score,
}: ModelMetricsWidgetProps) {
  const metrics = [
    { label: 'Accuracy', value: accuracy },
    { label: 'Precision', value: precision },
    { label: 'Recall', value: recall },
    { label: 'F1 Score', value: f1Score },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map(
        (metric) =>
          metric.value !== undefined && (
            <div key={metric.label} className="flex flex-col">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className="text-xl font-bold text-primary-600">
                {(metric.value * 100).toFixed(2)}%
              </span>
            </div>
          )
      )}
    </div>
  )
}
