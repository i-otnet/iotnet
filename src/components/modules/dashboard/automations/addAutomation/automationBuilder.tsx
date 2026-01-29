'use client'

import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import {
  AUTOMATION_BUILDER_DEVICES as DEVICES,
  AUTOMATION_BUILDER_MODELS as MODELS,
  AUTOMATION_BUILDER_TRIGGER_TYPES as TRIGGER_TYPES,
  AUTOMATION_BUILDER_ICONS as ICONS,
} from '@/lib/json'
import { iconMap } from '@/lib/json/data/shared/iconsData'
import TriggerSection from './TriggerSection'
import ActionSection from './ActionSection'

interface Automation {
  id: number
  name: string
  type: string
  status: string
  trigger: string
  action: string
  lastTriggered: string
  icon: string
  description: string
  createdDate: string
  source: string
  sourceDevice?: string
  sourceModel?: string
}

interface AutomationBuilderProps {
  onSubmit: (automation: Automation) => void
  onCancel: () => void
}

export interface AutomationBuilderRef {
  submit: () => void
}

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

const AutomationBuilder = forwardRef<
  AutomationBuilderRef,
  AutomationBuilderProps
>(({ onSubmit }, ref) => {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('Zap')
  const [triggerType, setTriggerType] = useState('Sensor-based')
  const [triggerSource, setTriggerSource] = useState<'device' | 'model'>(
    'device'
  )
  const [triggerSourceId, setTriggerSourceId] = useState(DEVICES[0].id)
  const [triggerDatapoint, setTriggerDatapoint] = useState('')
  const [triggerOperator, setTriggerOperator] = useState('>')
  const [triggerValue, setTriggerValue] = useState('')
  const [actionTargetId, setActionTargetId] = useState(DEVICES[0].id)
  const [actionType, setActionType] = useState('Turn On')
  const [actionValue, setActionValue] = useState('')

  // State for different trigger types
  const [timeOfDay, setTimeOfDay] = useState('08:00')
  const [timezone, setTimezone] = useState('UTC')
  const [eventType, setEventType] = useState('device-online')

  const handleSubmit = () => {
    if (!name || !actionType) {
      alert('Please fill all required fields')
      return
    }

    // Validasi field berdasarkan trigger type
    if (
      triggerType === 'Sensor-based' &&
      (!triggerDatapoint || !triggerValue)
    ) {
      alert('Please configure sensor trigger')
      return
    }
    if (triggerType === 'Time-based' && !timeOfDay) {
      alert('Please set time')
      return
    }
    if (triggerType === 'Event-based' && !eventType) {
      alert('Please select event')
      return
    }

    const triggerSourceData =
      triggerSource === 'device'
        ? (DEVICES as Device[]).find((d: Device) => d.id === triggerSourceId)
        : (MODELS as Model[]).find((m: Model) => m.id === triggerSourceId)

    const actionTarget = (DEVICES as Device[]).find(
      (d: Device) => d.id === actionTargetId
    )

    if (!triggerSourceData || !actionTarget) return

    // Generate trigger text based on trigger type
    let triggerText = ''
    if (triggerType === 'Sensor-based') {
      triggerText = `When ${triggerSourceData.name} ${triggerDatapoint} ${triggerOperator} ${triggerValue}`
    } else if (triggerType === 'Time-based') {
      triggerText = `Every day at ${timeOfDay} (${timezone})`
    } else if (triggerType === 'Event-based') {
      triggerText = `When ${eventType} on ${triggerSourceData.name}`
    }

    const actionText = `${actionType} on ${actionTarget.name} ${
      actionValue ? `to ${actionValue}` : ''
    }`

    const newAutomation: Automation = {
      id: Math.floor(Math.random() * 10000),
      name,
      type: triggerType,
      status: 'active',
      trigger: triggerText,
      action: actionText,
      lastTriggered: 'Never',
      icon: icon,
      description: `${triggerText} → ${actionText}`,
      createdDate: new Date().toISOString().split('T')[0],
      source: triggerSource,
      ...(triggerSource === 'device'
        ? { sourceDevice: triggerSourceData.name }
        : { sourceModel: triggerSourceData.name }),
    }

    onSubmit(newAutomation)
  }

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }))

  return (
    <div className="space-y-6">
      {/* Icon Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Automation Icon</label>
        <div className="grid grid-cols-8 gap-2">
          {ICONS.map((iconName: string) => {
            const IconComponent = iconMap[iconName]
            return (
              <button
                key={iconName}
                onClick={() => setIcon(iconName)}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  icon === iconName
                    ? 'border-primary bg-primary/10'
                    : 'border-muted-foreground/20 hover:border-primary/50'
                }`}
                type="button"
                title={iconName}
              >
                <IconComponent className="w-5 h-5 text-primary" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Automation Name</label>
        <input
          type="text"
          placeholder="e.g., Living Room Temperature Control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>

      {/* Trigger Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Trigger Type</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>{triggerType}</span>
              <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {TRIGGER_TYPES.map((type: string) => (
              <DropdownMenuItem key={type} onClick={() => setTriggerType(type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Trigger Section */}
      <TriggerSection
        triggerType={triggerType}
        triggerSource={triggerSource}
        triggerSourceId={triggerSourceId}
        triggerDatapoint={triggerDatapoint}
        triggerOperator={triggerOperator}
        triggerValue={triggerValue}
        timeOfDay={timeOfDay}
        timezone={timezone}
        eventType={eventType}
        onTriggerSourceChange={setTriggerSource}
        onTriggerSourceIdChange={setTriggerSourceId}
        onTriggerDatapointChange={setTriggerDatapoint}
        onTriggerOperatorChange={setTriggerOperator}
        onTriggerValueChange={setTriggerValue}
        onTimeOfDayChange={setTimeOfDay}
        onTimezoneChange={setTimezone}
        onEventTypeChange={setEventType}
      />

      {/* Action Section */}
      <ActionSection
        actionTargetId={actionTargetId}
        actionType={actionType}
        actionValue={actionValue}
        onActionTargetIdChange={setActionTargetId}
        onActionTypeChange={setActionType}
        onActionValueChange={setActionValue}
      />
    </div>
  )
})

AutomationBuilder.displayName = 'AutomationBuilder'

export default AutomationBuilder
