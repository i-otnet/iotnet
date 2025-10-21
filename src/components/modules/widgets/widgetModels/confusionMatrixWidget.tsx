'use client'

import React from 'react'

interface ConfusionMatrixData {
  truePositive: number
  trueNegative: number
  falsePositive: number
  falseNegative: number
}

interface ConfusionMatrixWidgetProps {
  data?: ConfusionMatrixData
  labels?: string[]
}

export default function ConfusionMatrixWidget({
  data = {
    truePositive: 0,
    trueNegative: 0,
    falsePositive: 0,
    falseNegative: 0,
  },
  labels = ['Positive', 'Negative'],
}: ConfusionMatrixWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div></div>
        <div className="font-semibold text-gray-700">Predicted {labels[0]}</div>
        <div className="font-semibold text-gray-700">Predicted {labels[1]}</div>

        <div className="font-semibold text-gray-700">Actual {labels[0]}</div>
        <div className="bg-green-100 p-3 rounded font-bold text-green-700">
          {data.truePositive}
        </div>
        <div className="bg-red-100 p-3 rounded font-bold text-red-700">
          {data.falseNegative}
        </div>

        <div className="font-semibold text-gray-700">Actual {labels[1]}</div>
        <div className="bg-red-100 p-3 rounded font-bold text-red-700">
          {data.falsePositive}
        </div>
        <div className="bg-green-100 p-3 rounded font-bold text-green-700">
          {data.trueNegative}
        </div>
      </div>
    </div>
  )
}
