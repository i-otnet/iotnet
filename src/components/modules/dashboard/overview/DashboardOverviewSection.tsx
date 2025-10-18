'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Cpu, BrainCircuit, TrendingUp, Zap, Clock } from 'lucide-react'

const mockData = {
  totalDevices: 2847,
  totalUsers: 156,
  totalModels: 847,
  totalAutomations: 234,
  monthlyGrowth: {
    devices: 12.3,
    users: 8.7,
    models: 25.4,
    automations: 15.2,
  },
  recentStats: {
    devicesOnline: 2234,
    activeUsers: 89,
    runningAutomations: 187,
    dataPointsToday: '45.2K',
  },
}

export default function DashboardOverviewSection() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your IoTNet platform - manage devices, users, models, and
            automation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last updated: 2 min ago
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Platform Online
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Devices */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockData.totalDevices.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Devices</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">
                +{mockData.monthlyGrowth.devices}%
              </span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockData.totalUsers.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">
                +{mockData.monthlyGrowth.users}%
              </span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Models */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockData.totalModels.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">ML Models</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">
                +{mockData.monthlyGrowth.models}%
              </span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Automations */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockData.totalAutomations.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Automation Rules
                </p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">
                +{mockData.monthlyGrowth.automations}%
              </span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
