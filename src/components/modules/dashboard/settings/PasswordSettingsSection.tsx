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

export default function PasswordSettingsSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!')
      return
    }

    // TODO: Implement API call to change password

    // Reset form
    setPasswords({
      current: '',
      new: '',
      confirm: '',
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setPasswords({
      current: '',
      new: '',
      confirm: '',
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="pb-2">Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwords.current}
              onChange={(e) => handleChange('current', e.target.value)}
              placeholder="Enter current password"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwords.new}
              onChange={(e) => handleChange('new', e.target.value)}
              placeholder="Enter new password"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => handleChange('confirm', e.target.value)}
              placeholder="Confirm new password"
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="w-full sm:w-auto">
                Update Password
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
