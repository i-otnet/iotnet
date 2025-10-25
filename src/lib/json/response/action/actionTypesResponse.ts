/**
 * Action Types API Response
 * Mock API response for available action types in automation builder
 */

export const actionTypesResponse = {
  success: true,
  code: 200,
  message: 'Action types retrieved successfully',
  data: {
    actionTypes: [
      {
        id: 1,
        value: 'Turn On',
        label: 'Turn On',
        description: 'Turn on a device',
        icon: 'Power',
        requiresValue: false,
      },
      {
        id: 2,
        value: 'Turn Off',
        label: 'Turn Off',
        description: 'Turn off a device',
        icon: 'PowerOff',
        requiresValue: false,
      },
      {
        id: 3,
        value: 'Set Value',
        label: 'Set Value',
        description: 'Set a specific value for a device',
        icon: 'Sliders',
        requiresValue: true,
      },
      {
        id: 4,
        value: 'Send Notification',
        label: 'Send Notification',
        description: 'Send a notification message',
        icon: 'Bell',
        requiresValue: true,
      },
      {
        id: 5,
        value: 'Start Recording',
        label: 'Start Recording',
        description: 'Start recording on a camera or device',
        icon: 'Video',
        requiresValue: false,
      },
      {
        id: 6,
        value: 'Lock',
        label: 'Lock',
        description: 'Lock a smart lock device',
        icon: 'Lock',
        requiresValue: false,
      },
      {
        id: 7,
        value: 'Unlock',
        label: 'Unlock',
        description: 'Unlock a smart lock device',
        icon: 'Unlock',
        requiresValue: false,
      },
    ],
  },
  meta: {
    total: 7,
    timestamp: new Date().toISOString(),
  },
}

// Extract values for direct use in components
export const AUTOMATION_BUILDER_ACTION_TYPES =
  actionTypesResponse.data.actionTypes.map((type) => type.value)
