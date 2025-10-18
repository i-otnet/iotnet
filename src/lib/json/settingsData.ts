export const mockApiKeysData = {
  success: true,
  code: 200,
  message: 'API keys data retrieved successfully',
  data: {
    apiKeys: [
      {
        id: '1',
        name: 'Production API Key',
        key: 'iotnet_pk_1234567890abcdefghijklmnopqrstuvwxyz',
        createdAt: '2024-01-15',
        lastUsed: '2024-10-15',
        status: 'active' as const,
      },
      {
        id: '2',
        name: 'Development API Key',
        key: 'iotnet_pk_abcdefghijklmnopqrstuvwxyz1234567890',
        createdAt: '2024-02-20',
        lastUsed: '2024-10-10',
        status: 'active' as const,
      },
    ],
  },
  meta: {
    total: 2,
  },
  timestamp: new Date().toISOString(),
}

export const mockProfileData = {
  success: true,
  code: 200,
  message: 'Profile data retrieved successfully',
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    phone: '+62 812 3456 7890',
    organization: 'IoTNet Inc.',
  },
  timestamp: new Date().toISOString(),
}
