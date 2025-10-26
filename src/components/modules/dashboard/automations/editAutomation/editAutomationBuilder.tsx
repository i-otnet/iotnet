'use client'

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
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
} from '@/lib/json'
import EditTriggerSection from './EditTriggerSection'
import EditActionSection from './EditActionSection'

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

interface EditAutomationBuilderProps {
  automation: Automation
  onSubmit: (automation: Automation) => void
  onCancel: () => void
}

export interface EditAutomationBuilderRef {
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

const EditAutomationBuilder = forwardRef<
  EditAutomationBuilderRef,
  EditAutomationBuilderProps
>(({ automation, onSubmit }, ref) => {
  const [triggerType, setTriggerType] = useState(automation.type)
  const [triggerSource, setTriggerSource] = useState<'device' | 'model'>(
    automation.source === 'devices' ? 'device' : 'model'
  )

  // Parse trigger source ID from sourceDevice/sourceModel
  const [triggerSourceId, setTriggerSourceId] = useState(() => {
    const sourceData =
      automation.source === 'devices'
        ? (DEVICES as Device[]).find(
            (d: Device) => d.name === automation.sourceDevice
          )
        : (MODELS as Model[]).find(
            (m: Model) => m.name === automation.sourceModel
          )
    return (
      sourceData?.id ||
      (automation.source === 'devices' ? DEVICES[0].id : MODELS[0].id)
    )
  })

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

  useEffect(() => {
    // Parse existing trigger if possible
    if (automation.trigger) {
      // Try to extract values from trigger text
      // This is a basic implementation
    }
  }, [automation])

  const handleSubmit = () => {
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
      if (!triggerDatapoint || !triggerValue) {
        alert('Please configure sensor trigger')
        return
      }
      triggerText = `When ${triggerSourceData.name} ${triggerDatapoint} ${triggerOperator} ${triggerValue}`
    } else if (triggerType === 'Time-based') {
      if (!timeOfDay) {
        alert('Please set time')
        return
      }
      triggerText = `Every day at ${timeOfDay} (${timezone})`
    } else if (triggerType === 'Event-based') {
      if (!eventType) {
        alert('Please select event')
        return
      }
      triggerText = `When ${eventType} on ${triggerSourceData.name}`
    }

    const actionText = `${actionType} on ${actionTarget.name} ${
      actionValue ? `to ${actionValue}` : ''
    }`

    const updatedAutomation: Automation = {
      ...automation,
      type: triggerType,
      trigger: triggerText,
      action: actionText,
      description: `${triggerText} → ${actionText}`,
      source: triggerSource === 'device' ? 'devices' : 'models',
      ...(triggerSource === 'device'
        ? { sourceDevice: triggerSourceData.name }
        : { sourceModel: triggerSourceData.name }),
    }

    onSubmit(updatedAutomation)
  }

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }))

  return (
    <div className="space-y-6">
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
      <EditTriggerSection
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
      <EditActionSection
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

EditAutomationBuilder.displayName = 'EditAutomationBuilder'

export default EditAutomationBuilder
