'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  status: 'active' | 'revoked'
}

export default function ApiKeysSection() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'iotnet_pk_1234567890abcdefghijklmnopqrstuvwxyz',
      createdAt: '2024-01-15',
      lastUsed: '2024-10-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'iotnet_pk_abcdefghijklmnopqrstuvwxyz1234567890',
      createdAt: '2024-02-20',
      lastUsed: '2024-10-10',
      status: 'active',
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) {
      alert('Please enter a name for your API key')
      return
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `iotnet_pk_${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      status: 'active',
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    setShowCreateForm(false)

    // TODO: Implement API call to create new key
    console.log('Creating new API key:', newKey)
  }

  const handleRevokeKey = (id: string) => {
    if (
      confirm(
        'Are you sure you want to revoke this API key? This action cannot be undone.'
      )
    ) {
      setApiKeys(
        apiKeys.map((key) =>
          key.id === id ? { ...key, status: 'revoked' as const } : key
        )
      )
      // TODO: Implement API call to revoke key
      console.log('Revoking API key:', id)
    }
  }

  const handleDeleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key permanently?')) {
      setApiKeys(apiKeys.filter((key) => key.id !== id))
      // TODO: Implement API call to delete key
      console.log('Deleting API key:', id)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('API key copied to clipboard!')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="pb-2">API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for programmatic access
            </CardDescription>
          </div>
          {!showCreateForm && (
            <Button onClick={() => setShowCreateForm(true)}>
              Create New Key
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Create New API Key Form */}
          {showCreateForm && (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key-name">API Key Name</Label>
                    <Input
                      id="api-key-name"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API Key"
                    />
                    <p className="text-xs text-muted-foreground">
                      Choose a descriptive name to help you identify this key
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false)
                        setNewKeyName('')
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateApiKey}>
                      Generate API Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Keys List */}
          <div className="space-y-4">
            {apiKeys.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No API keys found. Create one to get started.
              </div>
            ) : (
              apiKeys.map((apiKey) => (
                <Card
                  key={apiKey.id}
                  className={apiKey.status === 'revoked' ? 'opacity-60' : ''}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{apiKey.name}</h4>
                            <Badge
                              variant={
                                apiKey.status === 'active'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {apiKey.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Created: {apiKey.createdAt}
                            {apiKey.lastUsed &&
                              ` • Last used: ${apiKey.lastUsed}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {apiKey.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeKey(apiKey.id)}
                            >
                              Revoke
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteKey(apiKey.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Input
                          value={apiKey.key}
                          readOnly
                          className="font-mono text-sm"
                          type="password"
                          id={`key-${apiKey.id}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById(
                              `key-${apiKey.id}`
                            ) as HTMLInputElement
                            input.type =
                              input.type === 'password' ? 'text' : 'password'
                          }}
                        >
                          Show
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
