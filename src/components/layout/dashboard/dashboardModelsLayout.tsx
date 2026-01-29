'use client'

import React, { ReactNode } from 'react'

interface DashboardModelsLayoutProps {
  children?: ReactNode
  modelsOverview?: ReactNode
  modelsGrid?: ReactNode
}

export default function DashboardModelsLayout({
  children,
  modelsOverview,
  modelsGrid,
}: DashboardModelsLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Models Overview Section (Header + Stats + Search/Filter) */}
      {modelsOverview}

      {/* Models Grid Section */}
      {modelsGrid}

      {/* Default children container if there's additional content */}
      {children}
    </div>
  )
}
