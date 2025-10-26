/**
 * Utility functions for device-related logic
 */

export interface DeviceType {
  id: string
  name: string
  description?: string
}

/**
 * Filter device types based on search query
 */
export const filterDeviceTypes = (
  deviceTypes: DeviceType[],
  query: string
): DeviceType[] => {
  if (!query.trim()) return deviceTypes

  const lowerQuery = query.toLowerCase()
  return deviceTypes.filter(
    (device) =>
      device.name.toLowerCase().includes(lowerQuery) ||
      device.description?.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Validate chip ID format
 */
export const isValidChipId = (chipId: string): boolean => {
  // Basic validation - can be adjusted to the desired format
  return chipId.length >= 8 && /^[a-zA-Z0-9]+$/.test(chipId)
}

/**
 * Format chip ID for display
 */
export const formatChipId = (chipId: string): string => {
  // Format: XXXX-XXXX-XXXX
  return chipId.replace(/(.{4})/g, '$1-').slice(0, -1)
}

/**
 * Get status badge variant based on device status
 */
export const getDeviceStatusVariant = (
  status: string
): 'default' | 'secondary' | 'outline' | 'destructive' => {
  switch (status.toLowerCase()) {
    case 'online':
      return 'default'
    case 'offline':
      return 'secondary'
    case 'error':
      return 'destructive'
    default:
      return 'outline'
  }
}

/**
 * Get status color for display
 */
export const getDeviceStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'online':
      return 'text-green-500'
    case 'offline':
      return 'text-gray-500'
    case 'error':
      return 'text-red-500'
    default:
      return 'text-gray-400'
  }
}
