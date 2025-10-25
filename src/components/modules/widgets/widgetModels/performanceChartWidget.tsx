'use client'

import React from 'react'

export interface ChartDataItem {
  label: string
  accuracy: number
  precision: number
  recall: number
}

interface PerformanceChartWidgetProps {
  chartData?: ChartDataItem[]
  children?: React.ReactNode
}

export default function PerformanceChartWidget({
  chartData,
  children,
}: PerformanceChartWidgetProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1"></div>
          <span className="text-foreground font-medium">Accuracy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2"></div>
          <span className="text-foreground font-medium">Precision</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-3"></div>
          <span className="text-foreground font-medium">Recall</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 bg-card rounded-lg border border-border flex items-center justify-center p-4">
        {chartData && chartData.length > 0 ? (
          <div className="w-full">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Month</th>
                  <th className="px-2 py-1 text-left">Accuracy</th>
                  <th className="px-2 py-1 text-left">Precision</th>
                  <th className="px-2 py-1 text-left">Recall</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item) => (
                  <tr key={item.label}>
                    <td className="px-2 py-1 font-semibold">{item.label}</td>
                    <td className="px-2 py-1">{item.accuracy}</td>
                    <td className="px-2 py-1">{item.precision}</td>
                    <td className="px-2 py-1">{item.recall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          children || (
            <div className="text-center">
              <svg
                className="w-32 h-32 mx-auto mb-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-foreground text-sm font-medium">
                Performance Chart
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Model metrics over time
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
