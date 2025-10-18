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
import { FileUpload } from '@/components/ui/fileUpload'

type SslCertificateOption =
  | 'new-certificate'
  | 'own-certificate'
  | 'existing-domain'

export default function BrokerCreateSetup() {
  const [useMqtts, setUseMqtts] = useState(false)
  const [sslOption, setSslOption] =
    useState<SslCertificateOption>('new-certificate')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [, setCertificateFiles] = useState<File[]>([])
  const [, setKeyFiles] = useState<File[]>([])
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="broker-name">Broker Name</Label>
            <Input id="broker-name" placeholder="broker.my-domain.com" />
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
            <Card className="border-amber-500 dark:border-amber-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <span className="text-amber-600 dark:text-amber-400">⚠️</span>
                  Setup Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-3">
                  Before proceeding, please ensure the following conditions are
                  met:
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                      •
                    </span>
                    <span>
                      Your domain has an active DNS A record pointing to your
                      server&apos;s public IP.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                      •
                    </span>
                    <span>
                      The domain must be publicly accessible over the internet.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                      •
                    </span>
                    <span>
                      Port 80 (HTTP) is open and reachable from external
                      networks.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                      •
                    </span>
                    <span>
                      For local or private network devices, please use the
                      default IoTNet broker, or alternatively upload your own
                      SSL certificates below.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label
                htmlFor="ssl-certificate-option"
                className="text-sm font-medium"
              >
                SSL Certificate Option
              </Label>
              <select
                id="ssl-certificate-option"
                value={sslOption}
                onChange={(e) =>
                  setSslOption(e.target.value as SslCertificateOption)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="new-certificate">
                  Request a new SSL certificate (with Let&apos;s Encrypt)
                </option>
                <option value="own-certificate">
                  Use your own certificate
                </option>
                <option value="existing-domain">
                  Use existing domain SSL (example.com, api.example.com)
                </option>
              </select>
            </div>

            {sslOption === 'new-certificate' && (
              <div className="pt-2">
                <Button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => {
                    alert('SSL certificate request initiated for your domain!')
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Request SSL Certificate
                </Button>
              </div>
            )}

            {sslOption === 'existing-domain' && (
              <div className="space-y-2">
                <Label
                  htmlFor="existing-domain"
                  className="text-sm font-medium"
                >
                  Select Existing Domain
                </Label>
                <select
                  id="existing-domain"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select a domain...</option>
                  <option value="example.com">example.com</option>
                  <option value="api.example.com">api.example.com</option>
                  <option value="mqtt.example.com">mqtt.example.com</option>
                  <option value="broker.example.com">broker.example.com</option>
                </select>
              </div>
            )}

            {sslOption === 'own-certificate' && (
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

        <div className="flex flex-col items-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setConnectionStatus('MQTT Connected successfully!')
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            Test Connection
          </Button>
          {connectionStatus && (
            <div className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {connectionStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
