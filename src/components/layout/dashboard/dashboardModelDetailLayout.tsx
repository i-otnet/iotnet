'use client'

import React, { ReactNode } from 'react'

interface DashboardModelDetailLayoutProps {
  header?: ReactNode
  connectionStatus?: ReactNode
  content?: ReactNode
}

export default function DashboardModelDetailLayout({
  header,
  connectionStatus,
  content,
}: DashboardModelDetailLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Header Section (Back Button, Model Name, Type, Edit Button) */}
      {header}

      {/* Connection Status */}
      {connectionStatus}

      {/* Main Content Container */}
      <div>{content}</div>
    </div>
  )
}
