'use client'

import React, { ReactNode } from 'react'

interface DashboardUsersLayoutProps {
  children?: ReactNode
  // Props for the users layout
  usersOverview?: ReactNode
  usersTable?: ReactNode
  brokerDistribution?: ReactNode
}

export default function DashboardUsersLayout({
  children,
  usersOverview,
  usersTable,
  brokerDistribution,
}: DashboardUsersLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Users Overview Section (Header + Stats) */}
      {usersOverview}

      {/* Users Table Section */}
      {usersTable}

      {/* Broker Distribution Section */}
      {brokerDistribution}

      {/* Default children container if there's additional content */}
      {children}
    </div>
  )
}
