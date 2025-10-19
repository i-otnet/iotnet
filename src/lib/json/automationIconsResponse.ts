/**
 * Automation Icons API Response
 * Mock API response for available icons in automation builder
 */

export const automationIconsResponse = {
  success: true,
  code: 200,
  message: 'Automation icons retrieved successfully',
  data: {
    icons: [
      {
        id: 1,
        name: 'Sun',
        category: 'automation',
        description: 'Morning/day based automations',
      },
      {
        id: 2,
        name: 'Thermometer',
        category: 'automation',
        description: 'Temperature related automations',
      },
      {
        id: 3,
        name: 'Lock',
        category: 'automation',
        description: 'Security and lock automations',
      },
      {
        id: 4,
        name: 'CloudRain',
        category: 'automation',
        description: 'Weather and humidity automations',
      },
      {
        id: 5,
        name: 'Fan',
        category: 'automation',
        description: 'Ventilation and cooling automations',
      },
      {
        id: 6,
        name: 'Bell',
        category: 'automation',
        description: 'Alert and notification automations',
      },
      {
        id: 7,
        name: 'Timer',
        category: 'automation',
        description: 'Time-based automations',
      },
      {
        id: 8,
        name: 'Zap',
        category: 'automation',
        description: 'Energy and power automations',
      },
    ],
  },
  meta: {
    total: 8,
    timestamp: new Date().toISOString(),
  },
}

// Extract icon names for direct use in components
export const AUTOMATION_BUILDER_ICONS = automationIconsResponse.data.icons.map(
  (icon) => icon.name
)
