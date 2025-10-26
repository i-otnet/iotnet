'use client'

import React, { ReactNode } from 'react'

interface DashboardSettingsLayoutProps {
  children?: ReactNode
  profileSettings?: ReactNode
  passwordSettings?: ReactNode
  brokerSettings?: ReactNode
  notificationSettings?: ReactNode
  apiKeys?: ReactNode
  dangerZone?: ReactNode
}

export default function DashboardSettingsLayout({
  children,
  profileSettings,
  passwordSettings,
  brokerSettings,
  notificationSettings,
  apiKeys,
  dangerZone,
}: DashboardSettingsLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Profile Settings Section */}
      {profileSettings}

      {/* Password Settings Section */}
      {passwordSettings}

      {/* MQTT Broker Settings Section */}
      {brokerSettings}

      {/* Notification Settings Section */}
      {notificationSettings}

      {/* API Keys Section */}
      {apiKeys}

      {/* Danger Zone Section */}
      {dangerZone}

      {/* Default children container if there's additional content */}
      {children}
    </div>
  )
}
