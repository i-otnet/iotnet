'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import QuickSetup, { QuickSetupRef } from './addDeviceByQuickSetup'

interface DeviceData {
  name: string
  type: string
  location: string
  chipId: string
  status: string
  icon?: string
  mqttUser?: string
}

interface AddDeviceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeviceAdded?: (deviceData: DeviceData) => void
  onBack?: () => void
}

export function AddDeviceModal({
  open,
  onOpenChange,
  onDeviceAdded,
  onBack,
}: AddDeviceModalProps) {
  const quickSetupRef = useRef<QuickSetupRef>(null)

  const handleFormSubmit = (data: DeviceData) => {
    onDeviceAdded?.(data)
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleAddDeviceClick = () => {
    quickSetupRef.current?.submit()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Get your device connected in minutes with our quick setup process.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <QuickSetup ref={quickSetupRef} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddDeviceClick}>Add Device</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
