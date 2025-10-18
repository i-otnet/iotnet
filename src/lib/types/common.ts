/**
 * Common types yang digunakan di berbagai komponen
 */

export interface BaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack?: () => void
}

export interface Device {
  id: number
  name: string
  type: string
  status: string
  location: string
  lastSeen: string
  icon: React.ComponentType<{ className?: string }>
  firmwareVersion: string
  chipId: string
}

export interface DeviceData {
  name: string
  type: string
  location: string
  chipId: string
  status: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  brokerType: 'iotnet' | 'personal' | 'external'
  brokerName: string
  status: string
  lastActive: string
  joinDate: string
  deviceCount: number
  avatar: string
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type StatusType = 'online' | 'offline' | 'error' | 'idle'

export interface FormError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FormError[]
}
