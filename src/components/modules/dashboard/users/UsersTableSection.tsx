'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Users,
  Search,
  Network,
  ServerCog,
  Zap,
  Globe,
  Mail,
  Edit3,
  Trash2,
} from 'lucide-react'

// Mock user data with broker information
const mockUsersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Admin',
    brokerType: 'iotnet',
    brokerName: 'IoTNet Default',
    status: 'active',
    lastActive: '2 minutes ago',
    joinDate: '2024-01-15',
    deviceCount: 12,
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    role: 'User',
    brokerType: 'create',
    brokerName: 'TechCorp Private Broker',
    status: 'active',
    lastActive: '15 minutes ago',
    joinDate: '2024-02-20',
    deviceCount: 8,
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'm.chen@startup.io',
    role: 'User',
    brokerType: 'external',
    brokerName: 'AWS IoT Core',
    status: 'active',
    lastActive: '1 hour ago',
    joinDate: '2024-03-10',
    deviceCount: 24,
    avatar: 'MC',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@industrial.com',
    role: 'Admin',
    brokerType: 'iotnet',
    brokerName: 'IoTNet Default',
    status: 'inactive',
    lastActive: '2 days ago',
    joinDate: '2023-12-05',
    deviceCount: 45,
    avatar: 'ED',
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'r.wilson@manufacturing.com',
    role: 'User',
    brokerType: 'create',
    brokerName: 'Manufacturing Hub Broker',
    status: 'active',
    lastActive: '30 minutes ago',
    joinDate: '2024-01-28',
    deviceCount: 67,
    avatar: 'RW',
  },
  {
    id: 6,
    name: 'Lisa Rodriguez',
    email: 'lisa.r@smartcity.gov',
    role: 'User',
    brokerType: 'external',
    brokerName: 'Azure IoT Hub',
    status: 'active',
    lastActive: '5 minutes ago',
    joinDate: '2024-02-14',
    deviceCount: 156,
    avatar: 'LR',
  },
  {
    id: 7,
    name: 'David Kim',
    email: 'david.kim@research.edu',
    role: 'User',
    brokerType: 'iotnet',
    brokerName: 'IoTNet Default',
    status: 'active',
    lastActive: '45 minutes ago',
    joinDate: '2024-03-22',
    deviceCount: 3,
    avatar: 'DK',
  },
  {
    id: 8,
    name: 'Anna Thompson',
    email: 'anna.t@agritech.com',
    role: 'User',
    brokerType: 'create',
    brokerName: 'AgriTech Custom Broker',
    status: 'active',
    lastActive: '1 hour ago',
    joinDate: '2024-01-08',
    deviceCount: 89,
    avatar: 'AT',
  },
]

const getBrokerInfo = (type: string) => {
  switch (type) {
    case 'iotnet':
      return {
        icon: Zap,
        label: 'IoTNet',
        description: 'Using IoTNet default broker',
        color: 'bg-primary text-primary-foreground',
        badgeVariant: 'default' as const,
      }
    case 'create':
      return {
        icon: ServerCog,
        label: 'Private',
        description: 'Using private custom broker',
        color: 'bg-blue-500 text-white',
        badgeVariant: 'secondary' as const,
      }
    case 'external':
      return {
        icon: Network,
        label: 'External',
        description: 'Using external broker service',
        color: 'bg-green-500 text-white',
        badgeVariant: 'outline' as const,
      }
    default:
      return {
        icon: Globe,
        label: 'Unknown',
        description: 'Unknown broker type',
        color: 'bg-gray-500 text-white',
        badgeVariant: 'outline' as const,
      }
  }
}

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'user':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}

export default function UsersTableSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterBroker, setFilterBroker] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredUsers = mockUsersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole =
      filterRole === 'all' ||
      user.role.toLowerCase() === filterRole.toLowerCase()
    const matchesBroker =
      filterBroker === 'all' || user.brokerType === filterBroker
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus

    return matchesSearch && matchesRole && matchesBroker && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">MQTT Users Overview</CardTitle>
        <CardDescription>
          Monitor and manage all MQTT users with their broker configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <select
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              value={filterBroker}
              onChange={(e) => setFilterBroker(e.target.value)}
            >
              <option value="all">All Brokers</option>
              <option value="iotnet">IoTNet</option>
              <option value="create">Private</option>
              <option value="external">External</option>
            </select>

            <select
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Role
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Broker
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Devices
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Last Active
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const brokerInfo = getBrokerInfo(user.brokerType)
                  const BrokerIcon = brokerInfo.icon

                  return (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${brokerInfo.color}`}
                          >
                            <BrokerIcon className="w-3 h-3" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {brokerInfo.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.brokerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium">
                          {user.deviceCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          devices
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Badge
                            variant={
                              user.status === 'active' ? 'default' : 'outline'
                            }
                            className={`inline-flex items-center justify-center min-w-[70px] ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                            }`}
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{user.lastActive}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-medium">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
