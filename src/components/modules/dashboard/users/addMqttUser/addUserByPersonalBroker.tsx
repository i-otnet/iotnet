'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Eye,
  EyeOff,
  RotateCw,
  ChevronDown,
  Loader2,
  Wifi,
  CheckCircle,
  Info,
} from 'lucide-react'
import { generateHashPassword } from '@/lib/credentials'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'

export default function BrokerPersonalSetup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const generateRandomPassword = () => {
    const hashPassword = generateHashPassword()
    setPassword(hashPassword)
  }

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    setConnectionStatus('idle')

    // Simulate connection test
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Simulate successful connection
      setConnectionStatus('success')
    } catch (error) {
      setConnectionStatus('error')
      console.error('Connection test failed:', error)
    } finally {
      setIsTestingConnection(false)
    }
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
              placeholder="Enter password"
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
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <Button
            onClick={handleTestConnection}
            disabled={isTestingConnection}
            variant="outline"
            className="w-full"
          >
            {isTestingConnection ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <Wifi className="mr-2 h-4 w-4" />
                Test Connection
              </>
            )}
          </Button>

          {connectionStatus === 'success' && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-md">
              <p className="text-xs text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Connection successful! Broker is reachable.
              </p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-md">
              <p className="text-xs text-red-700 dark:text-red-400 font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                Connection failed. Please check your credentials and try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
