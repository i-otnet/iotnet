'use client'

import React from 'react'

interface PerformanceChartWidgetProps {
  children?: React.ReactNode
  predictions?: number[]
  actual?: number[]
}

export default function PerformanceChartWidget({
  children,
  predictions,
  actual,
}: PerformanceChartWidgetProps) {
  return (
    <div className="w-full h-[200px] flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span>Predictions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span>Actual</span>
        </div>
      </div>
      {children && <div className="flex-1 overflow-auto">{children}</div>}
    </div>
  )
}
