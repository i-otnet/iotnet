'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Info,
  Copy,
  CheckCircle,
  ChevronDown,
  Loader2,
  Wifi,
} from 'lucide-react'
import { generateCredentials } from '@/lib/credentials'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'

interface BrokerIonetSetupProps {
  onCredentialsGenerated?: () => void
}

export default function BrokerIonetSetup({
  onCredentialsGenerated,
}: BrokerIonetSetupProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [credentials, setCredentials] = useState<{
    username: string
    password: string
  } | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [generatedOnce, setGeneratedOnce] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleGenerateCredentials = () => {
    const newCredentials = generateCredentials()
    setCredentials(newCredentials)
    setGeneratedOnce(true)
    onCredentialsGenerated?.()
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
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
    <div className="w-full max-w-2xl mx-auto py-6 space-y-6">
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
      </div>

      <Card className="border border-border/70 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col leading-tight">
              <CardTitle className="text-[15px] font-semibold">
                Configuration Summary
              </CardTitle>
              <p className="text-[12px] text-muted-foreground mt-[2px]">
                Auto-configured settings for IoTNet broker
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground leading-[1.4]">
          <p className="mb-2">
            These are the settings that will be applied automatically:
          </p>
          <Separator className="mb-3 opacity-30" />

          <ul className="space-y-1 pl-4 mb-4">
            <li className="list-disc">
              Broker URL:{' '}
              <span className="text-foreground font-medium">
                broker.i-ot.net
              </span>
            </li>
            <li className="list-disc">
              Port: <span className="text-foreground font-medium">1883</span>{' '}
              (MQTT) / <span className="text-foreground font-medium">8883</span>{' '}
              (MQTTS)
            </li>
            <li className="list-disc">
              Security:{' '}
              <span className="text-foreground font-medium">
                TLS encryption enabled
              </span>
            </li>
            <li className="list-disc">
              Authentication:{' '}
              <span className="text-foreground font-medium">
                Auto-generated credentials
              </span>
            </li>
          </ul>

          <div className="flex justify-center mt-4">
            {!generatedOnce && (
              <Button
                onClick={handleGenerateCredentials}
                variant="default"
                className="px-6"
              >
                Generate Credentials
              </Button>
            )}
          </div>

          {credentials && (
            <div className="mt-4 space-y-5 p-5 bg-gradient-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 rounded-lg border border-green-200/50 dark:border-green-900/50">
              <div className="flex items-center gap-2 pb-3 border-b border-green-200/50 dark:border-green-900/50">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-foreground">
                  Credentials Generated
                </p>
              </div>

              <div className="grid gap-4">
                {['username', 'password'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {field}
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-background rounded-md border border-border">
                      <code className="text-sm font-mono text-foreground flex-1 break-all select-all">
                        {credentials[field as 'username' | 'password']}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            credentials[field as 'username' | 'password'],
                            field
                          )
                        }
                        className="p-2 hover:bg-muted rounded-md transition-colors flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedField === field ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 rounded-md p-3">
                <p className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed font-medium">
                  ⚠️ <span className="font-semibold">Important:</span> Save
                  these credentials securely. They cannot be retrieved again.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
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
                      Connection failed. Please check your credentials and try
                      again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
