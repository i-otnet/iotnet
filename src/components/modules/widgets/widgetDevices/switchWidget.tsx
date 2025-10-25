'use client'

import React, { useState, useEffect } from 'react'

interface SwitchWidgetProps {
  enabled: boolean
  onChange?: (enabled: boolean) => void
  label?: string
  children?: React.ReactNode
}

export default function SwitchWidget({
  enabled,
  onChange,
  label,
  children,
}: SwitchWidgetProps) {
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

  const disabledBgColor = isDarkMode ? '#4b5563' : '#d1d5db'

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <button
        onClick={() => onChange?.(!enabled)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'dark:bg-gray-600 bg-gray-300'
        }`}
        style={
          !enabled && isDarkMode
            ? { backgroundColor: disabledBgColor }
            : undefined
        }
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>
      {children}
    </div>
  )
}
