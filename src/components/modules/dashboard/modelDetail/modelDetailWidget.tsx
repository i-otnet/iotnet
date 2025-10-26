'use client'

import { Card } from '@/components/ui/card'
import ModelMetricsWidget from '@/components/modules/widgets/widgetModels/modelMetricsWidget'
import PerformanceChartWidget from '@/components/modules/widgets/widgetModels/performanceChartWidget'
import ConfusionMatrixWidget from '@/components/modules/widgets/widgetModels/confusionMatrixWidget'
import FeatureImportanceWidget from '@/components/modules/widgets/widgetModels/featureImportanceWidget'
import PredictionOutputWidget from '@/components/modules/widgets/widgetModels/predictionOutputWidget'
import DescriptionWidget from '@/components/modules/widgets/widgetModels/descriptionWidget'
import { WidgetOption } from '@/lib/json/data/widget/widgetOptionsData'
import { mockModelWidgetsData } from '@/lib/json/data/widget/modelWidgetsMockData'
import type { ModelMetrics } from '@/lib/json/data/widget/modelWidgetsMockData'
import { useState, useRef, useEffect } from 'react'
import ResizeLineIndicator from '@/components/shared/resizeLineIndicator'
import WidgetControls from '@/components/shared/widgetControls'
import DragPlaceholder from '@/components/shared/dragPlaceholder'
import {
  getWidgetBorderStyle,
  getWidgetResizeConstraints,
  getWidgetDefaultSize,
} from '@/lib/utils/widgetUtils'
import { useWidgetResize, type WidgetSize } from '@/lib/hooks/useWidgetResize'
import { useWidgetDrag, type WidgetPosition } from '@/lib/hooks/useWidgetDrag'

interface ModelWidgetConfig {
  name: string
  unit?: string
  minValue?: number
  maxValue?: number
  currentValue?: boolean | number | string
  title?: string
  description?: string
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
  // rocCurveData removed: ROC curve widget has been removed from model widgets
  features?: Array<{ name: string; importance: number }>
  mainPrediction?: string
  mainConfidence?: number
  predictions?: { label: string; confidence: number }[]
}

interface ModelDetailWidgetProps {
  widget: WidgetOption
  config?: Partial<ModelWidgetConfig>
  isEditing?: boolean
  isSelected?: boolean
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onSizeChange?: (size: WidgetSize) => void
  onPositionChange?: (position: WidgetPosition) => void
  initialSize?: WidgetSize
  initialPosition?: { row: number; col: number }
}

