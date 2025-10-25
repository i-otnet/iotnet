'use client'

import React, { useState, useEffect } from 'react'

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
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setIsDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  // Colors for dark and light mode - unfilled track color
  const unfilledColor = isDarkMode ? '#4b5563' : '#d1d5db'

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
            }%, ${unfilledColor} ${
              ((value - min) / (max - min)) * 100
            }%, ${unfilledColor} 100%)`,
          }}
        />
        {label && (
          <label className="text-lg font-medium text-gray-800 dark:text-gray-200 block text-center">
            {label}
          </label>
        )}
        {children}
      </div>
      <div />
    </div>
  )
}
