export interface WidgetOption {
  id: string
  title: string
  description: string
  icon: string // Icon name from lucide-react
}

// Device widgets - for IoT hardware monitoring and control
export const DEVICE_WIDGET_OPTIONS: WidgetOption[] = [
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'Display sensor data with real-time trends',
    icon: 'BarChart3',
  },
  {
    id: 'chart',
    title: 'Chart',
    description: 'Visualize device sensor data over time',
    icon: 'LineChart',
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Toggle or trigger device actions',
    icon: 'Square',
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'Control numerical values (brightness, temperature, etc)',
    icon: 'Sliders',
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Toggle device on/off state',
    icon: 'ToggleRight',
  },
  {
    id: 'gauge',
    title: 'Gauge',
    description: 'Display sensor readings or device status',
    icon: 'Gauge',
  },
]

// Model widgets - for ML model performance and predictions
export const MODEL_WIDGET_OPTIONS: WidgetOption[] = [
  {
    id: 'statistics',
    title: 'Model Metrics',
    description: 'Display accuracy, precision, recall metrics',
    icon: 'BarChart3',
  },
  {
    id: 'chart',
    title: 'Performance Chart',
    description: 'Visualize model predictions and actual values',
    icon: 'LineChart',
  },
  {
    id: 'confusion-matrix',
    title: 'Confusion Matrix',
    description: 'Classification model performance matrix',
    icon: 'Grid3X3',
  },
  {
    id: 'roc-curve',
    title: 'ROC Curve',
    description: 'Model classification performance curve',
    icon: 'TrendingUp',
  },
  {
    id: 'feature-importance',
    title: 'Feature Importance',
    description: 'Top contributing features in predictions',
    icon: 'Zap',
  },
  {
    id: 'prediction-output',
    title: 'Prediction Output',
    description: 'Display model predictions and confidence scores',
    icon: 'Brain',
  },
]

// Default export for backward compatibility
export const WIDGET_OPTIONS = DEVICE_WIDGET_OPTIONS
