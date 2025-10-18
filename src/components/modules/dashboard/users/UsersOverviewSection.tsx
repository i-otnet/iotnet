'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Activity, Globe, Plus } from 'lucide-react'
import { BrokerSetupModal } from '@/components/modules/dashboard/users/addMqttUser/addUserModal'

const mockUsersData = {
  totalUsers: 156,
  activeUsers: 89,
  inactiveUsers: 67,
  onlineUsers: 34,
}

export default function UsersOverviewSection() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            MQTT User Management
          </h1>
          <p className="text-muted-foreground">
            Manage MQTT users, their roles, and monitor their broker connections
          </p>
        </div>
        <Button
          size="lg"
          className="gap-2"
          onClick={() => setIsAddUserOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUsersData.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockUsersData.activeUsers}
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <Globe className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockUsersData.inactiveUsers}
                </p>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
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
