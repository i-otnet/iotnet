'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Cpu,
  Brain,
  Settings,
  BookOpen,
  ArrowRight,
  Zap,
} from 'lucide-react'

const quickActions = [
  {
    title: 'Device Management',
    description: 'Add, configure, and monitor your IoT devices',
    icon: Cpu,
    path: '/dashboard/devices',
    count: '2,847 devices',
  },
  {
    title: 'ML Models',
    description: 'View and manage machine learning models',
    icon: Brain,
    path: '/dashboard/models',
    count: '847 models',
  },
  {
    title: 'User Management',
    description: 'Manage team members and permissions',
    icon: Users,
    path: '/dashboard/users',
    count: '156 users',
  },
  {
    title: 'Automation Rules',
    description: 'Create and manage automation workflows',
    icon: Zap,
    path: '/dashboard/automation',
    count: '234 rules',
  },
  {
    title: 'Documentation',
    description: 'API docs, guides, and tutorials',
    icon: BookOpen,
    path: '/dashboard/docs',
    count: 'Latest updates',
  },
  {
    title: 'System Settings',
    description: 'Configure platform and account settings',
    icon: Settings,
    path: '/dashboard/settings',
    count: 'Configure',
  },
]

export default function QuickAccessSection() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          Quick Access
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Navigate to main platform features
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50 gap-0"
            >
              <CardHeader className="p-4 sm:p-6 pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {action.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {action.count}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 -mt-6 sm:-mt-8">
                <CardDescription className="text-xs sm:text-sm">
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
