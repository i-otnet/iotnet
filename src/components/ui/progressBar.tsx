'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressBarVariants = cva(
  'relative overflow-hidden rounded-full transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-gray-200 dark:bg-gray-800',
        primary: 'bg-primary/10 dark:bg-primary/20',
        secondary: 'bg-gray-100 dark:bg-gray-700',
        success: 'bg-green-100 dark:bg-green-900/20',
        warning: 'bg-yellow-100 dark:bg-yellow-900/20',
        error: 'bg-red-100 dark:bg-red-900/20',
      },
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const progressFillVariants = cva(
  'h-full transition-all duration-500 ease-out relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-blue-500 to-blue-600',
        primary: 'bg-gradient-to-r from-primary to-primary/80',
        secondary: 'bg-gradient-to-r from-gray-500 to-gray-600',
        success: 'bg-gradient-to-r from-green-500 to-green-600',
        warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        error: 'bg-gradient-to-r from-red-500 to-red-600',
      },
      animated: {
        true: 'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: true,
    },
  }
)

interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value?: number
  max?: number
  loadingText?: string
  showLabel?: boolean
  animated?: boolean
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      loadingText = 'Loading...',
      showLabel = true,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className="w-full space-y-2">
        {showLabel && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {loadingText}
            </span>
            <span className="text-gray-500 dark:text-gray-400 tabular-nums">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        <div
          ref={ref}
          className={cn(progressBarVariants({ variant, size, className }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={loadingText}
          {...props}
        >
          <div
            className={cn(
              progressFillVariants({
                variant,
                animated: animated && percentage > 0 && percentage < 100,
              })
            )}
            style={{
              width: `${percentage}%`,
              borderRadius: 'inherit',
            }}
          >
            {animated && percentage > 0 && percentage < 100 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            )}
          </div>
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

// Hook untuk simulasi progress (opsional)
export const useProgress = (duration: number = 3000) => {
  const [progress, setProgress] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const startProgress = React.useCallback(() => {
    setIsLoading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        // Simulasi progress yang tidak linear (lebih realistis)
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, duration / 20)

    return () => clearInterval(interval)
  }, [duration])

  const resetProgress = React.useCallback(() => {
    setProgress(0)
    setIsLoading(false)
  }, [])

  return { progress, isLoading, startProgress, resetProgress }
}

export { ProgressBar, progressBarVariants, progressFillVariants }
