'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap, Bell, Cpu, BrainCircuit, AlertCircle } from 'lucide-react'
import { iconMap } from '@/lib/json/data/shared/iconsData'
import { AUTOMATION_BUILDER_ICONS as ICONS } from '@/lib/json/data/automation/automationsData'

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

interface EditAutomationDefaultProps {
  automation: Automation
  onAutomationChange?: (automation: Automation) => void
}

export default function EditAutomationDefault({
  automation,
  onAutomationChange,
}: EditAutomationDefaultProps) {
  const [name, setName] = useState(automation.name)
  const [selectedIcon, setSelectedIcon] = useState(automation.icon)

  const handleNameChange = (value: string) => {
    setName(value)
    if (onAutomationChange) {
      onAutomationChange({ ...automation, name: value })
    }
  }

  const handleIconChange = (iconName: string) => {
    setSelectedIcon(iconName)
    if (onAutomationChange) {
      onAutomationChange({ ...automation, icon: iconName })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        {/* Icon Selector */}
        <div className="space-y-2">
          <Label>Automation Icon</Label>
          <div className="grid grid-cols-8 gap-2">
            {ICONS.map((iconName: string) => {
              const IconComponent = iconMap[iconName]
              return (
                <button
                  key={iconName}
                  onClick={() => handleIconChange(iconName)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    selectedIcon === iconName
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

        {/* Basic Information - Name & Description */}
        <div className="space-y-2">
          <Label htmlFor="name">Automation Name</Label>
          <Input
            id="name"
            placeholder="Automation Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNameChange(e.target.value)
            }
          />
        </div>

        {/* Automation Details - Read Only Info */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">Automation Type</Label>
            <Input
              id="type"
              placeholder="Automation Type"
              value={automation.type}
              disabled
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source Type</Label>
            <Input
              id="source"
              placeholder="Source Type"
              value={automation.source === 'devices' ? 'Device' : 'ML Model'}
              disabled
              className="bg-muted/50"
            />
          </div>
        </div>

        {/* Trigger & Action - Read Only */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="trigger" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Trigger
            </Label>
            <Input
              id="trigger"
              placeholder="e.g., Temperature > 30°C"
              value={automation.trigger}
              disabled
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Action
            </Label>
            <Input
              id="action"
              placeholder="e.g., Send notification"
              value={automation.action}
              disabled
              className="bg-muted/50"
            />
          </div>
        </div>

        {/* Source Device/Model - Read Only */}
        <div className="space-y-2">
          <Label htmlFor="sourceDevice" className="flex items-center gap-2">
            {automation.source === 'devices' ? (
              <>
                <Cpu className="w-4 h-4 text-blue-500" />
                Source Device
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4 text-purple-500" />
                Source Model
              </>
            )}
          </Label>
          <Input
            id="sourceDevice"
            placeholder={
              automation.source === 'devices' ? 'Device Name' : 'Model Name'
            }
            value={
              automation.source === 'devices'
                ? automation.sourceDevice || ''
                : automation.sourceModel || ''
            }
            disabled
            className="bg-muted/50"
          />
        </div>

        {/* Automation Information Card */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-semibold mb-3">Automation Information</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Status:</span>{' '}
              <span className="capitalize">{automation.status}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Created Date:</span>{' '}
              {automation.createdDate}
            </p>
            <p>
              <span className="font-medium text-foreground">
                Last Triggered:
              </span>{' '}
              {automation.lastTriggered}
            </p>
          </div>
        </div>

        {/* Edit Trigger/Action Info Box */}
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium flex items-start gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              To edit trigger, action, or device configuration, use the
              &quot;Edit Automation Flow&quot; option or scroll down in this
              form.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
