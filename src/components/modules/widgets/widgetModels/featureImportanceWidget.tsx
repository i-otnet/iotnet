'use client'

import React from 'react'

interface Feature {
  name: string
  importance: number
}

interface FeatureImportanceWidgetProps {
  features?: Feature[]
  topN?: number
}

export default function FeatureImportanceWidget({
  features = [],
  topN = 5,
}: FeatureImportanceWidgetProps) {
  const topFeatures = features.slice(0, topN)
  const maxImportance = Math.max(...topFeatures.map((f) => f.importance), 1)

  return (
    <div className="w-full flex flex-col gap-3">
      {topFeatures.map((feature, index) => (
        <div key={`${feature.name}-${index}`} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">{feature.name}</span>
            <span className="text-gray-600 text-xs">
              {(feature.importance * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-500 h-full transition-all"
              style={{
                width: `${(feature.importance / maxImportance) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
