/**
 * Event Types API Response
 * Mock API response for available event types in event-based triggers
 */

export const eventTypesResponse = {
  success: true,
  code: 200,
  message: 'Event types retrieved successfully',
  data: {
    eventTypes: [
      {
        id: 1,
        value: 'device-online',
        label: 'Device Online',
        description: 'Triggered when a device comes online',
        icon: 'Wifi',
      },
      {
        id: 2,
        value: 'device-offline',
        label: 'Device Offline',
        description: 'Triggered when a device goes offline',
        icon: 'WifiOff',
      },
      {
        id: 3,
        value: 'connection-lost',
        label: 'Connection Lost',
        description: 'Triggered when connection to device is lost',
        icon: 'AlertTriangle',
      },
      {
        id: 4,
        value: 'threshold-exceeded',
        label: 'Threshold Exceeded',
        description: 'Triggered when sensor value exceeds threshold',
        icon: 'TrendingUp',
      },
    ],
  },
  meta: {
    total: 4,
    timestamp: new Date().toISOString(),
  },
}

// Extract for direct use in components (maintaining {value, label} format)
export const AUTOMATION_BUILDER_EVENT_TYPES =
  eventTypesResponse.data.eventTypes.map((event) => ({
    value: event.value,
    label: event.label,
  }))
