'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy, CheckCircle, ChevronDown, AlertTriangle } from 'lucide-react'
import { generateCredentials } from '@/lib/utils/credentialsUtils'
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

interface EditUserIotnetBrokerProps {
  user: User
  onCredentialsRevoked?: () => void
}

export default function EditUserIotnetBroker({
  user,
  onCredentialsRevoked,
}: EditUserIotnetBrokerProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<'user' | 'admin'>(
    user.role.toLowerCase() as 'user' | 'admin'
  )
  const [credentials, setCredentials] = useState<{
    username: string
    password: string
  } | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false)

  const handleRevokeAndGenerate = () => {
    const newCredentials = generateCredentials()
    setCredentials(newCredentials)
    setShowRevokeConfirm(false)
    onCredentialsRevoked?.()
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
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
              <span className="font-medium text-foreground">Broker URL:</span>{' '}
              broker.i-ot.net
            </p>
            <p>
              <span className="font-medium text-foreground">Port:</span> 1883
              (MQTT) / 8883 (MQTTS)
            </p>
            <p>
              <span className="font-medium text-foreground">Security:</span> TLS
              encryption enabled
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

        {!credentials && (
          <div className="flex justify-center mt-2">
            {!showRevokeConfirm ? (
              <Button
                onClick={() => setShowRevokeConfirm(true)}
                variant="default"
                className="px-6"
              >
                Revoke Credentials
              </Button>
            ) : (
              <div className="w-full p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Confirm Credentials Revocation
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      This will invalidate the current credentials and generate
                      new ones. All devices using the old credentials will be
                      disconnected and need to be reconfigured with the new
                      credentials.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRevokeConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRevokeAndGenerate}
                  >
                    Yes, Revoke & Generate New
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {credentials && (
          <div className="space-y-4 p-4 bg-gradient-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 rounded-lg border border-green-200/50 dark:border-green-900/50">
            <div className="flex items-center gap-2 pb-2 border-b border-green-200/50 dark:border-green-900/50">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-foreground">
                New Credentials Generated
              </p>
            </div>

            <div className="space-y-4">
              {['username', 'password'].map((field) => (
                <div key={field} className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {field}
                  </Label>
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
                ⚠️ <span className="font-semibold">Important:</span> Save these
                credentials securely. The old credentials have been revoked and
                all devices must be updated with these new credentials.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
