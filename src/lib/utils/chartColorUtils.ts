/**
 * Chart Color Utilities
 * Manages color assignment for multi-pin charts
 * Colors are derived from globals.css palette
 */

export interface ChartColorConfig {
  borderColor: string
  backgroundColor: string
  label: string
}

// Chart colors palette - based on globals.css color scheme
// V1 (index 0) is always primary and is handled separately
const CHART_COLORS_PALETTE: ChartColorConfig[] = [
  {
    label: 'Primary',
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    label: 'Green',
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    label: 'Amber',
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    label: 'Red',
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  {
    label: 'Violet',
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    label: 'Pink',
    borderColor: '#ec4899',
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
  },
  {
    label: 'Cyan',
    borderColor: '#06b6d4',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  {
    label: 'Orange',
    borderColor: '#f97316',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
  },
]

/**
 * Get primary color (for V1/first pin)
 * V1 is always primary color
 */
export function getPrimaryChartColor(): ChartColorConfig {
  return CHART_COLORS_PALETTE[0]
}

/**
 * Get random color from palette (excluding primary)
 * Used for pins after V1
 * @returns Random color configuration from secondary colors
 */
export function getRandomChartColor(): ChartColorConfig {
  // Exclude primary (index 0), pick random from rest
  const secondaryColors = CHART_COLORS_PALETTE.slice(1)
  const randomIndex = Math.floor(Math.random() * secondaryColors.length)
  return secondaryColors[randomIndex]
}

/**
 * Get color by index
 * Index 0 returns primary color
 * Other indices return colors from palette with wrapping
 * @param index - Color index
 * @returns Color configuration
 */
export function getChartColorByIndex(index: number): ChartColorConfig {
  return CHART_COLORS_PALETTE[index % CHART_COLORS_PALETTE.length]
}

/**
 * Get all available colors
 */
export function getAllChartColors(): ChartColorConfig[] {
  return CHART_COLORS_PALETTE
}

/**
 * Get secondary colors (excluding primary)
 * Useful for color pickers that shouldn't include primary
 */
export function getSecondaryChartColors(): ChartColorConfig[] {
  return CHART_COLORS_PALETTE.slice(1)
}

/**
 * Generate chart dataset configuration from pin configuration
 * Used to transform ChartPin[] into ChartJS dataset format
 */
export interface ChartPinData {
  pin: string
  color: string
  backgroundColor: string
}

export interface ChartDataConfig {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    borderWidth: number
    fill: boolean
    tension: number
  }[]
}

export function generateChartDataFromPins(
  pins: ChartPinData[],
  mockData: {
    labels: string[]
    datasets: Array<{ data: number[] }>
  }
): ChartDataConfig {
  return {
    labels: mockData.labels,
    datasets: pins.map((pinConfig, index) => ({
      label: pinConfig.pin,
      data: mockData.datasets[index % mockData.datasets.length].data,
      borderColor: pinConfig.color,
      backgroundColor: pinConfig.backgroundColor,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    })),
  }
}
