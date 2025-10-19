/**
 * Timezones API Response
 * Mock API response for available timezones in time-based triggers
 */

export const timezonesResponse = {
  success: true,
  code: 200,
  message: 'Timezones retrieved successfully',
  data: {
    timezones: [
      {
        id: 1,
        value: 'UTC',
        label: 'UTC',
        offset: '+0:00',
        description: 'Coordinated Universal Time',
      },
      {
        id: 2,
        value: 'GMT+1',
        label: 'GMT+1',
        offset: '+1:00',
        description: 'Central European Time',
      },
      {
        id: 3,
        value: 'GMT+2',
        label: 'GMT+2',
        offset: '+2:00',
        description: 'Eastern European Time',
      },
      {
        id: 4,
        value: 'GMT+7',
        label: 'GMT+7',
        offset: '+7:00',
        description: 'Indochina Time',
      },
      {
        id: 5,
        value: 'GMT+8',
        label: 'GMT+8',
        offset: '+8:00',
        description: 'China Standard Time',
      },
      {
        id: 6,
        value: 'GMT-5',
        label: 'GMT-5',
        offset: '-5:00',
        description: 'Eastern Standard Time',
      },
      {
        id: 7,
        value: 'GMT-8',
        label: 'GMT-8',
        offset: '-8:00',
        description: 'Pacific Standard Time',
      },
      {
        id: 8,
        value: 'EST',
        label: 'EST',
        offset: '-5:00',
        description: 'Eastern Standard Time',
      },
      {
        id: 9,
        value: 'CST',
        label: 'CST',
        offset: '-6:00',
        description: 'Central Standard Time',
      },
      {
        id: 10,
        value: 'MST',
        label: 'MST',
        offset: '-7:00',
        description: 'Mountain Standard Time',
      },
      {
        id: 11,
        value: 'PST',
        label: 'PST',
        offset: '-8:00',
        description: 'Pacific Standard Time',
      },
    ],
  },
  meta: {
    total: 11,
    timestamp: new Date().toISOString(),
  },
}

// Extract values for direct use in components
export const AUTOMATION_BUILDER_TIMEZONES =
  timezonesResponse.data.timezones.map((tz) => tz.value)
