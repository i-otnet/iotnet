'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  Router,
  MonitorCheck,
  Server,
  HardDrive,
  LineChart,
} from 'lucide-react'

const systemStatus = {
  platform: 'operational',
  api: 'operational',
  database: 'operational',
  timeSeriesDB: 'operational',
  mqttBroker: 'operational',
}

export default function SystemStatusSection() {
  const getSystemStatusColor = (status: string) => {
    return status === 'operational'
      ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950'
      : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <MonitorCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          System Status
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Platform health and availability
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                Platform
              </span>
            </div>
            <Badge
              className={`${getSystemStatusColor(
                systemStatus.platform
              )} text-xs flex-shrink-0`}
            >
              {systemStatus.platform}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                API Services
              </span>
            </div>
            <Badge
              className={`${getSystemStatusColor(
                systemStatus.api
              )} text-xs flex-shrink-0`}
            >
              {systemStatus.api}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Router className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                MQTT Broker
              </span>
            </div>
            <Badge
              className={`${getSystemStatusColor(
                systemStatus.mqttBroker
              )} text-xs flex-shrink-0`}
            >
              {systemStatus.mqttBroker}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                Database
              </span>
            </div>
            <Badge
              className={`${getSystemStatusColor(
                systemStatus.database
              )} text-xs flex-shrink-0`}
            >
              {systemStatus.database}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <LineChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                Time Series DB
              </span>
            </div>
            <Badge
              className={`${getSystemStatusColor(
                systemStatus.timeSeriesDB
              )} text-xs flex-shrink-0`}
            >
              {systemStatus.timeSeriesDB}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
