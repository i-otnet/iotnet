'use client'

import { useState } from 'react'
import { Zap, Settings } from 'lucide-react'
import { ThemeSetupModal } from '@/components/modules/ThemeSetup/themeSetupModal'
import { Button } from '@/components/ui/button'

export default function SetupPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  const handleThemeContinue = async () => {
    setIsThemeModalOpen(false)
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  const handleSetupProject = () => {
    setIsThemeModalOpen(true)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 overflow-hidden">
      {/* === Background themed with primary color === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient using Tailwind primary color classes */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />

        {/* Animated grid using primary color */}
        {/* hide heavy animated grid on small screens to avoid overflow/perf issues */}
        <div
          className="hidden sm:block absolute opacity-30"
          style={{
            top: '-200px',
            left: '-200px',
            right: '-200px',
            bottom: '-200px',
            backgroundImage: `
              linear-gradient(var(--primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float-glow-left 30s linear infinite',
          }}
        />

        {/* Floating particles using primary color */}
        {/* particles: hide heavy ones on small screens to keep layout simple; add a few lightweight mobile particles below */}
        <div
          className="hidden sm:block absolute top-[20%] left-[40%] w-3 h-3 rounded-full animate-float-particles 
          bg-primary opacity-50 dark:opacity-70 shadow-lg shadow-primary/50"
        />
        {/* Lightweight mobile particles (small, low-opacity, slower movement) */}
        <div
          className="sm:hidden absolute top-[16%] left-[10%] w-1.5 h-1.5 rounded-full bg-primary opacity-30 animate-float-particles shadow-sm"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="sm:hidden absolute top-[30%] right-[12%] w-1.5 h-1.5 rounded-full bg-primary opacity-25 animate-float-particles shadow-sm"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="sm:hidden absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-primary opacity-20 animate-float-particles shadow-sm"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="hidden sm:block absolute top-[55%] right-[35%] w-2 h-2 rounded-full animate-float-particles 
          bg-primary opacity-40 dark:opacity-60 shadow-md shadow-primary/40"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="hidden sm:block absolute bottom-[40%] left-[55%] w-2.5 h-2.5 rounded-full animate-float-particles 
          bg-primary opacity-35 dark:opacity-55 shadow-lg shadow-primary/60"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="hidden sm:block absolute top-[40%] left-[25%] w-1.5 h-1.5 rounded-full animate-float-particles 
          bg-primary opacity-60 dark:opacity-80 shadow-sm shadow-primary/70"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="hidden sm:block absolute bottom-[55%] right-[20%] w-2 h-2 rounded-full animate-float-particles 
          bg-primary opacity-45 dark:opacity-65 shadow-md shadow-primary/50"
          style={{ animationDelay: '3s' }}
        />

        {/* Subtle overlay to blend with content */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/70" />
      </div>

      {/* === CONTENT (unchanged) === */}
      <div className="relative z-10 text-center space-y-6 max-w-[900px] w-full px-4 sm:px-0">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-primary">
              IoTNet
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Welcome to IoTNet Dashboard
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Connect, monitor, and control your IoT devices with ease. Get
            started by setting up your project configuration.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-8 sm:mt-12 w-full max-w-sm sm:max-w-none">
          <Button
            onClick={handleSetupProject}
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Get Started
          </Button>

          {/* Mobile-only: dot above, text broken into two lines */}
          <div className="flex sm:hidden flex-row items-center justify-center gap-x-6 text-[11px] text-foreground/95 mt-6 sm:mt-8 flex-nowrap whitespace-nowrap overflow-x-auto px-2">
            <div className="flex flex-col items-center space-y-1 px-2 min-w-20">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
              />
              <span className="text-center text-[11px] leading-tight">
                Real-time
                <br />
                monitoring
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1 px-2 min-w-20">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse delay-100"
              />
              <span className="text-center text-[11px] leading-tight">
                Device
                <br />
                management
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1 px-2 min-w-20">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse delay-200"
              />
              <span className="text-center text-[11px] leading-tight">
                ML
                <br />
                models
              </span>
            </div>
          </div>

          {/* Desktop/tablet (sm+): inline row, dot left and text one line */}
          <div className="hidden sm:flex flex-row items-center justify-center gap-x-8 text-sm text-foreground/95 mt-6 sm:mt-8">
            <div className="flex items-center space-x-2">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
              />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse delay-100"
              />
              <span>Device management</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                aria-hidden
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse delay-200"
              />
              <span>ML models</span>
            </div>
          </div>
        </div>
      </div>

      <ThemeSetupModal
        open={isThemeModalOpen}
        onOpenChange={setIsThemeModalOpen}
        onContinue={handleThemeContinue}
      />
    </div>
  )
}
