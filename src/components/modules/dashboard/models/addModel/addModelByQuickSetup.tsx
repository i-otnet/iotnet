'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { iconsData, iconMap } from '@/lib/json/iconsData'

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
    icon?: React.ComponentType<{ className?: string }>
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
  const [modelIcon, setModelIcon] = useState<
    React.ComponentType<{ className?: string }> | undefined
  >()

  useImperativeHandle(ref, () => ({
    submit: () => {
      const data = {
        name: nameRef.current?.value || '',
        type: typeRef.current?.value || '',
        framework: frameworkRef.current?.value || '',
        version: 'v1.0.0',
        status: 'inactive',
        icon: modelIcon,
        accuracy: '0.0%',
      }
      onSubmit?.(data)
    },
  }))

  return (
    <div className="space-y-4">
      {/* Icon Selector - First */}
      <div className="space-y-2">
        <Label>Model Icon</Label>
        <div className="grid grid-cols-8 gap-2">
          {iconOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <button
                key={option.name}
                onClick={() => setModelIcon(IconComponent)}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  modelIcon === IconComponent
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
    </div>
  )
})

AddModelByQuickSetup.displayName = 'AddModelByQuickSetup'

export default AddModelByQuickSetup
