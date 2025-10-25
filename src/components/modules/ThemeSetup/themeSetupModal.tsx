'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ThemeOptions } from './themeOptions'

interface ThemeSetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
}

export function ThemeSetupModal({
  open,
  onOpenChange,
  onContinue,
}: ThemeSetupModalProps) {
  const handleContinueClick = () => {
    onContinue()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>Setup Your Theme</DialogTitle>
          <DialogDescription>
            Choose your preferred theme for the application.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <ThemeOptions />
        </div>
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          <Button onClick={handleContinueClick}>Get Started</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
