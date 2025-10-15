"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Cpu, 
  BarChart3, 
  TrendingUp,
  Zap,
  Clock
} from "lucide-react";

const mockData = {
  totalDevices: 2847,
  totalUsers: 156,
  totalAnalytics: 847,
  totalAutomations: 234,
  monthlyGrowth: {
    devices: 12.3,
    users: 8.7,
    analytics: 25.4,
    automations: 15.2
  },
  recentStats: {
    devicesOnline: 2234,
    activeUsers: 89,
    runningAutomations: 187,
    dataPointsToday: "45.2K"
  }
};

export default function DashboardOverviewSection() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your IoTNet platform - manage devices, users, analytics, and automation
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
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
              <Cpu className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.totalDevices.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">+{mockData.monthlyGrowth.devices}%</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {mockData.recentStats.devicesOnline} online
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.totalUsers.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">+{mockData.monthlyGrowth.users}%</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {mockData.recentStats.activeUsers} active today
            </div>
          </CardContent>
        </Card>

        {/* Total Analytics */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Analytics Reports</CardTitle>
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.totalAnalytics.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">+{mockData.monthlyGrowth.analytics}%</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {mockData.recentStats.dataPointsToday} data points today
            </div>
          </CardContent>
        </Card>

        {/* Total Automations */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Automation Rules</CardTitle>
              <Zap className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.totalAutomations.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-primary">+{mockData.monthlyGrowth.automations}%</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {mockData.recentStats.runningAutomations} running now
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}