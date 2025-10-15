"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Cpu, 
  BarChart3, 
  Settings,
  BookOpen,
  ArrowRight,
  Zap
} from "lucide-react";

const quickActions = [
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
];

export default function QuickAccessSection() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
        <p className="text-sm text-muted-foreground">Navigate to main platform features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
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
    </>
  );
}