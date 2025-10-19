'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, RotateCw, ChevronDown } from 'lucide-react'
import { generateHashPassword } from '@/lib/utils/credentialsUtils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'

interface User {
  id: number
  name: string
  email: string
  role: string
  brokerType: string
  brokerName: string
  status: string
  lastActive: string
  joinDate: string
  deviceCount: number
  avatar: string
}

interface EditUserPersonalBrokerProps {
  user: User
}

export default function EditUserPersonalBroker({
  user,
}: EditUserPersonalBrokerProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<'user' | 'admin'>(
    user.role.toLowerCase() as 'user' | 'admin'
  )
  const [username, setUsername] = useState('mqtt_user_' + user.id)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const generateRandomPassword = () => {
    const hashPassword = generateHashPassword()
    setPassword(hashPassword)
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="user-name">Name</Label>
            <Input
              id="user-name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              placeholder="user@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-role">Role</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>{role === 'user' ? 'User' : 'Admin'}</span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[var(--radix-dropdown-menu-trigger-width)]"
              align="start"
            >
              <DropdownMenuItem onClick={() => setRole('user')}>
                User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('admin')}>
                Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-semibold mb-2">Broker Information</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Broker Name:</span>{' '}
              {user.brokerName}
            </p>
            <p>
              <span className="font-medium text-foreground">User Joined:</span>{' '}
              {user.joinDate}
            </p>
            <p>
              <span className="font-medium text-foreground">
                Connected Devices:
              </span>{' '}
              {user.deviceCount}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="broker-username">Username</Label>
          <Input
            id="broker-username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="broker-password">Password</Label>
          <div className="flex items-center gap-2">
            <Input
              id="broker-password"
              placeholder="Leave empty to keep current password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={generateRandomPassword}
              title="Generate random password"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Leave password empty if you don&apos;t want to change it
          </p>
        </div>
      </div>
    </div>
  )
}
