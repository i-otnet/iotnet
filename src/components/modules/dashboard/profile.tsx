'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LogOut, User, ChevronDown, Settings } from 'lucide-react'

interface ProfileProps {
  username?: string
  avatarUrl?: string
  onLogout?: () => void
}

export default function Profile({
  username = 'Admin User',
  avatarUrl,
  onLogout,
}: ProfileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior - redirect to login
      window.location.href = '/auth/login'
    }
  }

  return (
    <div className="flex items-center">
      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-accent rounded-lg"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Profile Image (Circle) */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-background">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`${username}'s avatar`}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium text-foreground leading-none">
              {username}
            </p>
            <p className="text-xs text-muted-foreground leading-none mt-1">
              Administrator
            </p>
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">
                  {username}
                </p>
                <p className="text-xs text-muted-foreground">
                  admin@iotnet.com
                </p>
              </div>

              <div className="py-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 h-auto text-sm"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 h-auto text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
