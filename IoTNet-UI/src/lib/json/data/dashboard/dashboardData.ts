export const mockDashboardOverviewData = {
  success: true,
  code: 200,
  message: 'Dashboard overview data retrieved successfully',
  data: {
    totalDevices: 2847,
    totalUsers: 156,
    totalModels: 847,
    totalAutomations: 234,
    monthlyGrowth: {
      devices: 12.3,
      users: 8.7,
      models: 25.4,
      automations: 15.2,
    },
    recentStats: {
      devicesOnline: 2234,
      activeUsers: 89,
      runningAutomations: 187,
      dataPointsToday: '45.2K',
    },
  },
  timestamp: new Date().toISOString(),
}

export const mockRecentActivityData = {
  success: true,
  code: 200,
  message: 'Recent activity data retrieved successfully',
  data: {
    activities: [
      {
        id: 1,
        action: 'New device registered',
        details: 'Temperature Sensor #47',
        time: '2 minutes ago',
        type: 'device',
      },
      {
        id: 2,
        action: 'Model deployed',
        details: 'Temperature Prediction Model',
        time: '15 minutes ago',
        type: 'model',
      },
      {
        id: 3,
        action: 'User invited',
        details: 'john.doe@company.com',
        time: '1 hour ago',
        type: 'user',
      },
      {
        id: 4,
        action: 'Automation triggered',
        details: 'Temperature Alert Rule',
        time: '2 hours ago',
        type: 'automation',
      },
      {
        id: 5,
        action: 'Data backup completed',
        details: 'Weekly System Backup',
        time: '3 hours ago',
        type: 'system',
      },
    ],
  },
  meta: {
    total: 5,
    limit: 5,
  },
  timestamp: new Date().toISOString(),
}
