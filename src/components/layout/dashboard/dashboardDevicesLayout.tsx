'use client'

import React, { ReactNode } from 'react'

interface DashboardDevicesLayoutProps {
  children?: ReactNode
  devicesOverview?: ReactNode
  devicesGrid?: ReactNode
}

export default function DashboardDevicesLayout({
  children,
  devicesOverview,
  devicesGrid,
}: DashboardDevicesLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Devices Overview Section (Header + Stats + Search/Filter) */}
      {devicesOverview}

      {/* Devices Grid Section */}
      {devicesGrid}

      {/* Default children container jika ada konten tambahan */}
      {children}
    </div>
  )
}
