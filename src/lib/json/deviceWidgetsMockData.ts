import { WidgetOption } from './widgetOptionsData'

/**
 * Mock API response untuk device widgets
 * Simulasi fetch API untuk menampilkan widgets pada device detail page
 * Saat ini hanya berisi 1 widget: button
 */

export interface ChartPin {
  pin: string
  color: string
  backgroundColor: string
}

export interface DeviceWidgetData {
  id: string
  widgetType: WidgetOption['id']
  name: string
  config: {
    virtualPin: string | ChartPin[] // Single pin or multiple pins for chart
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
 * Berisi beberapa widget default yang ditampilkan pada device detail page
 */
export const mockDeviceWidgetsData: DeviceWidgetsResponse = {
  success: true,
  data: [
    {
      id: 'widget_statistics_001',
      widgetType: 'statistics',
      name: 'Temperature Reading',
      config: {
        virtualPin: 'VP_0',
        unit: '°C',
        minValue: 0,
        maxValue: 50,
      },
      size: {
        cols: 2,
        rows: 1,
      },
    },
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
    {
      id: 'widget_switch_001',
      widgetType: 'switch',
      name: 'Device Status',
      config: {
        virtualPin: 'VP_2',
        unit: 'Status',
        defaultValue: true,
      },
      size: {
        cols: 1,
        rows: 1,
      },
    },
    {
      id: 'widget_gauge_001',
      widgetType: 'gauge',
      name: 'Humidity Level',
      config: {
        virtualPin: 'VP_3',
        unit: '%',
        minValue: 0,
        maxValue: 100,
      },
      size: {
        cols: 2,
        rows: 1,
      },
    },
    {
      id: 'widget_chart_001',
      widgetType: 'chart',
      name: 'Sensor Data History',
      config: {
        virtualPin: [
          {
            pin: 'V1',
            color: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            pin: 'V2',
            color: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          },
          {
            pin: 'V3',
            color: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
          },
        ],
        unit: 'Reading',
      },
      size: {
        cols: 4,
        rows: 2,
      },
    },
    {
      id: 'widget_slider_001',
      widgetType: 'slider',
      name: 'Brightness Control',
      config: {
        virtualPin: 'VP_5',
        unit: '%',
        minValue: 0,
        maxValue: 100,
        defaultValue: 50,
      },
      size: {
        cols: 2,
        rows: 1,
      },
    },
  ],
  message: 'Device widgets retrieved successfully',
}
