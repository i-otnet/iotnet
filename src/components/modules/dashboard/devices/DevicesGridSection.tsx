'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  WifiOff,
  AlertTriangle,
  Clock,
  MoreVertical,
  Settings,
  BarChart3,
  Plus,
  Search,
  Eye,
  Trash2,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { AddDeviceModal } from './addDevice/addDeviceModal'
import { EditDeviceModal } from './editDevice/editDeviceModal'
import { iconMap } from '@/lib/json/iconsData'

interface Device {
  id: number
  name: string
  type: string
  status: string
  location: string
  lastSeen: string
  icon: string
  firmwareVersion: string
  chipId: string
}

interface DevicesGridSectionProps {
  filteredDevices: Device[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSelectedFilter: (filter: string) => void
  onDeviceAdded?: (newDevice: Device) => void
  isAddDeviceModalOpen?: boolean
  setIsAddDeviceModalOpen?: (open: boolean) => void
  onInsightsClick?: (deviceId: number) => void
}

export default function DevicesGridSection({
  filteredDevices,
  searchQuery,
  setSearchQuery,
  setSelectedFilter,
  onDeviceAdded,
  isAddDeviceModalOpen = false,
  setIsAddDeviceModalOpen = () => {},
  onInsightsClick = () => {},
}: DevicesGridSectionProps) {
  const [editDeviceModalOpen, setEditDeviceModalOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [deletedDevices, setDeletedDevices] = useState<number[]>([])

  const handleEditDevice = (device: Device) => {
    setSelectedDevice(device)
    setEditDeviceModalOpen(true)
  }

  const handleDeleteDevice = (device: Device) => {
    setDeletedDevices([...deletedDevices, device.id])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'offline':
        return <WifiOff className="w-4 h-4 text-muted-foreground" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredDevices.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">No devices found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? `No devices match "${searchQuery}" in the selected category.`
              : 'No devices found in the selected category.'}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedFilter('all')
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          {filteredDevices.map((device) => {
            // Skip deleted devices
            if (deletedDevices.includes(device.id)) {
              return null
            }

            const IconComponent = iconMap[device.icon]
            return (
              <Card
                key={device.id}
                className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-primary" />
                        ) : (
                          <Settings className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {device.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {device.type}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditDevice(device)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteDevice(device)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(device.status)}
                        <span className="text-sm font-medium capitalize">
                          {device.status}
                        </span>
                      </div>
                      <Badge
                        variant={
                          device.status === 'online' ? 'default' : 'default'
                        }
                      >
                        {device.location}
                      </Badge>
                    </div>

                    {/* Device-specific information */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Firmware</span>
                        <span className="font-medium">
                          {device.firmwareVersion}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Chip ID</span>
                        <span className="font-medium text-xs font-mono">
                          {device.chipId}
                        </span>
                      </div>
                    </div>

                    {/* Last seen */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                      <Clock className="w-3 h-3" />
                      <span>Last seen {device.lastSeen}</span>
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEditDevice(device)}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Settings
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => onInsightsClick(device.id)}
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Insights
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Add New Device Card */}
          <Card
            className="group hover:shadow-lg transition-all duration-200 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/20 hover:bg-muted/30 cursor-pointer"
            onClick={() => setIsAddDeviceModalOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center min-h-[300px]">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Add New Device</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect a new IoT device to your network
              </p>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAddDeviceModalOpen(true)
                }}
                className="text-muted-foreground hover:text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Add Device Modal */}
      <AddDeviceModal
        open={isAddDeviceModalOpen}
        onOpenChange={setIsAddDeviceModalOpen}
        onDeviceAdded={(deviceData) => {
          onDeviceAdded?.({
            id: Math.random(),
            name: deviceData.name,
            type: deviceData.type,
            status: deviceData.status,
            location: deviceData.location,
            lastSeen: 'just now',
            icon: deviceData.icon || 'Smartphone',
            firmwareVersion: 'v1.0.0',
            chipId: deviceData.chipId,
          })
          setIsAddDeviceModalOpen(false)
        }}
      />

      {/* Edit Device Modal */}
      <EditDeviceModal
        open={editDeviceModalOpen}
        onOpenChange={setEditDeviceModalOpen}
        device={selectedDevice}
      />
    </div>
  )
}
