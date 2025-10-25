'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BookOpen, FileText, Smartphone, Brain } from 'lucide-react'

export default function GettingStartedSection() {
  return (
    <Card className="gap-2">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
          Getting Started
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Learn how to maximize your IoTNet platform
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="font-medium text-foreground text-sm sm:text-base">
                Documentation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Complete guides and API documentation
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="font-medium text-foreground text-sm sm:text-base">
                Device Setup
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Learn how to connect your first device
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="font-medium text-foreground text-sm sm:text-base">
                ML Models Tutorial
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Create your first machine learning model
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
