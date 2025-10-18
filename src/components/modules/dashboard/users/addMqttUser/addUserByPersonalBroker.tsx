"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/fileUpload";

export default function BrokerPersonalSetup() {
  const [useMqtts, setUseMqtts] = useState(false);
  const [useCustomCertificate, setUseCustomCertificate] = useState(false);
  const [, setCertificateFiles] = useState<File[]>([]);
  const [, setKeyFiles] = useState<File[]>([]);
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="broker-name">Broker Name</Label>
            <Input 
              id="broker-name" 
              placeholder="broker.my-domain.com" 
            />
          </div>
          
          <div className="w-32 space-y-2">
            <Label htmlFor="broker-port">MQTT Port</Label>
            <Input 
              id="broker-port" 
              placeholder="1883" 
              type="number"
            />
          </div>
          
          {useMqtts && (
            <div className="w-32 space-y-2">
              <Label htmlFor="mqtts-port">MQTTS Port</Label>
              <Input 
                id="mqtts-port" 
                placeholder="8883" 
                type="number"
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
            <Card className="border-amber-500 dark:border-amber-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <span className="text-amber-600 dark:text-amber-400">⚠️</span>
                  Setup Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-3">
                  Before proceeding, please ensure the following conditions are met:
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">•</span>
                    <span>Your domain has an active DNS A record pointing to your server&apos;s public IP.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">•</span>
                    <span>The domain must be publicly accessible over the internet.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">•</span>
                    <span>Port 80 (HTTP) is open and reachable from external networks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-medium">•</span>
                    <span>For local or private network devices, please use the default IoTNet broker, or alternatively use your own broker by uploading your SSL certificates below.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use-custom-certificate"
                checked={useCustomCertificate}
                onChange={(e) => setUseCustomCertificate(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Label htmlFor="use-custom-certificate" className="text-sm font-medium">
                Use custom SSL certificate
              </Label>
            </div>
            
            {useCustomCertificate && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">SSL Certificate Files</CardTitle>
                    <CardDescription className="text-xs">
                      Upload your SSL certificate and private key files
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificate-file" className="text-sm font-medium">
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
          <Label htmlFor="broker-username">Username</Label>
          <Input 
            id="broker-username" 
            placeholder="Enter username" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="broker-password">Password</Label>
          <Input 
            id="broker-password" 
            placeholder="Enter password" 
            type="password"
          />
        </div>
      </div>
    </div>
  );
}
