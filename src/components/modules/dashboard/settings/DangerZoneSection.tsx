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

export default function DangerZoneSection() {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = () => {
    if (confirmText !== 'DELETE MY ACCOUNT') {
      alert("Please type 'DELETE MY ACCOUNT' to confirm")
      return
    }

    setIsDeleting(true)

    // TODO: Implement API call to delete account

    setTimeout(() => {
      alert('Account deletion initiated. You will be logged out shortly.')
      setIsDeleting(false)
      // Redirect to login or home page
    }, 2000)
  }

  return (
    <Card className="border-red-500 dark:border-red-400">
      <CardHeader>
        <CardTitle className="text-red-600 dark:text-red-400">
          Danger Zone
        </CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {/* Delete Account Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm sm:text-base">
                Delete Account
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>

            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="text-xs sm:text-sm space-y-2">
                    <p className="font-medium">This will permanently delete:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
                      <li className="break-words">
                        Your account and profile information
                      </li>
                      <li className="break-words">
                        All connected devices and their data
                      </li>
                      <li className="break-words">
                        All automation rules and models
                      </li>
                      <li className="break-words">
                        MQTT broker configurations
                      </li>
                      <li className="break-words">
                        API keys and access tokens
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-delete"
                      className="text-xs sm:text-sm"
                    >
                      Type{' '}
                      <span className="font-mono font-bold text-xs sm:text-sm break-all">
                        DELETE MY ACCOUNT
                      </span>{' '}
                      to confirm
                    </Label>
                    <Input
                      id="confirm-delete"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="DELETE MY ACCOUNT"
                      className="border-red-300 dark:border-red-700 focus-visible:ring-red-500 text-xs sm:text-sm"
                    />
                  </div>

                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={confirmText !== 'DELETE MY ACCOUNT' || isDeleting}
                    className="w-full text-xs sm:text-sm"
                  >
                    {isDeleting ? 'Deleting Account...' : 'Delete My Account'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Data Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm sm:text-base">
                Export Your Data
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Download a copy of your data before deleting your account
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // TODO: Implement data export
                  alert('Data export will be sent to your email')
                }}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Export All Data
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  // TODO: Implement device data export
                  alert('Device data export will be sent to your email')
                }}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Export Device Data
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
