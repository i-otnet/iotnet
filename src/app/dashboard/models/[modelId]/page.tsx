'use client'

import { use, useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import ModelDetailOverviewSection from '@/components/modules/dashboard/modelDetail/modelDetailOverviewSection'
import ModelDetailGridSection from '@/components/modules/dashboard/modelDetail/modelDetailGridSection'
import ModelDetailHeader from '@/components/modules/dashboard/modelDetail/modelDetailHeader'
import ModelDetailWidget from '@/components/modules/dashboard/modelDetail/modelDetailWidget'
import RedirectPage from '@/components/shared/redirectPage'
import { mockModelsData } from '@/lib/json/data/model/modelsData'
import { mockModelWidgetsData } from '@/lib/json/data/widget/modelWidgetsMockData'
import {
  WidgetOption,
  MODEL_WIDGET_OPTIONS,
} from '@/lib/json/data/widget/widgetOptionsData'
import type { WidgetSize } from '@/lib/hooks/useWidgetResize'
import type { ModelWidgetData } from '@/lib/json/data/widget/modelWidgetsMockData'

interface SavedModelWidget {
  id: string
  widget: WidgetOption
  config: {
    name: string
    // virtualPin removed for model widgets
    unit?: string
    minValue?: number
    maxValue?: number
    currentValue?: boolean | number | string
  }
  size?: WidgetSize
  layout?: ModelWidgetData['layout']
}

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ modelId: string }>
}) {
  const { modelId } = use(params)
  const model = mockModelsData.data.models.find(
    (m) => m.id === parseInt(modelId)
  )

  const [widgets, setWidgets] = useState<SavedModelWidget[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
  const [editingWidget, setEditingWidget] = useState<SavedModelWidget | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with delay for redirect effect
    const timer = setTimeout(() => {
      // Load widgets from mock data after model is loaded
      if (
        mockModelWidgetsData.success &&
        mockModelWidgetsData.data.length > 0
      ) {
        const loadedWidgets = mockModelWidgetsData.data.map((widgetData) => {
          // Find the widget option from MODEL_WIDGET_OPTIONS
          const widgetOption = MODEL_WIDGET_OPTIONS.find(
            (w) => w.id === widgetData.widgetType
          )

          if (!widgetOption) {
            throw new Error(`Widget type not found: ${widgetData.widgetType}`)
          }

          return {
            id: widgetData.id,
            widget: widgetOption,
            config: {
              name: widgetData.name,
              unit: widgetData.config.unit,
              minValue: widgetData.config.minValue,
              maxValue: widgetData.config.maxValue,
              currentValue: widgetData.config.currentValue,
              // virtualPin removed
            },
            size: widgetData.size
              ? { cols: widgetData.size.cols, rows: 1 }
              : undefined,
            layout: widgetData.layout,
          } as SavedModelWidget
        })

        setWidgets(loadedWidgets)
      }

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [modelId])

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId))
    setSelectedWidgetId((prev) => (prev === widgetId ? null : prev))
  }

  const handleEditWidget = (widgetId: string) => {
    const widgetToEdit = widgets.find((w) => w.id === widgetId)
    if (widgetToEdit) {
      setEditingWidget(widgetToEdit)
    }
  }

  // Handle clicking outside widget to deselect (same behavior as device page)
  useEffect(() => {
    if (!isEditing) {
      setSelectedWidgetId(null)
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if click is on a widget container or button
      const isWidgetClick = target.closest('[data-widget-container]')
      if (!isWidgetClick) {
        setSelectedWidgetId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isEditing])

  if (isLoading) {
    return (
      <RedirectPage
        isRedirecting={true}
        message="Loading Model"
        subMessage="Please wait a moment..."
      />
    )
  }

  if (!model) {
    return (
      <DashboardLayout>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
          <div className="w-full mx-auto max-w-7xl">
            <p className="text-muted-foreground">Model not found</p>
          </div>
        </main>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <ModelDetailOverviewSection>
            <ModelDetailHeader
              modelName={model.name}
              modelType={model.type}
              isEditing={isEditing}
              onEditingChange={setIsEditing}
            />

            {/* Model Widget Grid Section */}
            <ModelDetailGridSection>
              {widgets.map((w, index) => (
                <ModelDetailWidget
                  key={w.id}
                  widget={w.widget}
                  config={{
                    name: w.config.name,
                    unit: w.config.unit,
                    minValue: w.config.minValue,
                    maxValue: w.config.maxValue,
                    currentValue: w.config.currentValue,
                  }}
                  isEditing={isEditing}
                  isSelected={selectedWidgetId === w.id}
                  onSelect={() => setSelectedWidgetId(w.id)}
                  onEdit={() => handleEditWidget(w.id)}
                  onDelete={() => handleDeleteWidget(w.id)}
                  onSizeChange={(size) => {
                    setWidgets((prev) =>
                      prev.map((item) =>
                        item.id === w.id ? { ...item, size } : item
                      )
                    )
                  }}
                  onPositionChange={() => {}}
                  initialSize={w.size}
                  initialPosition={
                    w.layout
                      ? {
                          row: (w.layout as any).row,
                          col: (w.layout as any).col ?? 1,
                        }
                      : undefined
                  }
                />
              ))}
            </ModelDetailGridSection>
          </ModelDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
