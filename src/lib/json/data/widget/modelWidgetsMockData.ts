export interface ModelWidgetOption {
  id: string
  title: string
  description: string
  icon: string
}

export interface ModelWidgetData {
  id: string
  widgetType: ModelWidgetOption['id']
  name: string
  config: {
    // virtualPin removed for model widgets; config holds widget-specific properties
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
    [key: string]: unknown
  }
  size?: {
    cols: number
  }
  layout?: {
    row: number
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
 * Mock data for model widgets
 * Contains various widgets to display model information and metrics
 * Only uses widget types available in MODEL_WIDGET_OPTIONS
 */
export const mockModelWidgetsData: ModelWidgetsResponse = {
  success: true,
  data: [
    {
      id: 'model_widget_metrics_001',
      widgetType: 'statistics',
      name: 'Model Metrics',
      config: {
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
        cols: 4,
      },
      layout: {
        row: 1,
      },
    },
    {
      id: 'model_widget_performance_001',
      widgetType: 'chart',
      name: 'Model Performance History',
      config: {
        unit: 'Score',
        chartData: [
          { label: 'Jan', accuracy: 0.93, precision: 0.91, recall: 0.95 },
          { label: 'Feb', accuracy: 0.94, precision: 0.92, recall: 0.96 },
          { label: 'Mar', accuracy: 0.945, precision: 0.923, recall: 0.961 },
        ],
      },
      size: {
        cols: 4,
      },
      layout: {
        row: 2,
      },
    },
    {
      id: 'model_widget_confusion_001',
      widgetType: 'confusion-matrix',
      name: 'Confusion Matrix',
      config: {
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
        cols: 4,
      },
      layout: {
        row: 3,
      },
    },
    {
      id: 'model_widget_feature_001',
      widgetType: 'feature-importance',
      name: 'Feature Importance',
      config: {
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
        cols: 4,
      },
      layout: {
        row: 5,
      },
    },
    {
      id: 'model_widget_prediction_001',
      widgetType: 'prediction-output',
      name: 'Prediction Output',
      config: {
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
        cols: 4,
      },
      layout: {
        row: 6,
      },
    },
    {
      id: 'model_widget_description_001',
      widgetType: 'description',
      name: 'Model Description',
      config: {
        title: 'Model Overview',
        description: `## Model Overview

This model detects anomalies from sensor telemetry using a supervised learning approach.

### Key points
- Trained on multi-sensor time-series data
- Validated with cross-validation, achieved high F1 score

### Usage
Provide device sensor streams to the model endpoint. The widget shows an overview and important notes.

### Notes
- Retrain periodically with new labeled data
- Watch out for data drift and feature distribution changes
`,
      },
      size: {
        cols: 4,
      },
      layout: {
        row: 7,
      },
    },
  ],
  message: 'Model widgets retrieved successfully',
}
