"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen,
  FileText,
  Smartphone,
  BarChart3
} from "lucide-react";

export default function GettingStartedSection() {
  return (
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
  );
}