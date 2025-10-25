'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import {
  AUTOMATION_BUILDER_DEVICES as DEVICES,
  AUTOMATION_BUILDER_MODELS as MODELS,
  AUTOMATION_BUILDER_OPERATORS as OPERATORS,
  AUTOMATION_BUILDER_EVENT_TYPES as EVENT_TYPES,
  AUTOMATION_BUILDER_TIMEZONES as TIMEZONES,
  VIRTUAL_PINS,
} from '@/lib/json/data/automation/automationsData'

interface Device {
  id: string
  name: string
  location: string
  type: string
  dataPoints: string[]
}

interface Model {
  id: string
  name: string
  outputs: string[]
}

interface AutomationBuilderTriggerSectionProps {
  triggerType: string
  triggerSource: 'device' | 'model'
  triggerSourceId: string
  triggerDatapoint: string
  triggerOperator: string
  triggerValue: string
  timeOfDay: string
  timezone: string
  eventType: string
  onTriggerSourceChange: (source: 'device' | 'model') => void
  onTriggerSourceIdChange: (id: string) => void
  onTriggerDatapointChange: (datapoint: string) => void
  onTriggerOperatorChange: (operator: string) => void
  onTriggerValueChange: (value: string) => void
  onTimeOfDayChange: (time: string) => void
  onTimezoneChange: (tz: string) => void
  onEventTypeChange: (event: string) => void
}

export default function AutomationBuilderTriggerSection({
  triggerType,
  triggerSource,
  triggerSourceId,
  triggerDatapoint,
  triggerOperator,
  triggerValue,
  timeOfDay,
  timezone,
  eventType,
  onTriggerSourceChange,
  onTriggerSourceIdChange,
  onTriggerDatapointChange,
  onTriggerOperatorChange,
  onTriggerValueChange,
  onTimeOfDayChange,
  onTimezoneChange,
  onEventTypeChange,
}: AutomationBuilderTriggerSectionProps) {
  return (
    <Card className="bg-blue-50 border-2 border-blue-300 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-blue-900">WHEN</h3>
        <Badge variant="outline" className="ml-auto">
          {triggerType}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Sensor-based Trigger */}
        {triggerType === 'Sensor-based' && (
          <>
            {/* Source Type Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Source Type</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>
                      {triggerSource === 'device' ? 'Device' : 'Model'}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  <DropdownMenuItem
                    onClick={() => onTriggerSourceChange('device')}
                  >
                    Device
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onTriggerSourceChange('model')}
                  >
                    Model
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Source Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">
                {triggerSource === 'device' ? 'Device' : 'Model'}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="truncate">
                      {triggerSource === 'device'
                        ? (DEVICES as Device[]).find(
                            (d: Device) => d.id === triggerSourceId
                          )?.name
                        : (MODELS as Model[]).find(
                            (m: Model) => m.id === triggerSourceId
                          )?.name}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  {triggerSource === 'device'
                    ? (DEVICES as Device[]).map((device: Device) => (
                        <DropdownMenuItem
                          key={device.id}
                          onClick={() => onTriggerSourceIdChange(device.id)}
                        >
                          {device.name} ({device.location})
                        </DropdownMenuItem>
                      ))
                    : (MODELS as Model[]).map((model: Model) => (
                        <DropdownMenuItem
                          key={model.id}
                          onClick={() => onTriggerSourceIdChange(model.id)}
                        >
                          {model.name}
                        </DropdownMenuItem>
                      ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* DataPoint Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Virtual Pin</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{triggerDatapoint || 'Select a virtual pin'}</span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  <div className="max-h-48 overflow-y-auto">
                    {VIRTUAL_PINS.map((pin: string) => (
                      <DropdownMenuItem
                        key={pin}
                        onClick={() => onTriggerDatapointChange(pin)}
                      >
                        {pin}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Operator Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Condition</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{triggerOperator}</span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  {OPERATORS.map((op: string) => (
                    <DropdownMenuItem
                      key={op}
                      onClick={() => onTriggerOperatorChange(op)}
                    >
                      {op}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Value Input */}
            {triggerOperator !== 'changes' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Value</label>
                <input
                  type="text"
                  placeholder="e.g., 25"
                  value={triggerValue}
                  onChange={(e) => onTriggerValueChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border rounded text-sm"
                />
              </div>
            )}
          </>
        )}

        {/* Time-based Trigger */}
        {triggerType === 'Time-based' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Time</label>
              <input
                type="time"
                value={timeOfDay}
                onChange={(e) => onTimeOfDayChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border rounded text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Timezone</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{timezone || 'UTC'}</span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  {TIMEZONES.map((tz: string) => (
                    <DropdownMenuItem
                      key={tz}
                      onClick={() => onTimezoneChange(tz)}
                    >
                      {tz}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}

        {/* Event-based Trigger */}
        {triggerType === 'Event-based' && (
          <>
            {/* Device Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Device</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="truncate">
                      {
                        (DEVICES as Device[]).find(
                          (d: Device) => d.id === triggerSourceId
                        )?.name
                      }
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  {(DEVICES as Device[]).map((device: Device) => (
                    <DropdownMenuItem
                      key={device.id}
                      onClick={() => onTriggerSourceIdChange(device.id)}
                    >
                      {device.name} ({device.location})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Event Type Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Event</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{eventType || 'Select event'}</span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  align="start"
                >
                  {EVENT_TYPES.map(
                    (event: { value: string; label: string }) => (
                      <DropdownMenuItem
                        key={event.value}
                        onClick={() => onEventTypeChange(event.value)}
                      >
                        {event.label}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
