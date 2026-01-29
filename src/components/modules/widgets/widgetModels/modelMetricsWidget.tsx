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
    <div className="w-full grid grid-cols-2 gap-3">
      {metrics.map(
        (metric) =>
          metric.value !== undefined && (
            <div
              key={metric.label}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-semibold text-muted-foreground mb-1">
                {metric.label}
              </div>
              <div className="text-2xl font-bold text-primary">
                {(metric.value * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Score: {metric.value.toFixed(3)}
              </div>
            </div>
          )
      )}
    </div>
  )
}
