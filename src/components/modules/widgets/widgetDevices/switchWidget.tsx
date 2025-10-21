'use client'

import React from 'react'

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
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <button
        onClick={() => onChange?.(!enabled)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
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
