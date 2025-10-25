'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import {
  AUTOMATION_BUILDER_DEVICES as DEVICES,
  AUTOMATION_BUILDER_ACTION_TYPES as ACTION_TYPES,
  VIRTUAL_PINS,
} from '@/lib/json'

interface Device {
  id: string
  name: string
  location: string
  type: string
  dataPoints: string[]
}

interface EditAutomationBuilderActionSectionProps {
  actionTargetId: string
  actionType: string
  actionValue: string
  onActionTargetIdChange: (id: string) => void
  onActionTypeChange: (type: string) => void
  onActionValueChange: (value: string) => void
}

export default function EditActionSection({
  actionTargetId,
  actionType,
  actionValue,
  onActionTargetIdChange,
  onActionTypeChange,
  onActionValueChange,
}: EditAutomationBuilderActionSectionProps) {
  return (
    <Card className="bg-green-50 border-2 border-green-300 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-green-600" />
        <h3 className="font-bold text-green-900">THEN</h3>
        <Badge
          variant="outline"
          className="ml-auto"
          style={{ backgroundColor: '#dcfce7' }}
        >
          Action
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Target Device Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Target Device</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="truncate">
                  {
                    (DEVICES as Device[]).find(
                      (d: Device) => d.id === actionTargetId
                    )?.name
                  }
                </span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width)"
              align="start"
            >
              {(DEVICES as Device[]).map((device: Device) => (
                <DropdownMenuItem
                  key={device.id}
                  onClick={() => onActionTargetIdChange(device.id)}
                >
                  {device.name} ({device.location})
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Type Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Action Type</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>{actionType}</span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width)"
              align="start"
            >
              {(ACTION_TYPES as string[]).map((type: string) => {
                const isDisabled = [
                  'Send Notification',
                  'Start Recording',
                  'Lock',
                  'Unlock',
                ].includes(type)
                return (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => !isDisabled && onActionTypeChange(type)}
                    disabled={isDisabled}
                    className={
                      isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }
                  >
                    <span className="flex-1">{type}</span>
                    {isDisabled && (
                      <span className="text-xs text-muted-foreground ml-2">
                        Coming soon
                      </span>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Virtual Pin Selection (for Turn On, Turn Off, Set Value) */}
        {['Turn On', 'Turn Off', 'Set Value'].includes(actionType) && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Virtual Pin</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{actionValue || 'Select a virtual pin'}</span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width)"
                align="start"
              >
                <div className="max-h-48 overflow-y-auto">
                  {VIRTUAL_PINS.map((pin: string) => (
                    <DropdownMenuItem
                      key={pin}
                      onClick={() => onActionValueChange(pin)}
                    >
                      {pin}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </Card>
  )
}
