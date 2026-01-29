// Export all mock data from centralized JSON files

// Device
export { mockDevicesData } from './data/device/devicesData'
export { mockDeviceTypesData } from './response/device/deviceTypesResponse'

// Model
export { mockModelsData } from './data/model/modelsData'

// Automation
export { mockAutomationsData } from './data/automation/automationsData'
export {
  AUTOMATION_BUILDER_DEVICES,
  AUTOMATION_BUILDER_MODELS,
} from './data/automation/automationsData'

// Users
export { mockUsersData, mockUsersOverviewData } from './data/user/usersData'

// Dashboard
export {
  mockDashboardOverviewData,
  mockRecentActivityData,
} from './data/dashboard/dashboardData'

// Settings
export { mockApiKeysData, mockProfileData } from './data/settings/settingsData'

// Widgets
export {
  WIDGET_OPTIONS,
  DEVICE_WIDGET_OPTIONS,
  MODEL_WIDGET_OPTIONS,
  type WidgetOption,
} from './data/widget/widgetOptionsData'

export {
  mockDeviceWidgetsData,
  type DeviceWidgetData,
  type DeviceWidgetsResponse,
  type ChartPin,
} from './data/widget/deviceWidgetsMockData'

export { mockChartData } from './data/widget/mockChartData'

// Shared
export { iconsData, iconMap } from './data/shared/iconsData'

// Response exports - automation builders
export { AUTOMATION_BUILDER_TRIGGER_TYPES } from './response/trigger/triggerTypesResponse'
export { AUTOMATION_BUILDER_OPERATORS } from './response/operator/operatorsResponse'
export { AUTOMATION_BUILDER_ACTION_TYPES } from './response/action/actionTypesResponse'
export { AUTOMATION_BUILDER_EVENT_TYPES } from './response/event/eventTypesResponse'
export { AUTOMATION_BUILDER_TIMEZONES } from './response/timezone/timezonesResponse'
export { AUTOMATION_BUILDER_ICONS } from './response/automation/automationIconsResponse'
export { VIRTUAL_PINS } from './data/shared/virtualPinsData'

// Response exports - raw response objects
export { actionTypesResponse } from './response/action/actionTypesResponse'
export { automationIconsResponse } from './response/automation/automationIconsResponse'
export { eventTypesResponse } from './response/event/eventTypesResponse'
export { operatorsResponse } from './response/operator/operatorsResponse'
export { timezonesResponse } from './response/timezone/timezonesResponse'
export { triggerTypesResponse } from './response/trigger/triggerTypesResponse'
export { virtualPinsResponse } from './response/virtualPin/virtualPinsResponse'
