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
import { getBrokerTitle, getBrokerDescription } from '@/lib/utils/brokerUtils'
import BrokerOptions from './addUserOptions'
import BrokerIonetSetup from './addUserByIotnetBroker'
import BrokerExternalSetup from './addUserByExternalBroker'

function useMultiViewModal<T extends string>(initialView: T) {
  const [currentView, setCurrentView] = useState<T>(initialView)

  const resetView = () => {
    setCurrentView(initialView)
  }

  return {
    currentView,
    setCurrentView,
    resetView,
  }
}

interface BrokerSetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack?: () => void
}

type ViewType = 'options' | 'iotnet' | 'external'

export function BrokerSetupModal({
  open,
  onOpenChange,
  onBack,
}: BrokerSetupModalProps) {
  const { currentView, setCurrentView, resetView } =
    useMultiViewModal<ViewType>('options')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [credentialsGenerated, setCredentialsGenerated] = useState(false)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption) {
      setCurrentView(selectedOption as ViewType)
    }
  }

  const handleBackToOptions = () => {
    resetView()
    setSelectedOption(null)
    setCredentialsGenerated(false)
  }

  const handleClose = () => {
    resetView()
    setSelectedOption(null)
    setCredentialsGenerated(false)
    onOpenChange(false)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'iotnet':
        return (
          <BrokerIonetSetup
            onCredentialsGenerated={() => setCredentialsGenerated(true)}
          />
        )
      case 'external':
        return <BrokerExternalSetup />
      default:
        return (
          <BrokerOptions
            selected={selectedOption}
            setSelected={handleOptionSelect}
          />
        )
    }
  }

  const getContinueButtonText = () => {
    switch (currentView) {
      case 'iotnet':
        return 'Use IoTNet'
      case 'external':
        return 'Use Broker'
      default:
        return 'Continue'
    }
  }

  const getTitle = () => {
    if (currentView === 'options') return 'Setup Your MQTT Broker'
    return getBrokerTitle(currentView)
  }

  const getDescription = () => {
    if (currentView === 'options')
      return 'Choose how you want to connect to an MQTT broker.'
    return getBrokerDescription(currentView)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {onBack && currentView === 'options' && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          {currentView === 'iotnet' && !credentialsGenerated && (
            <Button variant="outline" onClick={handleBackToOptions}>
              Back
            </Button>
          )}
          {currentView === 'external' && (
            <Button variant="outline" onClick={handleBackToOptions}>
              Back
            </Button>
          )}
          {currentView === 'options' && (
            <Button onClick={handleContinue} disabled={!selectedOption}>
              Continue
            </Button>
          )}
          {currentView !== 'options' && (
            <Button onClick={handleClose}>{getContinueButtonText()}</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
