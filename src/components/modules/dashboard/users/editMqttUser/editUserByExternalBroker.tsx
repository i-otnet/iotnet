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
import { FileUpload } from '@/components/modules/shared/fileUpload'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { ChevronDown } from 'lucide-react'

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

interface EditUserExternalBrokerProps {
  user: User
}

export default function EditUserExternalBroker({
  user,
}: EditUserExternalBrokerProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<'user' | 'admin'>(
    user.role.toLowerCase() as 'user' | 'admin'
  )
  const [brokerUrl, setBrokerUrl] = useState('broker.example.com')
  const [mqttPort, setMqttPort] = useState('1883')
  const [useMqtts, setUseMqtts] = useState(true)
  const [mqttsPort, setMqttsPort] = useState('8883')
  const [useCustomCertificate, setUseCustomCertificate] = useState(false)
  const [, setCertificateFiles] = useState<File[]>([])
  const [, setKeyFiles] = useState<File[]>([])
  const [brokerUsername, setBrokerUsername] = useState('')
  const [brokerPassword, setBrokerPassword] = useState('')

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
          <h3 className="text-sm font-semibold mb-2">
            Current Broker Information
          </h3>
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

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="broker-url">Broker URL</Label>
            <Input
              id="broker-url"
              placeholder="broker.my-domain.com"
              value={brokerUrl}
              onChange={(e) => setBrokerUrl(e.target.value)}
            />
          </div>

          <div className="w-32 space-y-2">
            <Label htmlFor="broker-port">MQTT Port</Label>
            <Input
              id="broker-port"
              placeholder="1883"
              type="number"
              value={mqttPort}
              onChange={(e) => setMqttPort(e.target.value)}
            />
          </div>

          {useMqtts && (
            <div className="w-32 space-y-2">
              <Label htmlFor="mqtts-port">MQTTS Port</Label>
              <Input
                id="mqtts-port"
                placeholder="8883"
                type="number"
                value={mqttsPort}
                onChange={(e) => setMqttsPort(e.target.value)}
              />
            </div>
          )}
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
                      Upload new SSL certificate and private key files
                      (optional)
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
          <Input
            id="broker-username"
            placeholder="Enter username"
            value={brokerUsername}
            onChange={(e) => setBrokerUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="broker-password">Password (optional)</Label>
          <Input
            id="broker-password"
            placeholder="Leave empty to keep current password"
            type="password"
            value={brokerPassword}
            onChange={(e) => setBrokerPassword(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Leave password empty if you don't want to change it
          </p>
        </div>
      </div>
    </div>
  )
}
