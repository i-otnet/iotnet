'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import BrokerCreateSetup from './brokerSetupConfig'

interface BrokerSetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack?: () => void
  onContinue?: () => void
}

export function BrokerSetupModal({
  open,
  onOpenChange,
  onBack,
}: BrokerSetupModalProps) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Create Your Own Broker</DialogTitle>
          <DialogDescription>
            Configure your private MQTT broker.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <BrokerCreateSetup />
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}

          <Button
            onClick={() => {
              onOpenChange(false)
              router.push('/auth/login')
            }}
          >
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
