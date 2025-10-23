'use client'

import React from 'react'

interface StatWidgetProps {
  value?: React.ReactNode
  color?: string
}

export default function StatWidget({
  value,
  color = 'primary',
}: StatWidgetProps) {
  return (
    <div className="flex flex-col justify-between items-start h-full w-full">
      <div />
      <div className={`text-4xl font-bold text-${color}-600`}>{value}</div>
      <div />
    </div>
  )
}
