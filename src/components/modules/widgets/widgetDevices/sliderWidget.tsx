'use client'

import React from 'react'

interface SliderWidgetProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: string
  children?: React.ReactNode
}

export default function SliderWidget({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  children,
}: SliderWidgetProps) {
  return (
    <div className="flex flex-col h-full justify-between items-center px-2">
      <div />
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(parseFloat(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${
              ((value - min) / (max - min)) * 100
            }%, #d1d5db ${((value - min) / (max - min)) * 100}%, #d1d5db 100%)`,
          }}
        />
        {label && (
          <label className="text-lg font-medium text-gray-800 block text-center">
            {label}
          </label>
        )}
        {children}
      </div>
      <div />
    </div>
  )
}
