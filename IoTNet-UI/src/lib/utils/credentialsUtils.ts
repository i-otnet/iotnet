/**
 * Utility functions for generating secure credentials
 */

/**
 * Generate a UUID v4 string
 * @returns UUID v4 string (36 characters)
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generate a secure hash-like password using crypto random values
 * @returns 64-character hexadecimal hash string
 */
export function generateHashPassword(): string {
  const randomBytes = new Uint8Array(32)
  crypto.getRandomValues(randomBytes)
  const hashArray = Array.from(randomBytes)
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Generate secure credentials for MQTT user
 * @returns Object with username (UUID) and password (hash)
 */
export function generateCredentials(): {
  username: string
  password: string
} {
  return {
    username: generateUUID(),
    password: generateHashPassword(),
  }
}
