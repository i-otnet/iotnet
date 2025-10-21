'use client'

import React from 'react'

interface GaugeWidgetProps {
  title?: string
  value?: number
  min?: number
  max?: number
  children?: React.ReactNode
}

export default function GaugeWidget({
  title,
  value = 0,
  min = 0,
  max = 100,
  children,
}: GaugeWidgetProps) {
  const percentage = Math.min(
    Math.max(((value - min) / (max - min)) * 100, 0),
    100
  )
  // 180 derajat = setengah lingkaran = Math.PI * radius
  const radius = 45
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-2">
      {title && (
        <div className="font-semibold text-sm text-gray-500 mb-1">{title}</div>
      )}
      <div className="flex flex-col items-center gap-1 w-full px-4">
        <div className="relative w-full max-w-[200px]">
          <svg
            className="w-full"
            viewBox="0 0 100 55"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background semicircle (empty state - gray) */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Progress semicircle */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.3s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            {children}
          </div>
        </div>

        {/* Min and Max Labels */}
        <div className="w-full max-w-[200px] flex items-center justify-between text-xs font-medium text-gray-500 px-3 mt-1">
          <span>{min}%</span>
          <span>{max}%</span>
        </div>
      </div>
    </div>
  )
}
