'use client'

import React from 'react'

interface Prediction {
  label: string
  confidence: number
  value?: React.ReactNode
}

interface PredictionOutputWidgetProps {
  predictions?: Prediction[]
  mainPrediction?: string
  mainConfidence?: number
}

export default function PredictionOutputWidget({
  predictions = [],
  mainPrediction,
  mainConfidence,
}: PredictionOutputWidgetProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {mainPrediction && mainConfidence !== undefined && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-2">Primary Prediction</div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-700">
              {mainPrediction}
            </span>
            <span className="text-2xl font-bold text-primary-600">
              {(mainConfidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {predictions.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-700">
            All Predictions
          </div>
          {predictions.map((pred, index) => (
            <div
              key={`${pred.label}-${index}`}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">{pred.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-full rounded-full transition-all"
                    style={{ width: `${pred.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600 w-12 text-right">
                  {(pred.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
