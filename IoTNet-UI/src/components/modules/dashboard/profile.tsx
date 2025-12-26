'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LogOut, User, ChevronDown, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdownMenu'

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-accent rounded-lg"
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
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@iotnet.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
