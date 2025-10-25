'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Bell, Trash2, CheckCircle2, Check, X } from 'lucide-react'
import { mockRecentActivityData } from '@/lib/json/data/dashboard/dashboardData'

interface Notification {
  id: number
  action: string
  details: string
  time: string
  type: 'device' | 'model' | 'user' | 'automation' | 'system'
  read?: boolean
}

export default function NotificationSection() {
  const [notifications, setNotifications] = useState<Notification[]>(
    mockRecentActivityData.data.activities.map((activity) => ({
      ...activity,
      read: false,
      type: activity.type as
        | 'device'
        | 'model'
        | 'user'
        | 'automation'
        | 'system',
    }))
  )

  const toggleNotificationRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    )
  }

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              Notifications
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              {notifications.length} notification
              {notifications.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>

          {notifications.length > 0 && (
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={markAllAsRead}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-accent rounded-md transition-colors border border-border hover:border-border/80"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark all</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors border border-border hover:border-destructive/30"
                title="Clear all notifications"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No notifications
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-2.5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border transition-all ${
                  notification.read
                    ? 'bg-muted/30 border-border/50 hover:border-border/70'
                    : 'bg-background border-primary/20 hover:border-primary/40 hover:shadow-sm'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-medium text-xs sm:text-sm leading-tight ${
                      notification.read
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {notification.action}
                  </div>
                  <div
                    className={`text-xs sm:text-sm mt-1.5 break-words ${
                      notification.read
                        ? 'text-muted-foreground'
                        : 'text-foreground/80'
                    }`}
                  >
                    {notification.details}
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-2">
                    {notification.time}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() => toggleNotificationRead(notification.id)}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    title={
                      notification.read ? 'Mark as unread' : 'Mark as read'
                    }
                  >
                    <CheckCircle2
                      className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                        notification.read
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-destructive/10 rounded-md transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
