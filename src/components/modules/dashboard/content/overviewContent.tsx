"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Cpu, 
  BarChart3, 
  Settings,
  FileText,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Zap,
  Clock,
  Activity,
  Globe,
  Smartphone,
  Router,
  MonitorCheck,
  Server,
  HardDrive,
  LineChart
} from "lucide-react";

// Mock data for general overview
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
  },
  quickActions: [
    { 
      title: "Device Management", 
      description: "Add, configure, and monitor your IoT devices",
      icon: Cpu,
      path: "/dashboard/devices",
      count: "2,847 devices"
    },
    { 
      title: "Analytics Dashboard", 
      description: "View detailed monitoring and analytics",
      icon: BarChart3,
      path: "/dashboard/monitoring",
      count: "847 reports"
    },
    { 
      title: "User Management", 
      description: "Manage team members and permissions",
      icon: Users,
      path: "/dashboard/users",
      count: "156 users"
    },
    { 
      title: "Automation Rules", 
      description: "Create and manage automation workflows",
      icon: Zap,
      path: "/dashboard/automation",
      count: "234 rules"
    },
    { 
      title: "Documentation", 
      description: "API docs, guides, and tutorials",
      icon: BookOpen,
      path: "/dashboard/docs",
      count: "Latest updates"
    },
    { 
      title: "System Settings", 
      description: "Configure platform and account settings",
      icon: Settings,
      path: "/dashboard/settings",
      count: "Configure"
    }
  ],
  systemStatus: {
    platform: "operational",
    api: "operational",
    database: "operational",
    timeSeriesDB: "operational",
    mqttBroker: "operational"
  },
  recentActivity: [
    { id: 1, action: "New device registered", details: "Temperature Sensor #47", time: "2 minutes ago", type: "device" },
    { id: 2, action: "Analytics report generated", details: "Monthly Performance Report", time: "15 minutes ago", type: "analytics" },
    { id: 3, action: "User invited", details: "john.doe@company.com", time: "1 hour ago", type: "user" },
    { id: 4, action: "Automation triggered", details: "Temperature Alert Rule", time: "2 hours ago", type: "automation" },
  ]
};

export default function OverviewContent() {
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "device":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950";
      case "analytics":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950";
      case "user":
        return "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950";
      case "automation":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950";
    }
  };

  const getSystemStatusColor = (status: string) => {
    return status === "operational" 
      ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950"
      : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
          <p className="text-sm text-muted-foreground">Navigate to main platform features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {action.count}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MonitorCheck className="w-5 h-5 text-primary" />
              System Status
            </CardTitle>
            <CardDescription>Platform health and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">Platform</span>
                </div>
                <Badge className={getSystemStatusColor(mockData.systemStatus.platform)}>
                  {mockData.systemStatus.platform}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">API Services</span>
                </div>
                <Badge className={getSystemStatusColor(mockData.systemStatus.api)}>
                  {mockData.systemStatus.api}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <Router className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">MQTT Broker</span>
                </div>
                <Badge className={getSystemStatusColor(mockData.systemStatus.mqttBroker)}>
                  {mockData.systemStatus.mqttBroker}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">Database</span>
                </div>
                <Badge className={getSystemStatusColor(mockData.systemStatus.database)}>
                  {mockData.systemStatus.database}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">Time Series DB</span>
                </div>
                <Badge className={getSystemStatusColor(mockData.systemStatus.timeSeriesDB)}>
                  {mockData.systemStatus.timeSeriesDB}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getActivityTypeColor(activity.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{activity.action}</div>
                    <div className="text-muted-foreground text-sm">{activity.details}</div>
                    <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Getting Started
          </CardTitle>
          <CardDescription>Learn how to maximize your IoTNet platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Documentation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete guides and API documentation
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Device Setup</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Learn how to connect your first device
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Analytics Tutorial</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create your first analytics dashboard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}