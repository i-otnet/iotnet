/**
 * Validation utility functions
 * Centralized validation logic yang sering digunakan
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export const isValidPassword = (
  password: string
): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate required fields
 */
export const validateRequiredFields = (
  data: Record<string, string>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(
    (field) => !data[field] || data[field].toString().trim() === ''
  )

  return {
    isValid: missingFields.length === 0,
    missingFields,
  }
}

/**
 * Validate MQTT broker URL format
 */
export const isValidMqttUrl = (url: string): boolean => {
  const mqttRegex = /^(mqtt|mqtts|ws|wss):\/\/.+/
  return mqttRegex.test(url)
}

/**
 * Validate port number
 */
export const isValidPort = (port: number | string): boolean => {
  const portNum = typeof port === 'string' ? parseInt(port, 10) : port
  return !isNaN(portNum) && portNum > 0 && portNum <= 65535
}

/**
 * Validate IP address format
 */
export const isValidIpAddress = (ip: string): boolean => {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}
