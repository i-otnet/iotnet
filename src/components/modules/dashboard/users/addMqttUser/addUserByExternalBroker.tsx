'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileUpload } from '@/components/shared/fileUpload'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { ChevronDown, Loader2, Wifi, CheckCircle, Info } from 'lucide-react'

export default function BrokerExternalSetup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [brokerName, setBrokerName] = useState('')
  const [useMqtts, setUseMqtts] = useState(false)
  const [useCustomCertificate, setUseCustomCertificate] = useState(false)
  const [, setCertificateFiles] = useState<File[]>([])
  const [, setKeyFiles] = useState<File[]>([])
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

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
          <Label htmlFor="broker-name">Broker Name</Label>
          <Input
            id="broker-name"
            placeholder="e.g., AWS IoT Core, Azure IoT Hub, HiveMQ Cloud"
            value={brokerName}
            onChange={(e) => setBrokerName(e.target.value)}
          />
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

        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <Label htmlFor="broker-url">Broker URL</Label>
            <Input id="broker-url" placeholder="broker.my-domain.com" />
          </div>

          <div className="w-[110px] space-y-2">
            <Label htmlFor="broker-port">MQTT Port</Label>
            <Input id="broker-port" placeholder="1883" type="number" />
          </div>

          {useMqtts && (
            <div className="w-[110px] space-y-2">
              <Label htmlFor="mqtts-port">MQTTS Port</Label>
              <Input id="mqtts-port" placeholder="8883" type="number" />
            </div>
          )}

          <div className="w-[110px] space-y-2">
            <Label htmlFor="wss-port">WSS Port</Label>
            <Input id="wss-port" placeholder="8081" type="number" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-mqtts"
            checked={useMqtts}
            onChange={(e) => setUseMqtts(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <Label htmlFor="use-mqtts" className="text-sm font-medium">
            Use MQTTS (SSL/TLS encryption)
          </Label>
        </div>

        {useMqtts && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use-custom-certificate"
                checked={useCustomCertificate}
                onChange={(e) => setUseCustomCertificate(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Label
                htmlFor="use-custom-certificate"
                className="text-sm font-medium"
              >
                Use custom SSL certificate
              </Label>
            </div>

            {useCustomCertificate && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      SSL Certificate Files
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Upload your SSL certificate and private key files
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="certificate-file"
                        className="text-sm font-medium"
                      >
                        Certificate File (fullchain.crt)
                      </Label>
                      <FileUpload
                        maxFiles={1}
                        maxSize={1024 * 1024} // 1MB
                        acceptedFileTypes={['.crt', '.pem', '.cer']}
                        onFilesChange={setCertificateFiles}
                        dropzoneText="Drag and drop your certificate file here"
                        buttonText="Choose Certificate File"
                        helperText="Upload your SSL certificate file (fullchain.crt)"
                        variant="compact"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="key-file" className="text-sm font-medium">
                        Private Key File (certificate.key)
                      </Label>
                      <FileUpload
                        maxFiles={1}
                        maxSize={1024 * 1024} // 1MB
                        acceptedFileTypes={['.key', '.pem']}
                        onFilesChange={setKeyFiles}
                        dropzoneText="Drag and drop your private key file here"
                        buttonText="Choose Private Key File"
                        helperText="Upload your SSL private key file (certificate.key)"
                        variant="compact"
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="broker-username">Username (optional)</Label>
          <Input id="broker-username" placeholder="Enter username" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="broker-password">Password (optional)</Label>
          <Input
            id="broker-password"
            placeholder="Enter password"
            type="password"
          />
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
                Connection failed. Please check your broker settings and try
                again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
