'use client'

import React from 'react'

interface ButtonWidgetProps {
  active: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export default function ButtonWidget({
  active,
  children,
  onClick,
}: ButtonWidgetProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full rounded-lg font-medium transition-colors flex items-center justify-center text-lg ${
        active
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
    >
      {children || (active ? 'ON' : 'OFF')}
    </button>
  )
}
