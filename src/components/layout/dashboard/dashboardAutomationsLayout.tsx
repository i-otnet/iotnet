'use client'

import React, { ReactNode } from 'react'

interface DashboardAutomationsLayoutProps {
  children?: ReactNode
  automationsOverview?: ReactNode
  automationsList?: ReactNode
}

export default function DashboardAutomationsLayout({
  children,
  automationsOverview,
  automationsList,
}: DashboardAutomationsLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Automations Overview Section (Header + Stats + Search/Filter) */}
      {automationsOverview}

      {/* Automations List Section */}
      {automationsList}

      {/* Default children container if there's additional content */}
      {children}
    </div>
  )
}
