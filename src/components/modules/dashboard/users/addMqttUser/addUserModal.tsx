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
import BrokerOptions from './addUserOptions'
import BrokerIonetSetup from './addUserByIotnetBroker'
import BrokerPersonalSetup from './addUserByPersonalBroker'
import BrokerExternalSetup from './addUserByExternalBroker'

interface BrokerSetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack?: () => void
}

export function BrokerSetupModal({
  open,
  onOpenChange,
  onBack,
}: BrokerSetupModalProps) {
  const [currentView, setCurrentView] = useState<string>('options')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [credentialsGenerated, setCredentialsGenerated] = useState(false)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption) {
      setCurrentView(selectedOption)
    }
  }

  const handleBackToOptions = () => {
    setCurrentView('options')
    setSelectedOption(null)
    setCredentialsGenerated(false)
  }

  const handleClose = () => {
    setCurrentView('options')
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
      case 'personal':
        return <BrokerPersonalSetup />
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
      case 'personal':
        return 'Use Personal Broker'
      case 'external':
        return 'Use Broker'
      default:
        return 'Continue'
    }
  }

  const getTitle = () => {
    switch (currentView) {
      case 'iotnet':
        return 'Use IoTNet Broker'
      case 'personal':
        return 'Use Personal Broker'
      case 'external':
        return 'Use Your Broker'
      default:
        return 'Setup Your MQTT Broker'
    }
  }

  const getDescription = () => {
    switch (currentView) {
      case 'iotnet':
        return 'Connect to the default IoTNet broker with automatic configuration.'
      case 'personal':
        return 'Configure and use your personal MQTT broker.'
      case 'external':
        return 'Connect to your existing MQTT broker.'
      default:
        return 'Choose how you want to connect to an MQTT broker.'
    }
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
          {(currentView === 'personal' || currentView === 'external') && (
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
