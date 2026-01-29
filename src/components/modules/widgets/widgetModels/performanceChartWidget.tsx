'use client'

import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor?: string
    borderWidth?: number
    fill?: boolean
    tension?: number
  }[]
}

// Legacy item shape used by model widgets: { label, accuracy, precision, recall }
export interface ChartDataItem {
  label: string
  accuracy: number
  precision: number
  recall: number
}

interface ChartWidgetProps {
  data?: ChartData
  // keep compatibility with older callers (ModelDetailWidget) which pass `chartData`
  chartData?: ChartDataItem[]
  children?: React.ReactNode
}

export default function PerformanceChartWidget({
  data,
  chartData,
  children,
}: ChartWidgetProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setIsDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  // Support both new `data` prop and legacy `chartData` (array of ChartDataItem)
  let effectiveData: ChartData | undefined = data

  if (
    (!effectiveData ||
      !effectiveData.datasets ||
      effectiveData.datasets.length === 0) &&
    chartData &&
    chartData.length > 0
  ) {
    const labels = chartData.map((d) => d.label)
    const accuracy = chartData.map((d) => d.accuracy)
    const precision = chartData.map((d) => d.precision)
    const recall = chartData.map((d) => d.recall)

    effectiveData = {
      labels,
      datasets: [
        {
          label: 'Accuracy',
          data: accuracy,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139,92,246,0.08)',
          tension: 0.4,
        },
        {
          label: 'Precision',
          data: precision,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6,182,212,0.08)',
          tension: 0.4,
        },
        {
          label: 'Recall',
          data: recall,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244,63,94,0.08)',
          tension: 0.4,
        },
      ],
    }
  }

  if (
    !effectiveData ||
    !effectiveData.datasets ||
    effectiveData.datasets.length === 0
  ) {
    return <div className="w-full h-full">{children}</div>
  }

  // Colors for dark and light mode
  const textColor = isDarkMode ? '#cbd5e1' : '#6b7280'
  const gridColor = isDarkMode
    ? 'rgba(100, 116, 139, 0.6)'
    : 'rgba(229, 231, 235, 0.8)'
  const axisColor = isDarkMode
    ? 'rgba(100, 116, 139, 0.5)'
    : 'rgba(209, 213, 219, 0.8)'

  // Chart.js configuration (use effectiveData)
  const chartJsData = {
    labels: effectiveData.labels || [],
    datasets: effectiveData.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor || '#06b6d4',
      backgroundColor: dataset.backgroundColor || 'rgba(6, 182, 212, 0.1)',
      pointBackgroundColor: dataset.borderColor || '#06b6d4',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 0, // Hidden by default
      pointHoverRadius: 5, // Show on hover
      pointHoverBackgroundColor: dataset.borderColor || '#06b6d4',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
      tension: dataset.tension ?? 0.4, // Smooth curve
      fill: dataset.fill ?? false,
      borderWidth: 2,
    })),
  }

  // compute sensible y-axis minimum so the bottom follows data instead of always using 0
  // find min/max across all datasets
  const allValues = chartJsData.datasets.flatMap((d) => d.data as number[])
  const minVal = allValues.length > 0 ? Math.min(...allValues) : 0
  const maxVal = allValues.length > 0 ? Math.max(...allValues) : 0
  const range = Math.abs(maxVal - minVal)
  // margin: 10% of range, fallback to 5% of absolute min or 0.1 if values are very small/flat
  const margin =
    range > 0 ? range * 0.1 : Math.max(Math.abs(minVal) * 0.05, 0.1)
  const yMin = minVal - margin

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: effectiveData.datasets.length > 1, // Show legend only for multiple datasets
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
          font: {
            size: 11,
          },
          color: textColor,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 12,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2)
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: textColor,
        },
        border: {
          color: axisColor,
        },
      },
      y: {
        // set explicit minimum based on data so bottom edge follows lowest value (not always 0)
        min: yMin,
        grid: {
          color: gridColor,
          lineWidth: 1.5,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: textColor,
          callback: function (tickValue) {
            return Number(tickValue).toFixed(1)
          },
        },
        border: {
          color: axisColor,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
  }

  return (
    // increase chart height so the lines and grid are more visible inside the model detail card
    <div className="w-full h-64">
      <Line data={chartJsData} options={options} />
    </div>
  )
}
