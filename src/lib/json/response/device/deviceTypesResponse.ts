import {
  Smartphone,
  Router,
  Lightbulb,
  Shield,
  Camera,
  Activity,
  Cpu,
  Settings,
} from 'lucide-react'

export const mockDeviceTypesData = {
  success: true,
  code: 200,
  message: 'Device types retrieved successfully',
  data: {
    deviceTypes: [
      // ESP32 SoC Variants (Main Series)
      {
        name: 'ESP32 (Original)',
        category: 'microcontroller',
        disabled: false,
      },
      { name: 'ESP32-S2', category: 'microcontroller', disabled: false },
      { name: 'ESP32-S3', category: 'microcontroller', disabled: false },
      { name: 'ESP32-C3', category: 'microcontroller', disabled: false },
      { name: 'ESP32-C6', category: 'microcontroller', disabled: false },
      { name: 'ESP32-H2', category: 'microcontroller', disabled: false },
      { name: 'ESP32-P4', category: 'microcontroller', disabled: false },

      // ESP32 Development Boards
      { name: 'ESP32 DevKit', category: 'microcontroller', disabled: false },
      { name: 'ESP32-S2 Saola', category: 'microcontroller', disabled: false },
      { name: 'ESP32-S3 DevKit', category: 'microcontroller', disabled: false },
      { name: 'ESP32-S3-Box', category: 'microcontroller', disabled: false },
      { name: 'ESP32-C3 DevKit', category: 'microcontroller', disabled: false },
      { name: 'ESP32-C6 DevKit', category: 'microcontroller', disabled: false },

      // ESP8266 SoC Variants
      {
        name: 'ESP8266 (Original)',
        category: 'microcontroller',
        disabled: false,
      },
      { name: 'ESP8266EX', category: 'microcontroller', disabled: false },

      // ESP8266 Development Boards
      { name: 'ESP8266 NodeMCU', category: 'microcontroller', disabled: false },
      { name: 'Wemos D1 Mini', category: 'microcontroller', disabled: false },
      {
        name: 'Wemos D1 Mini Pro',
        category: 'microcontroller',
        disabled: false,
      },
      { name: 'Wemos D1 R32', category: 'microcontroller', disabled: false },
      { name: 'ESP8266-12E', category: 'microcontroller', disabled: false },
      { name: 'ESP8266-12F', category: 'microcontroller', disabled: false },

      // Coming Soon - Other Platforms
      { name: 'Raspberry Pi', category: 'mini-computer', disabled: true },
      { name: 'Orange Pi', category: 'mini-computer', disabled: true },
    ],
  },
  meta: {
    totalDeviceTypes: 25,
    enabledDeviceTypes: 23,
    timestamp: new Date().toISOString(),
  },
  timestamp: new Date().toISOString(),
}

// Re-export deprecated for backward compatibility (will be removed)
export const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Smartphone,
  Router,
  Lightbulb,
  Shield,
  Camera,
  Activity,
  Cpu,
  Settings,
}
