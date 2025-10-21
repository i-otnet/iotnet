'use client'

import React from 'react'

interface GaugeWidgetProps {
  title?: string
  children?: React.ReactNode
}

export default function GaugeWidget({ title, children }: GaugeWidgetProps) {
  return (
    <div className="text-center w-full h-full flex flex-col items-center justify-start pt-2">
      {title && (
        <div className="font-semibold text-sm text-gray-500 mb-1">{title}</div>
      )}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
