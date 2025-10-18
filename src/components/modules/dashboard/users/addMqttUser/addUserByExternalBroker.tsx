'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileUpload } from '@/components/ui/fileUpload'

export default function BrokerExternalSetup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [useMqtts, setUseMqtts] = useState(false)
  const [useCustomCertificate, setUseCustomCertificate] = useState(false)
  const [, setCertificateFiles] = useState<File[]>([])
  const [, setKeyFiles] = useState<File[]>([])

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

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="broker-url">Broker URL</Label>
            <Input id="broker-url" placeholder="broker.my-domain.com" />
          </div>

          <div className="w-32 space-y-2">
            <Label htmlFor="broker-port">MQTT Port</Label>
            <Input id="broker-port" placeholder="1883" type="number" />
          </div>

          {useMqtts && (
            <div className="w-32 space-y-2">
              <Label htmlFor="mqtts-port">MQTTS Port</Label>
              <Input id="mqtts-port" placeholder="8883" type="number" />
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
      </div>
    </div>
  )
}
