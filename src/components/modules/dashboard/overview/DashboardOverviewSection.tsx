'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Cpu, BrainCircuit, TrendingUp, Zap, Clock } from 'lucide-react'
import { mockDashboardOverviewData } from '@/lib/json/dashboardData'

export default function DashboardOverviewSection() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Welcome to your IoTNet platform - manage devices, users, models, and
            automation
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            Last updated: 2 min ago
          </Badge>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Platform Online
          </div>
        </div>
      </div>

      {/* Main Metrics Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {/* Total Devices */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg sm:rounded-full bg-primary/10 flex-shrink-0">
                <Cpu className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-2xl font-bold truncate">
                  {mockDashboardOverviewData.data.totalDevices.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Devices
                </p>
              </div>
            </div>
            <div className="flex items-center mt-3 md:mt-4 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
              <span className="text-primary font-medium">
                +{mockDashboardOverviewData.data.monthlyGrowth.devices}%
              </span>
              <span className="text-muted-foreground ml-1 hidden sm:inline">
                this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg sm:rounded-full bg-primary/10 flex-shrink-0">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-2xl font-bold truncate">
                  {mockDashboardOverviewData.data.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Users
                </p>
              </div>
            </div>
            <div className="flex items-center mt-3 md:mt-4 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
              <span className="text-primary font-medium">
                +{mockDashboardOverviewData.data.monthlyGrowth.users}%
              </span>
              <span className="text-muted-foreground ml-1 hidden sm:inline">
                this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Models */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg sm:rounded-full bg-primary/10 flex-shrink-0">
                <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-2xl font-bold truncate">
                  {mockDashboardOverviewData.data.totalModels.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  ML Models
                </p>
              </div>
            </div>
            <div className="flex items-center mt-3 md:mt-4 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
              <span className="text-primary font-medium">
                +{mockDashboardOverviewData.data.monthlyGrowth.models}%
              </span>
              <span className="text-muted-foreground ml-1 hidden sm:inline">
                this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Automations */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg sm:rounded-full bg-primary/10 flex-shrink-0">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-2xl font-bold truncate">
                  {mockDashboardOverviewData.data.totalAutomations.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Automation Rules
                </p>
              </div>
            </div>
            <div className="flex items-center mt-3 md:mt-4 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
              <span className="text-primary font-medium">
                +{mockDashboardOverviewData.data.monthlyGrowth.automations}%
              </span>
              <span className="text-muted-foreground ml-1 hidden sm:inline">
                this month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
