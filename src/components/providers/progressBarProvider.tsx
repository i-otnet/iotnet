'use client'

import * as React from 'react'
import { ProgressBar } from '@/components/ui/progressBar'

interface ProgressBarContextType {
  showProgress: (
    text?: string,
    duration?: number,
    onComplete?: () => void
  ) => void
  hideProgress: () => void
  isVisible: boolean
  progress: number
  loadingText: string
}

const ProgressBarContext = React.createContext<
  ProgressBarContextType | undefined
>(undefined)

export const useProgressBar = () => {
  const context = React.useContext(ProgressBarContext)
  if (!context) {
    throw new Error('useProgressBar must be used within a ProgressBarProvider')
  }
  return context
}

interface ProgressBarProviderProps {
  children: React.ReactNode
}

export const ProgressBarProvider: React.FC<ProgressBarProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [loadingText, setLoadingText] = React.useState('Loading...')
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = React.useRef<(() => void) | null>(null)

  const showProgress = React.useCallback(
    (
      text: string = 'Loading...',
      duration: number = 5000,
      onComplete?: () => void
    ) => {
      setLoadingText(text)
      setIsVisible(true)
      setProgress(0)
      onCompleteRef.current = onComplete || null

      // Clear existing interval if any
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      const steps = 50 // Number of steps for smooth animation
      const stepDuration = duration / steps
      let currentStep = 0

      intervalRef.current = setInterval(() => {
        currentStep++

        if (currentStep >= steps) {
          setProgress(100)
          clearInterval(intervalRef.current!)

          // Auto hide after completion and call onComplete callback
          setTimeout(() => {
            setIsVisible(false)
            setProgress(0)
            // Call the completion callback if provided
            if (onCompleteRef.current) {
              onCompleteRef.current()
              onCompleteRef.current = null
            }
          }, 500)

          return
        }

        const linearProgress = (currentStep / steps) * 100
        const easedProgress = 100 * (1 - Math.pow(1 - linearProgress / 100, 2))

        setProgress(Math.min(easedProgress, 95)) // Cap at 95% until completion
      }, stepDuration)
    },
    []
  )

  const hideProgress = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsVisible(false)
    setProgress(0)
    onCompleteRef.current = null
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const value = React.useMemo(
    () => ({
      showProgress,
      hideProgress,
      isVisible,
      progress,
      loadingText,
    }),
    [showProgress, hideProgress, isVisible, progress, loadingText]
  )

  return (
    <ProgressBarContext.Provider value={value}>
      {children}

      {/* Global Progress Bar Overlay - Centered with solid background */}
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 dark:bg-gray-900/95">
          <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
            <ProgressBar
              value={progress}
              loadingText={loadingText}
              variant="primary"
              size="lg"
              animated={true}
              className="w-full"
            />
          </div>
        </div>
      )}
    </ProgressBarContext.Provider>
  )
}
