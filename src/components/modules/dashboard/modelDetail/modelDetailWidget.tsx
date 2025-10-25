'use client'

import { Card } from '@/components/ui/card'
import ModelMetricsWidget from '@/components/modules/widgets/widgetModels/modelMetricsWidget'
import PerformanceChartWidget from '@/components/modules/widgets/widgetModels/performanceChartWidget'
import ConfusionMatrixWidget from '@/components/modules/widgets/widgetModels/confusionMatrixWidget'
import RocCurveWidget from '@/components/modules/widgets/widgetModels/rocCurveWidget'
import FeatureImportanceWidget from '@/components/modules/widgets/widgetModels/featureImportanceWidget'
import PredictionOutputWidget from '@/components/modules/widgets/widgetModels/predictionOutputWidget'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import type { ModelChartPin } from '@/lib/json/data/widget/modelWidgetsMockData'
import { mockModelWidgetsData } from '@/lib/json/data/widget/modelWidgetsMockData'
import type { ModelMetrics } from '@/lib/json/data/widget/modelWidgetsMockData'

interface ModelWidgetConfig {
  name: string
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
}

interface ModelDetailWidgetProps {
  widget: WidgetOption
  config?: Partial<ModelWidgetConfig>
}

export default function ModelDetailWidget(props: ModelDetailWidgetProps) {
  const { widget, config: propsConfig } = props

  const widgetData = mockModelWidgetsData.data.find(
    (w) => w.widgetType === widget.id
  )

  const mergedConfig: Partial<ModelWidgetConfig> = {
    ...((widgetData?.config as ModelWidgetConfig | undefined) || {}),
    ...((propsConfig as Partial<ModelWidgetConfig> | undefined) || {}),
  }

  const config = mergedConfig
  const renderWidget = () => {
    switch (widget.id) {
      case 'statistics': {
        const metrics: ModelMetrics | undefined = config.metrics
        return metrics ? (
          <ModelMetricsWidget
            accuracy={metrics.accuracy}
            precision={metrics.precision}
            recall={metrics.recall}
            f1Score={metrics.f1Score}
          />
        ) : null
      }
      case 'chart': {
        const chartData = config.chartData || []
        return <PerformanceChartWidget chartData={chartData} />
      }
      case 'confusion-matrix': {
        return config.matrixData && config.labels ? (
          <ConfusionMatrixWidget
            data={config.matrixData}
            labels={config.labels}
          />
        ) : null
      }
      case 'roc-curve': {
        return (
          <RocCurveWidget
            auc={config.auc || 0}
            rocCurveData={config.rocCurveData || []}
          />
        )
      }
      case 'feature-importance': {
        return config.features ? (
          <FeatureImportanceWidget features={config.features} />
        ) : null
      }
      case 'prediction-output': {
        return (
          <PredictionOutputWidget
            mainPrediction={config.mainPrediction}
            mainConfidence={config.mainConfidence}
            predictions={config.predictions}
          />
        )
      }
      default:
        return <div className="text-muted-foreground">Unknown widget type</div>
    }
  }

  return (
    <Card className="p-5 h-full flex flex-col border border-border shadow-md hover:shadow-lg transition-shadow">
      {/* Widget Header */}
      <div className="mb-4 pb-3 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">
              {config.name || widgetData?.name || widget.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Pin:{' '}
              {Array.isArray(config.virtualPin)
                ? config.virtualPin.map((p) => p.pin).join(', ')
                : config.virtualPin}
            </p>
          </div>
          <div className="px-2 py-1 bg-primary rounded text-xs font-semibold text-primary-foreground border border-primary">
            {widget.title}
          </div>
        </div>
      </div>

      {/* Widget Content */}
      <div className="flex-1 flex flex-col justify-start min-h-0">
        {renderWidget()}
      </div>

      {/* Widget Footer */}
      {config.currentValue !== undefined && (
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium">
            Last Value
          </p>
          <p className="text-lg font-bold text-primary mt-1">
            {config.currentValue}{' '}
            <span className="text-sm text-muted-foreground">
              {config.unit || ''}
            </span>
          </p>
        </div>
      )}
    </Card>
  )
}
