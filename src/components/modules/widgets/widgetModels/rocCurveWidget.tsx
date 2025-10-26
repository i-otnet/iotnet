'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend)

export interface RocCurvePoint {
  fpr: number
  tpr: number
}

interface ROCCurveWidgetProps {
  auc?: number
  rocCurveData?: RocCurvePoint[]
  children?: React.ReactNode
}

export default function ROCCurveWidget({
  auc,
  rocCurveData,
  children,
}: ROCCurveWidgetProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* AUC Score */}
      {auc !== undefined && (
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <div className="text-xs font-semibold text-muted-foreground mb-1">
              AUC Score
            </div>
            <div className="text-3xl font-bold text-primary">
              {auc.toFixed(3)}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {auc >= 0.9
                ? 'Excellent'
                : auc >= 0.8
                ? 'Good'
                : auc >= 0.7
                ? 'Fair'
                : 'Poor'}{' '}
              classifier
            </div>
          </div>
        </div>
      )}

      {/* Chart Area */}
      <div className="flex-1 bg-card rounded-lg border border-border flex items-center justify-center p-4 min-h-[200px]">
        {rocCurveData && rocCurveData.length > 0 ? (
          <Line
            data={{
              labels: rocCurveData.map((point) => point.fpr),
              datasets: [
                {
                  label: 'ROC Curve',
                  data: rocCurveData.map((point) => point.tpr),
                  fill: false,
                  borderColor: '#a78bfa',
                  backgroundColor: '#a78bfa',
                  tension: 0.3,
                  pointRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'ROC Curve',
                  color: '#a78bfa',
                  font: { size: 16 },
                },
              },
              scales: {
                x: {
                  type: 'linear',
                  title: { display: true, text: 'False Positive Rate (FPR)' },
                  min: 0,
                  max: 1,
                },
                y: {
                  title: { display: true, text: 'True Positive Rate (TPR)' },
                  min: 0,
                  max: 1,
                },
              },
            }}
            height={120}
          />
        ) : (
          children || (
            <div className="text-center">
              <svg
                className="w-32 h-32 mx-auto mb-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4a1 1 0 011-1h16a1 1 0 011 1v2.414a1 1 0 01-.293.707l-6.414 6.414a1 1 0 000 1.414l6.414 6.414a1 1 0 01.293.707V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-2.414a1 1 0 01.293-.707l6.414-6.414a1 1 0 000-1.414L3.293 4.707A1 1 0 013 4z"
                />
              </svg>
              <p className="text-foreground text-sm font-medium">ROC Curve</p>
              <p className="text-muted-foreground text-xs mt-1">
                Classification performance curve
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
