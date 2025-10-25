/**
 * Mock API response untuk model widgets
 * Simulasi fetch API untuk menampilkan widgets pada model detail page
 * Berisi berbagai tipe widget untuk visualisasi data model
 */

export interface ModelWidgetOption {
  id: string
  title: string
  description: string
  icon: string // Icon name from lucide-react
}

export interface ModelChartPin {
  pin: string
  color: string
  backgroundColor: string
}

export interface ModelWidgetData {
  id: string
  widgetType: ModelWidgetOption['id']
  name: string
  config: {
    virtualPin: string | ModelChartPin[]
    unit?: string
    minValue?: number
    maxValue?: number
    currentValue?: boolean | number | string
    metrics?: ModelMetrics
    chartData?: Array<{
      label: string
      accuracy: number
      precision: number
      recall: number
    }>
    matrixData?: {
      truePositive: number
      trueNegative: number
      falsePositive: number
      falseNegative: number
    }
    labels?: string[]
    auc?: number
    rocCurveData?: Array<{ fpr: number; tpr: number }>
    features?: Array<{ name: string; importance: number }>
    mainPrediction?: string
    mainConfidence?: number
    predictions?: { label: string; confidence: number }[]
    [key: string]: any
  }
  size?: {
    cols: number
  }
  layout?: {
    row: number
    col: number
  }
}
export interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

export interface ModelWidgetsResponse {
  success: boolean
  data: ModelWidgetData[]
  message?: string
}

/**
 * Mock data untuk model widgets
 * Berisi berbagai widget untuk menampilkan informasi dan metrik model
 * Hanya menggunakan widget types yang tersedia di MODEL_WIDGET_OPTIONS
 */
export const mockModelWidgetsData: ModelWidgetsResponse = {
  success: true,
  data: [
    {
      id: 'model_widget_metrics_001',
      widgetType: 'statistics',
      name: 'Model Metrics',
      config: {
        virtualPin: 'MP_0',
        unit: '%',
        minValue: 0,
        maxValue: 100,
        currentValue: 94.5,
        metrics: {
          accuracy: 0.945,
          precision: 0.923,
          recall: 0.961,
          f1Score: 0.942,
        },
      },
      size: {
        cols: 1,
      },
      layout: {
        row: 1,
        col: 1,
      },
    },
    {
      id: 'model_widget_performance_001',
      widgetType: 'chart',
      name: 'Model Performance History',
      config: {
        virtualPin: [
          {
            pin: 'ACCURACY',
            color: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            pin: 'PRECISION',
            color: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          },
          {
            pin: 'RECALL',
            color: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
          },
        ],
        unit: 'Score',
        chartData: [
          { label: 'Jan', accuracy: 0.93, precision: 0.91, recall: 0.95 },
          { label: 'Feb', accuracy: 0.94, precision: 0.92, recall: 0.96 },
          { label: 'Mar', accuracy: 0.945, precision: 0.923, recall: 0.961 },
        ],
      },
      size: {
        cols: 2,
      },
      layout: {
        row: 1,
        col: 2,
      },
    },
    {
      id: 'model_widget_confusion_001',
      widgetType: 'confusion-matrix',
      name: 'Confusion Matrix',
      config: {
        virtualPin: 'MP_1',
        unit: 'Count',
        matrixData: {
          truePositive: 245,
          trueNegative: 189,
          falsePositive: 12,
          falseNegative: 18,
        },
        labels: ['Positive', 'Negative'],
      },
      size: {
        cols: 1,
      },
      layout: {
        row: 2,
        col: 1,
      },
    },
    {
      id: 'model_widget_roc_001',
      widgetType: 'roc-curve',
      name: 'ROC Curve',
      config: {
        virtualPin: 'MP_2',
        unit: 'Score',
        auc: 0.945,
        rocCurveData: [
          { fpr: 0.0, tpr: 0.0 },
          { fpr: 0.1, tpr: 0.6 },
          { fpr: 0.2, tpr: 0.75 },
          { fpr: 0.3, tpr: 0.85 },
          { fpr: 0.4, tpr: 0.92 },
          { fpr: 0.5, tpr: 0.97 },
          { fpr: 1.0, tpr: 1.0 },
        ],
      },
      size: {
        cols: 1,
      },
      layout: {
        row: 2,
        col: 2,
      },
    },
    {
      id: 'model_widget_feature_001',
      widgetType: 'feature-importance',
      name: 'Feature Importance',
      config: {
        virtualPin: 'MP_3',
        unit: 'Importance',
        features: [
          { name: 'Temperature', importance: 0.28 },
          { name: 'Humidity', importance: 0.24 },
          { name: 'Pressure', importance: 0.18 },
          { name: 'Timestamp', importance: 0.15 },
          { name: 'Device ID', importance: 0.15 },
        ],
      },
      size: {
        cols: 2,
      },
      layout: {
        row: 2,
        col: 3,
      },
    },
    {
      id: 'model_widget_prediction_001',
      widgetType: 'prediction-output',
      name: 'Prediction Output',
      config: {
        virtualPin: 'MP_4',
        unit: 'Confidence',
        currentValue: 0.92,
        mainPrediction: 'Anomaly Detected',
        mainConfidence: 0.92,
        predictions: [
          { label: 'Normal', confidence: 0.08 },
          { label: 'Warning', confidence: 0.05 },
        ],
      },
      size: {
        cols: 2,
      },
      layout: {
        row: 3,
        col: 1,
      },
    },
  ],
  message: 'Model widgets retrieved successfully',
}
