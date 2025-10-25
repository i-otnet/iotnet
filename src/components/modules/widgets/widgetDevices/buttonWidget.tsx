'use client'

import React, { MouseEvent } from 'react'

interface ButtonWidgetProps {
  active: boolean
  children?: React.ReactNode
  onClick?: () => void
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void
  onMouseUp?: (e: MouseEvent<HTMLButtonElement>) => void
  buttonType?: 'push' | 'toggle' // New prop for button type
}

export default function ButtonWidget({
  active,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  buttonType = 'toggle', // Default to toggle for backward compatibility
}: ButtonWidgetProps) {
  return (
    <button
      onClick={buttonType === 'toggle' ? onClick : undefined}
      onMouseDown={buttonType === 'push' ? onMouseDown : undefined}
      onMouseUp={buttonType === 'push' ? onMouseUp : undefined}
      onTouchStart={
        buttonType === 'push'
          ? (e) => onMouseDown?.(e as unknown as MouseEvent<HTMLButtonElement>)
          : undefined
      }
      onTouchEnd={
        buttonType === 'push'
          ? (e) => onMouseUp?.(e as unknown as MouseEvent<HTMLButtonElement>)
          : undefined
      }
      className={`w-full h-full rounded-lg font-medium transition-colors flex items-center justify-center text-lg ${
        active
          ? 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400'
      }`}
    >
      {children || (active ? 'ON' : 'OFF')}
    </button>
  )
}
