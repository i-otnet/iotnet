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
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 block">
          {label}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg bg-gray-200 appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, rgb(var(--primary)) 0%, rgb(var(--primary)) ${
            ((value - min) / (max - min)) * 100
          }%, rgb(229, 231, 235) ${
            ((value - min) / (max - min)) * 100
          }%, rgb(229, 231, 235) 100%)`,
        }}
      />
      {children}
    </div>
  )
}
