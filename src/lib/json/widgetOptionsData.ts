export interface WidgetOption {
  id: string
  title: string
  description: string
  icon: string // Icon name from lucide-react
}

export const WIDGET_OPTIONS: WidgetOption[] = [
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'Display numerical data with trends',
    icon: 'BarChart3',
  },
  {
    id: 'chart',
    title: 'Chart',
    description: 'Visualize data in line or bar charts',
    icon: 'LineChart',
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Toggle or trigger actions',
    icon: 'Square',
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'Control numerical values with a slider',
    icon: 'Sliders',
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Toggle between two states',
    icon: 'ToggleRight',
  },
  {
    id: 'gauge',
    title: 'Gauge',
    description: 'Display progress or level indicators',
    icon: 'Gauge',
  },
]
