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

      {/* Default children container jika ada konten tambahan */}
      {children}
    </div>
  )
}
