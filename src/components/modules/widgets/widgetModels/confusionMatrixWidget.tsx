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
  const total =
    data.truePositive +
    data.trueNegative +
    data.falsePositive +
    data.falseNegative
  const accuracy =
    total > 0
      ? (((data.truePositive + data.trueNegative) / total) * 100).toFixed(1)
      : 0

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Summary */}
      <div className="bg-muted border border-border rounded-lg p-3">
        <div className="text-xs font-semibold text-muted-foreground mb-1">
          Accuracy
        </div>
        <div className="text-2xl font-bold text-primary">{accuracy}%</div>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left text-muted-foreground font-semibold bg-muted border border-border"></th>
              <th className="p-2 text-center text-muted-foreground font-semibold bg-muted border border-border">
                Pred {labels[0]}
              </th>
              <th className="p-2 text-center text-muted-foreground font-semibold bg-muted border border-border">
                Pred {labels[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-muted-foreground font-semibold bg-muted border border-border">
                Act {labels[0]}
              </td>
              <td className="p-2 text-center border border-border bg-card">
                <span className="inline-block bg-primary/20 text-primary font-bold rounded px-3 py-2 text-lg border border-border">
                  {data.truePositive}
                </span>
              </td>
              <td className="p-2 text-center border border-border bg-card">
                <span className="inline-block bg-destructive/20 text-destructive font-bold rounded px-3 py-2 text-lg border border-border">
                  {data.falseNegative}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-2 text-muted-foreground font-semibold bg-muted border border-border">
                Act {labels[1]}
              </td>
              <td className="p-2 text-center border border-border bg-card">
                <span className="inline-block bg-destructive/20 text-destructive font-bold rounded px-3 py-2 text-lg border border-border">
                  {data.falsePositive}
                </span>
              </td>
              <td className="p-2 text-center border border-border bg-card">
                <span className="inline-block bg-primary/20 text-primary font-bold rounded px-3 py-2 text-lg border border-border">
                  {data.trueNegative}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-primary/20 border border-border rounded"></div>
          <span className="text-foreground">Correct</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-destructive/20 border border-border rounded"></div>
          <span className="text-foreground">Error</span>
        </div>
      </div>
    </div>
  )
}
