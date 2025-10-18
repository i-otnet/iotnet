'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, RotateCw } from 'lucide-react'
import { generateHashPassword } from '@/lib/credentials'

export default function BrokerPersonalSetup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [username, setUsername] = useState('')
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
          <select
            id="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-700 dark:hover:bg-slate-900 transition-colors flex-shrink-0"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={generateRandomPassword}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-700 dark:hover:bg-slate-900 transition-colors flex-shrink-0"
              title="Generate random password"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
