/**
 * Operators API Response
 * Mock API response for available operators in sensor-based triggers
 */

export const operatorsResponse = {
  success: true,
  code: 200,
  message: 'Operators retrieved successfully',
  data: {
    operators: [
      {
        id: 1,
        value: '=',
        label: 'Equals',
        description: 'Value equals the specified amount',
        symbol: '=',
      },
      {
        id: 2,
        value: '>',
        label: 'Greater than',
        description: 'Value is greater than the specified amount',
        symbol: '>',
      },
      {
        id: 3,
        value: '<',
        label: 'Less than',
        description: 'Value is less than the specified amount',
        symbol: '<',
      },
      {
        id: 4,
        value: '>=',
        label: 'Greater than or equal',
        description: 'Value is greater than or equal to the specified amount',
        symbol: '>=',
      },
      {
        id: 5,
        value: '<=',
        label: 'Less than or equal',
        description: 'Value is less than or equal to the specified amount',
        symbol: '<=',
      },
      {
        id: 6,
        value: '!=',
        label: 'Not equal',
        description: 'Value is not equal to the specified amount',
        symbol: '!=',
      },
      {
        id: 7,
        value: 'changes',
        label: 'Changes',
        description: 'Value changes from previous state',
        symbol: '≠',
      },
    ],
  },
  meta: {
    total: 7,
    timestamp: new Date().toISOString(),
  },
}

// Extract values for direct use in components
export const AUTOMATION_BUILDER_OPERATORS =
  operatorsResponse.data.operators.map((op) => op.value)