export default function ModelDetailWidget(props: ModelDetailWidgetProps) {
  const {
    widget,
    config: propsConfig,
    isEditing = false,
    isSelected = false,
    onSelect,
    onEdit,
    onDelete,
    onSizeChange,
    onPositionChange,
    initialSize,
    initialPosition = { row: 1, col: 1 },
  } = props

  const [resizeLineX, setResizeLineX] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
      // 'roc-curve' widget removed
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
      case 'description': {
        return (
          <DescriptionWidget
            title={config.title}
            description={config.description}
          />
        )
      }
      default:
        return <div className="text-muted-foreground">Unknown widget type</div>
    }
  }

  // --- Resize & Drag setup ---
  const constraints = getWidgetResizeConstraints(widget.id)
  const defaultSize = getWidgetDefaultSize(widget.id, 'model')
  const fixedRows = initialSize?.rows ?? 1

  const {
    isResizing,
    handleResizeStart,
    attachResizeListeners,
    detachResizeListeners,
  } = useWidgetResize({
    initialSize: initialSize || { cols: defaultSize, rows: fixedRows },
    minSize: { cols: constraints.minCols, rows: fixedRows },
    maxSize: { cols: constraints.maxCols, rows: fixedRows },
    gridColumns: 4,
    onResize: (newSize) => {
      onSizeChange?.({ cols: newSize.cols, rows: fixedRows })
    },
    onResizeMove: (clientX) => {
      setResizeLineX(clientX)
    },
  })

  const {
    isDragging,
    dragOffset,
    dragSize,
    handleDragStart,
    attachDragListeners,
    detachDragListeners,
  } = useWidgetDrag({
    initialPosition: { col: initialPosition.col, row: initialPosition.row },
    gridColumns: 4,
    onDrag: (newPosition) => {
      onPositionChange?.(newPosition)
    },
  })

  useEffect(() => {
    if (isResizing) {
      attachResizeListeners()
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      return () => {
        detachResizeListeners()
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    } else {
      setResizeLineX(null)
    }
  }, [isResizing, attachResizeListeners, detachResizeListeners])

  useEffect(() => {
    if (isDragging) {
      attachDragListeners()
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      return () => {
        detachDragListeners()
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    }
  }, [isDragging, attachDragListeners, detachDragListeners])

  const handleCardClick = () => {
    if (isEditing && onSelect) {
      onSelect()
    }
  }

  const borderStyle = getWidgetBorderStyle(isEditing, isSelected)

  return (
    <>
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 ease-out ${
          isDragging ? 'opacity-100 z-0' : 'opacity-100 z-0'
        }`}
        style={{
          gridColumn: `span 4`,
          userSelect: isResizing ? 'none' : 'auto',
          transform: 'translate(0, 0)',
        }}
        data-widget-container="true"
      >
        {isDragging ? (
          <DragPlaceholder
            name={config.name || widget.title}
            isDragging={false}
          />
        ) : (
          <Card
            className={`p-5 relative ${borderStyle} h-full flex flex-col transition-shadow border border-border shadow-md hover:shadow-lg`}
            onClick={handleCardClick}
            onKeyDown={(e) => {
              if (isEditing && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                handleCardClick()
              }
            }}
            role={isEditing ? 'button' : undefined}
            tabIndex={isEditing ? 0 : -1}
          >
            <WidgetControls
              widgetId={widget.id}
              isDragging={isDragging}
              isSelected={isSelected}
              isEditing={isEditing}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (containerRef.current) {
                  handleDragStart(e, containerRef.current)
                }
              }}
              onResizeStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const direction = 'se'
                if (containerRef.current) {
                  handleResizeStart(e, direction, containerRef.current)
                }
              }}
            />

            {/* Widget Header */}
            <div className="pt-6 pb-2 border-b border-border">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground">
                    {config.name || widgetData?.name || widget.title}
                  </h3>
                  {/* virtualPin removed for model widgets */}
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
        )}
      </div>

      {/* Global Resize Line Indicator */}
      <ResizeLineIndicator lineX={resizeLineX} isVisible={isResizing} />

      {/* Drag Overlay Ghost */}
      {isDragging && dragSize.width > 0 && dragSize.height > 0 && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${dragOffset.x}px`,
            top: `${dragOffset.y}px`,
            width: `${dragSize.width}px`,
            height: `${dragSize.height}px`,
          }}
        >
          <Card
            className={`p-5 relative ${borderStyle} shadow-lg ring-2 ring-primary opacity-80 h-full flex flex-col`}
          >
            <WidgetControls
              widgetId={widget.id}
              isDragging={isDragging}
              isSelected={isSelected}
              isEditing={isEditing}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onResizeStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />

            {/* Widget Header */}
            <div className="pt-6 mb-4 pb-3 border-b border-border">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground">
                    {config.name || widgetData?.name || widget.title}
                  </h3>
                  {/* virtualPin removed for model widgets */}
                </div>
                <div className="px-2 py-1 bg-primary rounded text-xs font-semibold text-primary-foreground border border-primary">
                  {widget.title}
                </div>
              </div>
            </div>

            {/* Widget Content */}
            <div className="flex-1 pointer-events-none">{renderWidget()}</div>
          </Card>
        </div>
      )}
    </>
  )
}
