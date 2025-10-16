"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  PlayCircle,
  PauseCircle,
  Pencil,
  Trash2,
  Clock,
  Thermometer,
  Zap,
  Bell,
  LucideIcon,
  Cpu,
  BrainCircuit,
} from "lucide-react";

interface Automation {
  id: number;
  name: string;
  type: string;
  status: string;
  trigger: string;
  action: string;
  lastTriggered: string;
  icon: LucideIcon;
  description: string;
  createdDate: string;
  source: string;
  sourceDevice?: string;
  sourceModel?: string;
}

interface AutomationsListSectionProps {
  automations: Automation[];
}

export default function AutomationsListSection({
  automations
}: AutomationsListSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "paused":
        return "bg-muted text-muted-foreground border-muted";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Time-based":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Sensor-based":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Event-based":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Triggers</h2>
        <p className="text-sm text-muted-foreground">
          {automations.length} automation{automations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((automation) => {
          const Icon = automation.icon;
          return (
            <Card
              key={automation.id}
              className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {automation.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {automation.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status and Type Badges */}
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`capitalize ${getStatusColor(automation.status)}`}
                  >
                    {automation.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getTypeColor(automation.type)}
                  >
                    {automation.type}
                  </Badge>
                </div>

                {/* Source Information */}
                <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg">
                  {automation.source === "devices" ? (
                    <Cpu className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  ) : (
                    <BrainCircuit className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {automation.source === "devices" ? "Device" : "ML Model"}
                    </p>
                    <p className="text-sm font-medium truncate">
                      {automation.source === "devices" 
                        ? automation.sourceDevice 
                        : automation.sourceModel}
                    </p>
                  </div>
                </div>

                {/* Trigger and Action */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Trigger</p>
                      <p className="font-medium">{automation.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bell className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Action</p>
                      <p className="font-medium">{automation.action}</p>
                    </div>
                  </div>
                </div>

                {/* Last Triggered */}
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last triggered: <span className="font-medium">{automation.lastTriggered}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {automation.status === "active" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <PauseCircle className="w-4 h-4" />
                      Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Activate
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {automations.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <Zap className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">No automations found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or filter criteria, or create a new automation trigger.
            </p>
            <Button className="mt-4 gap-2">
              <PlayCircle className="w-4 h-4" />
              Create Your First Automation
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
