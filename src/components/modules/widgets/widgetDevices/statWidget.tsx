'use client'

import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface StatWidgetProps {
  value?: React.ReactNode
  trend?: number
  trendIcon?: React.ReactNode
  color?: string
  trendColor?: string
}

export default function StatWidget({
  value,
  trend,
  trendIcon,
  color = 'primary',
  trendColor = 'primary',
}: StatWidgetProps) {
  const getTrendIcon = () => {
    if (trendIcon) return trendIcon
    if (trend === undefined) return null
    return trend >= 0 ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    )
  }

  return (
    <div className="flex flex-col">
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
      {trend !== undefined && (
        <div className="flex items-center mt-2">
          <span
            className={`text-${trendColor}-500 mr-2 flex items-center gap-1`}
          >
            {getTrendIcon()}
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </span>
        </div>
      )}
    </div>
  )
}
