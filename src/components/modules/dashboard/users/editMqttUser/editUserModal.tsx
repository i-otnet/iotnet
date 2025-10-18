'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  getBrokerIcon,
  getBrokerLabel,
  getBrokerBadgeVariant,
} from '@/lib/utils/brokerUtils'
import EditUserIotnetBroker from './editUserByIotnetBroker'
import EditUserPersonalBroker from './editUserByPersonalBroker'
import EditUserExternalBroker from './editUserByExternalBroker'

interface User {
  id: number
  name: string
  email: string
  role: string
  brokerType: 'iotnet' | 'personal' | 'external'
  brokerName: string
  status: string
  lastActive: string
  joinDate: string
  deviceCount: number
  avatar: string
}

interface EditUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

export function EditUserModal({
  open,
  onOpenChange,
  user,
}: EditUserModalProps) {
  const [credentialsRevoked, setCredentialsRevoked] = useState(false)

  useEffect(() => {
    if (!open) {
      setCredentialsRevoked(false)
    }
  }, [open])

  const handleClose = () => {
    setCredentialsRevoked(false)
    onOpenChange(false)
  }

  const renderContent = () => {
    if (!user) return null

    switch (user.brokerType) {
      case 'iotnet':
        return (
          <EditUserIotnetBroker
            user={user}
            onCredentialsRevoked={() => setCredentialsRevoked(true)}
          />
        )
      case 'personal':
        return <EditUserPersonalBroker user={user} />
      case 'external':
        return <EditUserExternalBroker user={user} />
      default:
        return null
    }
  }

  if (!user) return null

  const BrokerIcon = getBrokerIcon(user.brokerType)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">Edit MQTT User</DialogTitle>
            <Badge
              variant={
                getBrokerBadgeVariant(user.brokerType) as
                  | 'default'
                  | 'secondary'
                  | 'outline'
              }
              className="flex items-center gap-1.5"
            >
              <BrokerIcon className="w-3 h-3" />
              {getBrokerLabel(user.brokerType)}
            </Badge>
          </div>
          <DialogDescription>
            Manage user settings and broker configuration for {user.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {!credentialsRevoked && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          <Button onClick={handleClose}>
            {credentialsRevoked ? 'Close' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
