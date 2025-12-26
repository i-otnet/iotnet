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
import { mockApiKeysData } from '@/lib/json/data/settings/settingsData'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  status: 'active' | 'revoked'
}

export default function ApiKeysSection() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeysData.data.apiKeys)

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
    }
  }

  const handleDeleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key permanently?')) {
      setApiKeys(apiKeys.filter((key) => key.id !== id))
      // TODO: Implement API call to delete key
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('API key copied to clipboard!')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="pb-2">API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for programmatic access
            </CardDescription>
          </div>
          {!showCreateForm && (
            <Button
              onClick={() => setShowCreateForm(true)}
              className="w-full sm:w-auto"
            >
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false)
                        setNewKeyName('')
                      }}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateApiKey}
                      className="w-full sm:w-auto"
                    >
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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
                        <div className="flex gap-2 w-full sm:w-auto">
                          {apiKey.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeKey(apiKey.id)}
                              className="flex-1 sm:flex-initial"
                            >
                              Revoke
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteKey(apiKey.id)}
                            className="flex-1 sm:flex-initial"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input
                          value={apiKey.key}
                          readOnly
                          className="font-mono text-sm flex-1"
                          type="password"
                          id={`key-${apiKey.id}`}
                        />
                        <div className="flex gap-2">
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
                            className="flex-1 sm:flex-initial"
                          >
                            Show
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                            className="flex-1 sm:flex-initial"
                          >
                            Copy
                          </Button>
                        </div>
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
