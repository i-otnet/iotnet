'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { ChevronDown } from 'lucide-react'
import { iconsData, iconMap } from '@/lib/json/data/shared/iconsData'
import { mockUsersData } from '@/lib/json/data/user/usersData'

export interface AddModelByQuickSetupRef {
  submit: () => void
}

interface AddModelByQuickSetupProps {
  onSubmit?: (data: {
    name: string
    type: string
    framework: string
    version: string
    status: string
    icon?: string
    accuracy?: string
  }) => void
}

interface IconOption {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

// Map API icon names to actual components - filter model icons only
const iconOptions: IconOption[] = iconsData.data.icons
  .filter((icon) => icon.category === 'model')
  .map((icon) => ({
    name: icon.name,
    icon: iconMap[icon.name],
  }))

const AddModelByQuickSetup = forwardRef<
  AddModelByQuickSetupRef,
  AddModelByQuickSetupProps
>(({ onSubmit }, ref) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const typeRef = useRef<HTMLInputElement>(null)
  const frameworkRef = useRef<HTMLInputElement>(null)
  const [modelIcon, setModelIcon] = useState<string | undefined>()
  const [mqttUser, setMqttUser] = useState('')

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (!mqttUser) {
        alert('MQTT User is required')
        return
      }

      const data = {
        name: nameRef.current?.value || '',
        type: typeRef.current?.value || '',
        framework: frameworkRef.current?.value || '',
        version: 'v1.0.0',
        status: 'inactive',
        icon: modelIcon,
        accuracy: '0.0%',
        mqttUser: mqttUser,
      }
      onSubmit?.(data)
    },
  }))

  return (
    <div className="space-y-4">
      {/* Icon Selector - First */}
      <div className="space-y-2">
        <Label>Model Icon</Label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {iconOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <button
                key={option.name}
                onClick={() => setModelIcon(option.name)}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  modelIcon === option.name
                    ? 'border-primary bg-primary/10'
                    : 'border-muted-foreground/20 hover:border-primary/50'
                }`}
                type="button"
                aria-pressed={modelIcon === option.name}
                title={option.name}
              >
                {IconComponent ? (
                  <IconComponent className="w-5 h-5 text-primary" aria-hidden />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {option.name.charAt(0)}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="model-name">Model Name</Label>
        <Input
          ref={nameRef}
          id="model-name"
          placeholder="e.g., Image Classification Model"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="model-type">Model Type</Label>
        <Input
          ref={typeRef}
          id="model-type"
          placeholder="e.g., Classification, Regression"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="framework">Framework</Label>
        <Input
          ref={frameworkRef}
          id="framework"
          placeholder="e.g., TensorFlow, PyTorch"
          className="mt-2"
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
              <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) p-2"
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
    </div>
  )
})

AddModelByQuickSetup.displayName = 'AddModelByQuickSetup'

export default AddModelByQuickSetup
