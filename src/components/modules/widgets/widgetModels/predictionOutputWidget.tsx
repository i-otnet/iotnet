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
      {/* Main Prediction */}
      {mainPrediction && mainConfidence !== undefined && (
        <div className="bg-muted border border-border rounded-lg p-5 shadow-sm">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Primary Prediction
          </div>
          <div className="flex items-end justify-between mb-3">
            <span className="text-2xl font-bold text-foreground">
              {mainPrediction}
            </span>
            <span className="text-4xl font-black text-primary">
              {(mainConfidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-border">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${mainConfidence * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* All Predictions */}
      {predictions.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-muted-foreground">
            All Predictions
          </div>
          <div className="space-y-2.5">
            {predictions.map((pred, index) => (
              <div
                key={`${pred.label}-${index}`}
                className="bg-muted rounded-lg p-3 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {pred.label}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {(pred.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-card rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${pred.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
