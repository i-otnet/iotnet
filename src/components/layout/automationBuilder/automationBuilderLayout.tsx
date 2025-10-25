'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import {
  AUTOMATION_BUILDER_DEVICES as DEVICES,
  AUTOMATION_BUILDER_MODELS as MODELS,
} from '@/lib/json/data/automation/automationsData'

interface Device {
  id: string
  name: string
  location: string
  type: string
  dataPoints: string[]
}

interface Model {
  id: string
  name: string
  outputs: string[]
}

interface AutomationBuilderFlowPreviewProps {
  triggerSource: 'device' | 'model'
  triggerSourceId: string
  triggerDatapoint: string
  triggerOperator: string
  triggerValue: string
  actionTargetId: string
  actionType: string
  actionValue: string
  show: boolean
}

export default function AutomationBuilderFlowPreview({
  triggerSource,
  triggerSourceId,
  triggerDatapoint,
  triggerOperator,
  triggerValue,
  actionTargetId,
  actionType,
  actionValue,
  show,
}: AutomationBuilderFlowPreviewProps) {
  const triggerSourceData =
    triggerSource === 'device'
      ? (DEVICES as Device[]).find((d: Device) => d.id === triggerSourceId)
      : (MODELS as Model[]).find((m: Model) => m.id === triggerSourceId)

  const actionTarget = (DEVICES as Device[]).find(
    (d: Device) => d.id === actionTargetId
  )

  if (!show) return null

  return (
    <Card className="bg-gradient-to-r from-blue-100 to-green-100 border-2 border-gray-300 p-6">
      <h3 className="font-bold mb-4 text-center">Flow Preview</h3>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm">
          🔵 <strong>{triggerSourceData?.name}</strong> / {triggerDatapoint}
        </p>
        <p className="text-primary">↓</p>
        <p className="text-sm font-semibold">
          {triggerOperator} {triggerValue}
        </p>
        <p className="text-primary">↓</p>
        <p>
          ⚡ <strong>{actionType}</strong> {actionTarget?.name}
        </p>
        {actionValue && <p className="ml-2 text-sm">→ {actionValue}</p>}
      </div>
    </Card>
  )
}
