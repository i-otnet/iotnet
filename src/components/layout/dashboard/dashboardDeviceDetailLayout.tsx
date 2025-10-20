'use client'

import React, { ReactNode } from 'react'

interface DashboardDeviceDetailLayoutProps {
  children?: ReactNode
  header?: ReactNode
  connectionStatus?: ReactNode
  content?: ReactNode
}

export default function DashboardDeviceDetailLayout({
  children,
  header,
  connectionStatus,
  content,
}: DashboardDeviceDetailLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Header Section (Back Button, Device Name, Type, Edit Button) */}
      {header}

      {/* Connection Status */}
      {connectionStatus}

      {/* Main Content Container */}
      <div>{content}</div>
    </div>
  )
}
