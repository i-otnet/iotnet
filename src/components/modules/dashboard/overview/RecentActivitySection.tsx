'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { mockRecentActivityData } from '@/lib/json/dashboardData'

export default function RecentActivitySection() {
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'device':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
      case 'model':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950'
      case 'user':
        return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950'
      case 'automation':
        return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950'
      case 'system':
        return 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950'
      default:
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          Recent Activity
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Latest platform events and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {mockRecentActivityData.data.activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-2 sm:gap-3 p-3 sm:p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 ${getActivityTypeColor(
                  activity.type
                )}`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-xs sm:text-sm break-words">
                  {activity.action}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm break-words">
                  {activity.details}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
