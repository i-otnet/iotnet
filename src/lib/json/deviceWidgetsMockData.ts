import { WidgetOption } from './widgetOptionsData'

/**
 * Mock API response untuk device widgets
 * Simulasi fetch API untuk menampilkan widgets pada device detail page
 * Saat ini hanya berisi 1 widget: button
 */

export interface DeviceWidgetData {
  id: string
  widgetType: WidgetOption['id']
  name: string
  config: {
    virtualPin: string
    unit?: string
    minValue?: number
    maxValue?: number
    defaultValue?: boolean | number
  }
  size?: {
    cols: number
    rows: number
  }
}

export interface DeviceWidgetsResponse {
  success: boolean
  data: DeviceWidgetData[]
  message?: string
}

/**
 * Mock data untuk device widgets
 * Berisi 1 widget button untuk kontrol device
 */
export const mockDeviceWidgetsData: DeviceWidgetsResponse = {
  success: true,
  data: [
    {
      id: 'widget_button_001',
      widgetType: 'button',
      name: 'Power Control',
      config: {
        virtualPin: 'VP_1',
        unit: 'ON/OFF',
        defaultValue: false,
      },
      size: {
        cols: 1,
        rows: 1,
      },
    },
  ],
  message: 'Device widgets retrieved successfully',
}
