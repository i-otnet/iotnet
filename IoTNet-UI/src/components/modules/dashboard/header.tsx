import React from 'react'
import Profile from '@/components/modules/dashboard/profile'
import { ThemeDropdown } from '@/components/modules/ThemeSetup/themeDropdown'
import NotificationDropdown from '@/components/modules/dashboard/notifications/NotificationDropdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    // Clear access token from store
    clearAuth()

    // Redirect to Backend SSO Logout (clears HTTP-only cookie)
    // Then redirects back to our login page
    const loginUrl = window.location.origin + '/auth/login'

    // Using localhost:5500 as per backend config. 
    window.location.href = `http://localhost:5500/auth/sso/logout?redirect_uri=${encodeURIComponent(loginUrl)}`
  }
  return (
    <header className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-4">
        {/* Left side - Mobile Menu + Search */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-md">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Search - Hidden on very small screens */}
          <div className="relative w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search devices, models, users..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Right side - Theme, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search icon for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Theme Selector */}
          <ThemeDropdown />

          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Profile */}
          <Profile
            username="Admin User"
            // avatarUrl="/path/to/avatar.jpg" // Optional: uncomment and set avatar URL
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  )
}
