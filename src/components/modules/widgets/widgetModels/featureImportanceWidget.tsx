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
    <div className="w-full flex flex-col gap-4">
      {/* Title */}
      <div className="text-sm font-semibold text-foreground">
        Top {Math.min(topN, features.length)} Features
      </div>

      {/* Feature Bars */}
      <div className="flex flex-col gap-3">
        {topFeatures.map((feature, index) => {
          const percentage = (feature.importance / maxImportance) * 100
          return (
            <div
              key={`${feature.name}-${index}`}
              className="bg-muted rounded-lg p-2 border border-border flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {index + 1}. {feature.name}
                </span>
                <span className="text-sm font-bold text-primary">
                  {(feature.importance * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-card rounded-full h-3 overflow-hidden shadow-sm border border-border">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total Features Info */}
      <div className="text-xs text-muted-foreground pt-2 border-t border-border">
        Showing {Math.min(topN, features.length)} of {features.length} features
      </div>
    </div>
  )
}
