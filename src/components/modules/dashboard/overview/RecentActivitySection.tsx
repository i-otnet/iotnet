"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const recentActivity = [
  { id: 1, action: "New device registered", details: "Temperature Sensor #47", time: "2 minutes ago", type: "device" },
  { id: 2, action: "Model deployed", details: "Temperature Prediction Model", time: "15 minutes ago", type: "model" },
  { id: 3, action: "User invited", details: "john.doe@company.com", time: "1 hour ago", type: "user" },
  { id: 4, action: "Automation triggered", details: "Temperature Alert Rule", time: "2 hours ago", type: "automation" },
  { id: 5, action: "Data backup completed", details: "Weekly System Backup", time: "3 hours ago", type: "system" },
];

export default function RecentActivitySection() {
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "device":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950";
      case "model":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950";
      case "user":
        return "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950";
      case "automation":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950";
      case "system":
        return "text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest platform events and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
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
  );
}