'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import EditDeviceDefault from './editDeviceDefault'

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

interface EditDeviceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  device: Device | null
}

export function EditDeviceModal({
  open,
  onOpenChange,
  device,
}: EditDeviceModalProps) {
  const [currentView] = useState<'default'>('default')

  if (!device) return null

  const renderContent = () => {
    switch (currentView) {
      case 'default':
        return <EditDeviceDefault device={device} />
      default:
        return null
    }
  }

  const getHeaderInfo = () => {
    return {
      title: `Edit Device - ${device.name}`,
      description: `Device Type: ${device.type} • Status: ${device.status}`,
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{headerInfo.title}</span>
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            {headerInfo.description}
          </DialogDescription>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {currentView === 'default' && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
