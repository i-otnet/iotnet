'use client'

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { Button } from '@/components/ui/button'
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

export default function NotificationDropdown() {
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

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-accent"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-y-auto p-0"
      >
        {/* Header dengan Action Buttons */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Notifications
            </h3>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-accent rounded-md transition-colors border border-border hover:border-border/80"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all</span>
              </button>
              <button
                onClick={clearAll}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors border border-border hover:border-destructive/30"
                title="Clear all notifications"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <Bell className="w-6 h-6 text-muted-foreground/50 mb-2" />
            <p className="text-xs font-medium text-muted-foreground">
              No notifications
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 hover:bg-accent/30 transition-colors ${
                  notification.read ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3 justify-between">
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-medium ${
                        notification.read
                          ? 'line-through text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {notification.action}
                    </div>
                    <div className="text-xs text-muted-foreground break-words mt-0.5">
                      {notification.details}
                    </div>
                    <div className="text-xs text-muted-foreground/60 mt-1">
                      {notification.time}
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0 ml-2">
                    <button
                      onClick={() => toggleNotificationRead(notification.id)}
                      className="p-1.5 hover:bg-background rounded transition-colors"
                      title={
                        notification.read ? 'Mark as unread' : 'Mark as read'
                      }
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          notification.read
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
