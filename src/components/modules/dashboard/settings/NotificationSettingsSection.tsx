'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface NotificationSettings {
  emailNotifications: boolean
  deviceAlerts: boolean
  systemUpdates: boolean
  weeklyReports: boolean
  securityAlerts: boolean
}

export default function NotificationSettingsSection() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    deviceAlerts: true,
    systemUpdates: true,
    weeklyReports: false,
    securityAlerts: true,
  })

  const [savedSettings, setSavedSettings] = useState(settings)

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSavedSettings(settings)
    // TODO: Implement API call to save notification settings
    console.log('Saving notification settings:', settings)
  }

  const handleCancel = () => {
    setSettings(savedSettings)
  }

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Manage how you receive notifications and alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-base">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your account
              </p>
            </div>
            <input
              type="checkbox"
              id="email-notifications"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="device-alerts" className="text-base">
                Device Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified when devices go offline or encounter errors
              </p>
            </div>
            <input
              type="checkbox"
              id="device-alerts"
              checked={settings.deviceAlerts}
              onChange={() => handleToggle('deviceAlerts')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="system-updates" className="text-base">
                System Updates
              </Label>
              <p className="text-sm text-muted-foreground">
                Stay informed about system updates and new features
              </p>
            </div>
            <input
              type="checkbox"
              id="system-updates"
              checked={settings.systemUpdates}
              onChange={() => handleToggle('systemUpdates')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports" className="text-base">
                Weekly Reports
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly summary of your IoT network activity
              </p>
            </div>
            <input
              type="checkbox"
              id="weekly-reports"
              checked={settings.weeklyReports}
              onChange={() => handleToggle('weeklyReports')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts" className="text-base">
                Security Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Critical security notifications and warnings
              </p>
            </div>
            <input
              type="checkbox"
              id="security-alerts"
              checked={settings.securityAlerts}
              onChange={() => handleToggle('securityAlerts')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
            />
          </div>

          {hasChanges && (
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="w-full sm:w-auto">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
