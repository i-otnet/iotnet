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

interface ChartWidgetProps {
  data?: ChartData
  children?: React.ReactNode
}

export default function ChartWidget({ data, children }: ChartWidgetProps) {
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

  if (!data || !data.datasets || data.datasets.length === 0) {
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

  // Chart.js configuration
  const chartData = {
    labels: data.labels || [],
    datasets: data.datasets.map((dataset) => ({
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
        display: data.datasets.length > 1, // Show legend only for multiple datasets
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
        beginAtZero: true,
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
    <div className="w-full h-full min-h-[200px]">
      <Line data={chartData} options={options} />
    </div>
  )
}
