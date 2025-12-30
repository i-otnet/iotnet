/**
 * Utility functions for generating secure credentials
 */

/**
 * Generate a UUID v4 string
 * @returns UUID v4 string (36 characters)
 */
export function generateUUID(): string {
  // Use cryptographically secure random values to generate an RFC 4122 v4 UUID
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)

  // Per RFC 4122: set version (4) and variant (10xx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const byteToHex: string[] = []
  for (let i = 0; i < 256; i++) {
    byteToHex[i] = i.toString(16).padStart(2, '0')
  }

  return (
    byteToHex[bytes[0]] +
    byteToHex[bytes[1]] +
    byteToHex[bytes[2]] +
    byteToHex[bytes[3]] +
    '-' +
    byteToHex[bytes[4]] +
    byteToHex[bytes[5]] +
    '-' +
    byteToHex[bytes[6]] +
    byteToHex[bytes[7]] +
    '-' +
    byteToHex[bytes[8]] +
    byteToHex[bytes[9]] +
    '-' +
    byteToHex[bytes[10]] +
    byteToHex[bytes[11]] +
    byteToHex[bytes[12]] +
    byteToHex[bytes[13]] +
    byteToHex[bytes[14]] +
    byteToHex[bytes[15]]
  )
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
