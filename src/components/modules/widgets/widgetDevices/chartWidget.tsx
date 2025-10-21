'use client'

import React from 'react'

interface ChartWidgetProps {
  children?: React.ReactNode
}

export default function ChartWidget({ children }: ChartWidgetProps) {
  return <div className="w-full h-[200px]">{children}</div>
}
