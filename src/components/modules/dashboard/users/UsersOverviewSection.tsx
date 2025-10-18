'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Activity, Globe, Plus } from 'lucide-react'
import { BrokerSetupModal } from '@/components/modules/dashboard/users/addMqttUser/addUserModal'
import { mockUsersOverviewData } from '@/lib/json/usersData'

export default function UsersOverviewSection() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            MQTT User Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage MQTT users, their roles, and monitor their broker connections
          </p>
        </div>
        <Button
          size="default"
          className="gap-2 w-full sm:w-auto"
          onClick={() => setIsAddUserOpen(true)}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add User</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-primary/10">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {mockUsersOverviewData.data.totalUsers}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Total Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-green-500/10">
                <Activity className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {mockUsersOverviewData.data.activeUsers}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Active Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-full bg-muted">
                <Globe className="w-4 h-4 md:w-6 md:h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {mockUsersOverviewData.data.inactiveUsers}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Inactive Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add MQTT User Modal */}
      <BrokerSetupModal open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
    </div>
  )
}
