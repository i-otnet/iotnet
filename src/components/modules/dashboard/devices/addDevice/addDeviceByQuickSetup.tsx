'use client'

import { useState, forwardRef, useImperativeHandle } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { Info, ChevronDown } from 'lucide-react'
import { mockDeviceTypesData } from '@/lib/json/deviceTypesData'
import { iconsData, iconMap } from '@/lib/json/iconsData'
import { mockUsersData } from '@/lib/json/usersData'

interface QuickSetupProps {
  onDeviceAdded?: (deviceData: DeviceData) => void
  onSubmit?: (deviceData: DeviceData) => void
}

interface DeviceData {
  name: string
  type: string
  location: string
  chipId: string
  status: string
  icon?: string
  mqttUser?: string
}

export interface QuickSetupRef {
  submit: () => void
}

interface IconOption {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

// Map API icon names to actual components - filter device icons only
const iconOptions: IconOption[] = iconsData.data.icons
  .filter((icon) => icon.category === 'device')
  .map((icon) => ({
    name: icon.name,
    icon: iconMap[icon.name],
  }))

const deviceTypeOptions = mockDeviceTypesData.data.deviceTypes

const QuickSetup = forwardRef<QuickSetupRef, QuickSetupProps>(
  ({ onDeviceAdded, onSubmit }, ref) => {
    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setDeviceType] = useState('')
    const [deviceIcon, setDeviceIcon] = useState<string | undefined>()
    const [deviceLocation, setDeviceLocation] = useState('')
    const [deviceChipId, setDeviceChipId] = useState('')
    const [mqttUser, setMqttUser] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredDeviceTypes = deviceTypeOptions.filter((option) =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddDevice = () => {
      if (!deviceName || !deviceType || !mqttUser) return

      const newDevice: DeviceData = {
        name: deviceName,
        type: deviceType,
        location: deviceLocation || 'Unknown',
        chipId: deviceChipId || 'Unknown',
        status: 'online',
        icon: deviceIcon,
        mqttUser: mqttUser,
      }

      onDeviceAdded?.(newDevice)
      onSubmit?.(newDevice)
      setDeviceName('')
      setDeviceType('')
      setDeviceIcon(undefined)
      setDeviceLocation('')
      setDeviceChipId('')
      setMqttUser('')
    }

    useImperativeHandle(ref, () => ({
      submit: handleAddDevice,
    }))

    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
        <div className="space-y-4">
          {/* Icon Selector - First */}
          <div className="space-y-2">
            <Label>Device Icon</Label>
            <div className="grid grid-cols-8 gap-2">
              {iconOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={option.name}
                    onClick={() => setDeviceIcon(option.name)}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      deviceIcon === option.name
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/20 hover:border-primary/50'
                    }`}
                    type="button"
                    title={option.name}
                  >
                    <IconComponent className="w-5 h-5 text-primary" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Device Name */}
          <div className="space-y-2">
            <Label htmlFor="device-name">Device Name</Label>
            <Input
              id="device-name"
              placeholder="e.g., Living Room Sensor"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>

          {/* Device Type - Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="device-type" className="text-sm font-medium">
              Device Type
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="truncate">
                    {deviceType || 'Select a device type'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)] p-2"
                align="start"
              >
                {/* Search Input */}
                <div className="mb-2">
                  <Input
                    placeholder="Search device type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                {/* Scrollable List */}
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredDeviceTypes.length > 0 ? (
                    filteredDeviceTypes.map((option) => (
                      <DropdownMenuItem
                        key={option.name}
                        onClick={() => {
                          if (!option.disabled) {
                            setDeviceType(option.name)
                            setSearchQuery('')
                          }
                        }}
                        disabled={option.disabled}
                        className={`cursor-pointer ${
                          option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="flex-1">{option.name}</span>
                        {option.disabled && (
                          <span className="text-xs text-muted-foreground ml-2">
                            Coming soon
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No devices found
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="device-location">Location</Label>
            <Input
              id="device-location"
              placeholder="e.g., Living Room"
              value={deviceLocation}
              onChange={(e) => setDeviceLocation(e.target.value)}
            />
          </div>

          {/* Chip ID */}
          <div className="space-y-2">
            <Label htmlFor="device-chipid">Chip ID</Label>
            <Input
              id="device-chipid"
              placeholder="e.g., ATMega328P"
              value={deviceChipId}
              onChange={(e) => setDeviceChipId(e.target.value)}
            />
          </div>

          {/* MQTT User - Required Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="mqtt-user" className="text-sm font-medium">
              MQTT User <span className="text-destructive">*</span>
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-between ${
                    !mqttUser ? 'text-muted-foreground' : ''
                  }`}
                >
                  <span className="truncate">
                    {mqttUser || 'Select MQTT user (required)'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)] p-2"
                align="start"
              >
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {mockUsersData.data.users.length > 0 ? (
                    mockUsersData.data.users.map((user) => (
                      <DropdownMenuItem
                        key={user.id}
                        onClick={() => setMqttUser(user.name)}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No users available
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Fill in the device details. Your device will be added to the
              device list and ready to use.
            </p>
          </div>
        </div>
      </div>
    )
  }
)

QuickSetup.displayName = 'QuickSetup'

export default QuickSetup
