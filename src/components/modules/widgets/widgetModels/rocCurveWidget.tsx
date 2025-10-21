'use client'

import React from 'react'

interface ROCPoint {
  fpr: number
  tpr: number
}

interface ROCCurveWidgetProps {
  auc?: number
  points?: ROCPoint[]
  children?: React.ReactNode
}

export default function ROCCurveWidget({
  auc,
  points,
  children,
}: ROCCurveWidgetProps) {
  return (
    <div className="w-full h-[200px] flex flex-col gap-2">
      {auc !== undefined && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">AUC Score:</span>
          <span className="font-bold text-primary-600">{auc.toFixed(3)}</span>
        </div>
      )}
      <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
        {children || (
          <div className="text-center text-gray-500 text-sm">
            ROC Curve Visualization
          </div>
        )}
      </div>
    </div>
  )
}
