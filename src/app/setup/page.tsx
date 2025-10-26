'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Settings } from 'lucide-react'
import { ThemeSetupModal } from '@/components/modules/ThemeSetup/themeSetupModal'
import { Button } from '@/components/ui/button'

export default function SetupPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  const router = useRouter()

  const handleThemeContinue = () => {
    setIsThemeModalOpen(false)
    router.push('/auth/login')
  }

  const handleSetupProject = () => {
    setIsThemeModalOpen(true)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      {/* === Background themed with primary color === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient using Tailwind primary color classes */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />

        {/* Animated grid using primary color */}
        <div
          className="absolute opacity-3"
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
        <div
          className="absolute top-[20%] left-[40%] w-3 h-3 rounded-full animate-float-particles 
          bg-primary opacity-50 dark:opacity-70 shadow-lg shadow-primary/50"
        />
        <div
          className="absolute top-[55%] right-[35%] w-2 h-2 rounded-full animate-float-particles 
          bg-primary opacity-40 dark:opacity-60 shadow-md shadow-primary/40"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-[40%] left-[55%] w-2.5 h-2.5 rounded-full animate-float-particles 
          bg-primary opacity-35 dark:opacity-55 shadow-lg shadow-primary/60"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute top-[40%] left-[25%] w-1.5 h-1.5 rounded-full animate-float-particles 
          bg-primary opacity-60 dark:opacity-80 shadow-sm shadow-primary/70"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-[55%] right-[20%] w-2 h-2 rounded-full animate-float-particles 
          bg-primary opacity-45 dark:opacity-65 shadow-md shadow-primary/50"
          style={{ animationDelay: '3s' }}
        />

        {/* Subtle overlay to blend with content */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/70" />
      </div>

      {/* === CONTENT (unchanged) === */}
      <div className="relative z-10 text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary">IoTNet</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to IoTNet Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Connect, monitor, and control your IoT devices with ease. Get
            started by setting up your project configuration.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-12">
          <Button
            onClick={handleSetupProject}
            size="lg"
            className="px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Settings className="w-5 h-5 mr-2" />
            Setup your project
          </Button>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-100" />
              <span>Device management</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-200" />
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
