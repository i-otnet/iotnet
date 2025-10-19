'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileUpload } from '@/components/modules/shared/fileUpload'
import { AlertCircle } from 'lucide-react'
import { iconsData, iconMap } from '@/lib/json/iconsData'

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

interface EditDeviceDefaultProps {
  device: Device
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

export default function EditDeviceDefault({ device }: EditDeviceDefaultProps) {
  const [name, setName] = useState(device.name)
  const [location, setLocation] = useState(device.location)
  const [chipId, setChipId] = useState(device.chipId)
  const [useOTA, setUseOTA] = useState(false)
  const [firmwareVersion, setFirmwareVersion] = useState(device.firmwareVersion)
  const [selectedIcon, setSelectedIcon] = useState<string>(device.icon)

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        {/* Icon Selector */}
        <div className="space-y-2">
          <Label>Device Icon</Label>
          <div className="grid grid-cols-8 gap-2">
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
                  title={option.name}
                >
                  <IconComponent className="w-5 h-5 text-primary" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="device-name">Device Name</Label>
            <Input
              id="device-name"
              placeholder="Device Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-type">Device Type</Label>
            <Input
              id="device-type"
              placeholder="Device Type"
              value={device.type}
              disabled
              className="bg-muted/50"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="device-location">Location</Label>
            <Input
              id="device-location"
              placeholder="Device Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chip-id">Chip ID</Label>
            <Input
              id="chip-id"
              placeholder="Chip ID"
              value={chipId}
              onChange={(e) => setChipId(e.target.value)}
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* Device Status Information */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-semibold mb-2">Device Information</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Status:</span>{' '}
              <span className="capitalize">{device.status}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Last Seen:</span>{' '}
              {device.lastSeen}
            </p>
            <p>
              <span className="font-medium text-foreground">
                Current Firmware:
              </span>{' '}
              {device.firmwareVersion}
            </p>
          </div>
        </div>

        {/* OTA Update Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="use-ota"
              checked={useOTA}
              onChange={(e) => setUseOTA(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <Label htmlFor="use-ota" className="text-sm font-medium">
              Enable OTA (Over-The-Air) Update
            </Label>
          </div>

          {useOTA && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">OTA Update</CardTitle>
                  <CardDescription className="text-xs">
                    Upload firmware file and specify version for device update
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Firmware Version Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="new-firmware-version"
                      className="text-sm font-medium"
                    >
                      New Firmware Version
                    </Label>
                    <Input
                      id="new-firmware-version"
                      placeholder="e.g., v2.0.1"
                      value={firmwareVersion}
                      onChange={(e) => setFirmwareVersion(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Current version: {device.firmwareVersion}
                    </p>
                  </div>

                  {/* OTA File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="ota-file" className="text-sm font-medium">
                      Firmware File (.bin)
                    </Label>
                    <FileUpload
                      maxFiles={1}
                      maxSize={10 * 1024 * 1024} // 10MB
                      acceptedFileTypes={['.bin', '.hex']}
                      onFilesChange={() => {}}
                      dropzoneText="Drag and drop your firmware file here"
                      buttonText="Choose Firmware File"
                      helperText="Upload your firmware file (.bin or .hex)"
                      variant="compact"
                      size="sm"
                    />
                  </div>

                  {/* OTA Info Box */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-md">
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Device must be online to receive OTA updates. The update
                        will begin immediately after upload.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
