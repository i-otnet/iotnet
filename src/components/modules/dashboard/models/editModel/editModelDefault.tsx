'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { iconsData, iconMap } from '@/lib/json/data/shared/iconsData'

interface Model {
  id: number
  name: string
  type: string
  status: string
  framework: string
  lastUpdated: string
  icon: string
  version: string
  accuracy?: string
}

interface EditModelDefaultProps {
  model: Model
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

export default function EditModelDefault({ model }: EditModelDefaultProps) {
  const [selectedIcon, setSelectedIcon] = useState<string>(model.icon)

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        <h3 className="font-semibold">Model Information</h3>

        {/* Icon Selector */}
        <div className="space-y-2">
          <Label>Model Icon</Label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {iconOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.name}
                  onClick={() => setSelectedIcon(option.name)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    selectedIcon === option.name
                      ? 'border-primary bg-primary/10'
                      : 'border-muted-foreground/20 hover:border-primary/50'
                  }`}
                  type="button"
                  aria-pressed={selectedIcon === option.name}
                  title={option.name}
                >
                  {IconComponent ? (
                    <IconComponent
                      className="w-5 h-5 text-primary"
                      aria-hidden
                    />
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              defaultValue={model.name}
              placeholder="Enter model name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              defaultValue={model.version}
              placeholder="e.g., v1.0.0"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="model-type">Type</Label>
            <Input
              id="model-type"
              defaultValue={model.type}
              disabled
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <Input
              id="framework"
              defaultValue={model.framework}
              disabled
              className="bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <h3 className="text-sm font-semibold mb-2">Model Information</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Status:</span>{' '}
            <span className="capitalize">{model.status}</span>
          </p>
          <p>
            <span className="font-medium text-foreground">Last Updated:</span>{' '}
            {model.lastUpdated}
          </p>
          {model.accuracy && (
            <p>
              <span className="font-medium text-foreground">Accuracy:</span>{' '}
              <span className="text-primary">{model.accuracy}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
