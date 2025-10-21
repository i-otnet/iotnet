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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import {
  Users,
  Search,
  Network,
  Zap,
  Globe,
  Mail,
  Edit3,
  Trash2,
  ChevronDown,
} from 'lucide-react'
import { EditUserModal } from './editMqttUser/editUserModal'
import { mockUsersData } from '@/lib/json/usersData'

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
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsersData.data.users)[0] | null
  >(null)

  const handleEditUser = (user: (typeof mockUsersData.data.users)[0]) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const filteredUsers = mockUsersData.data.users.filter((user) => {
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

          <div className="flex flex-wrap gap-2">
            {/* Role Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between min-w-[120px]"
                >
                  <span className="text-sm">
                    {filterRole === 'all'
                      ? 'All Roles'
                      : filterRole === 'admin'
                      ? 'Admin'
                      : 'User'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
                align="start"
              >
                <DropdownMenuItem onClick={() => setFilterRole('all')}>
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole('admin')}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole('user')}>
                  User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Broker Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between min-w-[130px]"
                >
                  <span className="text-sm">
                    {filterBroker === 'all'
                      ? 'All Brokers'
                      : filterBroker === 'iotnet'
                      ? 'IoTNet'
                      : 'External'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
                align="start"
              >
                <DropdownMenuItem onClick={() => setFilterBroker('all')}>
                  All Brokers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBroker('iotnet')}>
                  IoTNet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBroker('external')}>
                  External
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between min-w-[120px]"
                >
                  <span className="text-sm">
                    {filterStatus === 'all'
                      ? 'All Status'
                      : filterStatus === 'active'
                      ? 'Active'
                      : 'Inactive'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
                align="start"
              >
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                            onClick={() => handleEditUser(user)}
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

      <EditUserModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        user={selectedUser}
      />
    </Card>
  )
}
