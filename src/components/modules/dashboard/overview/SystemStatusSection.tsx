"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe,
  Router,
  MonitorCheck,
  Server,
  HardDrive,
  LineChart
} from "lucide-react";

const systemStatus = {
  platform: "operational",
  api: "operational",
  database: "operational",
  timeSeriesDB: "operational",
  mqttBroker: "operational"
};

export default function SystemStatusSection() {
  const getSystemStatusColor = (status: string) => {
    return status === "operational" 
      ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950"
      : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950";
  };

  return (
    <Card className="h-full">
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
            <Badge className={getSystemStatusColor(systemStatus.platform)}>
              {systemStatus.platform}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
            <div className="flex items-center gap-3">
              <Server className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">API Services</span>
            </div>
            <Badge className={getSystemStatusColor(systemStatus.api)}>
              {systemStatus.api}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
            <div className="flex items-center gap-3">
              <Router className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">MQTT Broker</span>
            </div>
            <Badge className={getSystemStatusColor(systemStatus.mqttBroker)}>
              {systemStatus.mqttBroker}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Database</span>
            </div>
            <Badge className={getSystemStatusColor(systemStatus.database)}>
              {systemStatus.database}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
            <div className="flex items-center gap-3">
              <LineChart className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Time Series DB</span>
            </div>
            <Badge className={getSystemStatusColor(systemStatus.timeSeriesDB)}>
              {systemStatus.timeSeriesDB}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}