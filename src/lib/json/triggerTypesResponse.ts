/**
 * Trigger Types API Response
 * Mock API response for available trigger types in automation builder
 */

export const triggerTypesResponse = {
  success: true,
  code: 200,
  message: 'Trigger types retrieved successfully',
  data: {
    triggerTypes: [
      {
        id: 1,
        value: 'Time-based',
        label: 'Time-based',
        description: 'Trigger automation at specific times or intervals',
        icon: 'Clock',
      },
      {
        id: 2,
        value: 'Sensor-based',
        label: 'Sensor-based',
        description: 'Trigger automation based on sensor data conditions',
        icon: 'Cpu',
      },
      {
        id: 3,
        value: 'Event-based',
        label: 'Event-based',
        description: 'Trigger automation when specific events occur',
        icon: 'Zap',
      },
    ],
  },
  meta: {
    total: 3,
    timestamp: new Date().toISOString(),
  },
}

// Extract values for direct use in components
export const AUTOMATION_BUILDER_TRIGGER_TYPES =
  triggerTypesResponse.data.triggerTypes.map((type) => type.value)
