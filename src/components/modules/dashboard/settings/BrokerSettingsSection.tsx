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
import { FileUpload } from '@/components/modules/shared/fileUpload'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { ChevronDown } from 'lucide-react'

interface BrokerConfig {
  name: string
  host: string
  mqttPort: string
  mqttsPort: string
  useMqtts: boolean
  sslOption: 'new-certificate' | 'own-certificate' | 'existing-domain'
  status: 'active' | 'inactive' | 'error'
}

export default function BrokerSettingsSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [brokerConfig, setBrokerConfig] = useState<BrokerConfig>({
    name: 'My IoT Broker',
    host: 'mqtt.example.com',
    mqttPort: '1883',
    mqttsPort: '8883',
    useMqtts: true,
    sslOption: 'new-certificate',
    status: 'active',
  })

  const [savedConfig, setSavedConfig] = useState(brokerConfig)

  const handleSave = () => {
    setSavedConfig(brokerConfig)
    setIsEditing(false)
    // TODO: Implement API call to save broker configuration
    console.log('Saving broker configuration:', brokerConfig)
  }

  const handleCancel = () => {
    setBrokerConfig(savedConfig)
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string | boolean) => {
    setBrokerConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleTestConnection = () => {
    // TODO: Implement actual connection test
    console.log('Testing broker connection...')
    alert('Connection test successful!')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: {
        variant: 'default' as const,
        text: 'Active',
        className: 'bg-green-500',
      },
      inactive: {
        variant: 'secondary' as const,
        text: 'Inactive',
        className: '',
      },
      error: { variant: 'destructive' as const, text: 'Error', className: '' },
    }
    const config = variants[status as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-3 pb-2">
              MQTT Broker Configuration
              {getStatusBadge(brokerConfig.status)}
            </CardTitle>
            <CardDescription>
              Manage your custom MQTT broker settings
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto"
            >
              Edit Configuration
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Basic Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="broker-name">Broker Name</Label>
                <Input
                  id="broker-name"
                  value={brokerConfig.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="My IoT Broker"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="broker-host">Broker Host</Label>
                <Input
                  id="broker-host"
                  value={brokerConfig.host}
                  onChange={(e) => handleChange('host', e.target.value)}
                  disabled={!isEditing}
                  placeholder="mqtt.example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mqtt-port">MQTT Port</Label>
                <Input
                  id="mqtt-port"
                  type="number"
                  value={brokerConfig.mqttPort}
                  onChange={(e) => handleChange('mqttPort', e.target.value)}
                  disabled={!isEditing}
                  placeholder="1883"
                />
              </div>

              {brokerConfig.useMqtts && (
                <div className="space-y-2">
                  <Label htmlFor="mqtts-port">MQTTS Port (SSL/TLS)</Label>
                  <Input
                    id="mqtts-port"
                    type="number"
                    value={brokerConfig.mqttsPort}
                    onChange={(e) => handleChange('mqttsPort', e.target.value)}
                    disabled={!isEditing}
                    placeholder="8883"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SSL/TLS Configuration */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use-mqtts"
                checked={brokerConfig.useMqtts}
                onChange={(e) => handleChange('useMqtts', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Label htmlFor="use-mqtts" className="text-sm font-medium">
                Use MQTTS (SSL/TLS encryption)
              </Label>
            </div>

            {brokerConfig.useMqtts && isEditing && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ssl-option">SSL Certificate Option</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span className="text-sm">
                          {brokerConfig.sslOption === 'new-certificate'
                            ? "Generate New Certificate (Let's Encrypt)"
                            : brokerConfig.sslOption === 'own-certificate'
                            ? 'Upload Own Certificate'
                            : 'Use Existing Domain Certificate'}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[var(--radix-dropdown-menu-trigger-width)]"
                      align="start"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          handleChange('sslOption', 'new-certificate')
                        }
                      >
                        Generate New Certificate (Let&apos;s Encrypt)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleChange('sslOption', 'own-certificate')
                        }
                      >
                        Upload Own Certificate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleChange('sslOption', 'existing-domain')
                        }
                      >
                        Use Existing Domain Certificate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {brokerConfig.sslOption === 'own-certificate' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Certificate File (.crt or .pem)</Label>
                      <FileUpload
                        onFilesChange={(files) =>
                          console.log('Certificate files:', files)
                        }
                        accept=".crt,.pem"
                        acceptedFileTypes={['.crt', '.pem']}
                        maxFiles={1}
                        helperText="Upload your SSL certificate file"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Private Key File (.key)</Label>
                      <FileUpload
                        onFilesChange={(files) =>
                          console.log('Key files:', files)
                        }
                        accept=".key"
                        acceptedFileTypes={['.key']}
                        maxFiles={1}
                        helperText="Upload your private key file"
                      />
                    </div>
                  </div>
                )}

                {brokerConfig.sslOption === 'new-certificate' && (
                  <Card className="border-amber-500 dark:border-amber-400">
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-amber-600 dark:text-amber-400">
                            ⚠️
                          </span>
                          <span className="font-medium">
                            Requirements for Let&apos;s Encrypt:
                          </span>
                        </div>
                        <ul className="space-y-1 ml-6 list-disc">
                          <li>Domain must have valid DNS A record</li>
                          <li>Port 80 must be open and accessible</li>
                          <li>Domain must be publicly reachable</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              className="w-full sm:w-auto"
            >
              Test Connection
            </Button>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} className="w-full sm:w-auto">
                  Save Configuration
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
