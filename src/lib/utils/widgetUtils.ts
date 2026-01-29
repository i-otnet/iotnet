/**
 * Get widget border style based on edit mode and selection state
 */
export function getWidgetBorderStyle(
  isEditing: boolean,
  isSelected: boolean
): string {
  if (!isEditing) {
    // Normal mode: clean border
    return 'border border-border'
  }

  if (isSelected) {
    // Edit mode + selected: solid blue border with shadow
    return 'border-2 border-primary shadow-lg shadow-primary/20'
  }

  // Edit mode + not selected: dashed blue border
  return 'border-2 border-dashed border-primary/40'
}

/**
 * Get device widget type display name
 */
export function getDeviceWidgetTypeName(widgetId: string): string {
  const names: Record<string, string> = {
    statistics: 'STATISTICS',
    chart: 'CHART',
    button: 'BUTTON',
    slider: 'SLIDER',
    switch: 'SWITCH',
    gauge: 'GAUGE',
  }
  return names[widgetId] || widgetId.toUpperCase()
}

/**
 * Get model widget type display name
 */
export function getModelWidgetTypeName(widgetId: string): string {
  const names: Record<string, string> = {
    statistics: 'MODEL METRICS',
    chart: 'PERFORMANCE CHART',
    'confusion-matrix': 'CONFUSION MATRIX',
    'feature-importance': 'FEATURE IMPORTANCE',
    'prediction-output': 'PREDICTION OUTPUT',
  }
  return names[widgetId] || widgetId.toUpperCase()
}

/**
 * Get widget type display name (determines which widget type it is)
 */
export function getWidgetTypeName(
  widgetId: string,
  widgetType: 'device' | 'model' = 'device'
): string {
  if (widgetType === 'model') {
    return getModelWidgetTypeName(widgetId)
  }
  return getDeviceWidgetTypeName(widgetId)
}

/**
 * Get column span classes for device widget based on type
 */
export function getDeviceWidgetColSpan(widgetId: string): string {
  const size = getDeviceWidgetDefaultSize(widgetId)

  switch (size) {
    case 2:
      return 'col-span-2' // 1/2 (always takes 2 columns on 4-column grid)
    case 1:
    default:
      return 'col-span-1' // 1/4 (always takes 1 column on 4-column grid)
  }
}

/**
 * Get column span classes for model widget based on type
 */
export function getModelWidgetColSpan(widgetId: string): string {
  const size = getModelWidgetDefaultSize(widgetId)

  switch (size) {
    case 2:
      return 'col-span-2' // 1/2 (always takes 2 columns on 4-column grid)
    case 1:
    default:
      return 'col-span-1' // 1/4 (always takes 1 column on 4-column grid)
  }
}

/**
 * Get column span classes for widget based on type (determines which widget type it is)
 */
export function getWidgetColSpan(
  widgetId: string,
  widgetType: 'device' | 'model' = 'device'
): string {
  if (widgetType === 'model') {
    return getModelWidgetColSpan(widgetId)
  }
  return getDeviceWidgetColSpan(widgetId)
}

/**
 * Get default size for device widgets (default widths on a 4-column grid)
 * 1 = 1/4, 2 = 1/2, etc.
 */
export function getDeviceWidgetDefaultSize(widgetId: string): number {
  const sizes: Record<string, number> = {
    statistics: 1, // 1/4
    chart: 2, // 1/2
    button: 1, // 1/4
    slider: 2, // 1/2
    switch: 1, // 1/4
    gauge: 1, // 1/4
  }
  return sizes[widgetId] || 1
}

/**
 * Get default size for model widgets (default widths on a 4-column grid)
 * 1 = 1/4, 2 = 1/2, etc.
 */
export function getModelWidgetDefaultSize(widgetId: string): number {
  const sizes: Record<string, number> = {
    statistics: 1, // 1/4 (Model Metrics)
    chart: 2, // 1/2 (Performance Chart)
    'confusion-matrix': 2, // 1/2
    'feature-importance': 1, // 1/4
    'prediction-output': 1, // 1/4
  }
  return sizes[widgetId] || 1
}

/**
 * Get default size for widget (determines which widget type it is)
 */
export function getWidgetDefaultSize(
  widgetId: string,
  widgetType: 'device' | 'model' = 'device'
): number {
  if (widgetType === 'model') {
    return getModelWidgetDefaultSize(widgetId)
  }
  return getDeviceWidgetDefaultSize(widgetId)
}

/**
 * Convert column span to grid columns
 */
export function colSpanToGridCols(colSpan: string): number {
  const match = colSpan.match(/col-span-(\d+)/)
  return match ? parseInt(match[1], 10) : 1
}

/**
 * Convert grid columns to column span class
 */
export function gridColsToColSpan(cols: number): string {
  return `col-span-${cols}`
}

/**
 * Get resize constraints for widget type
 */
export function getWidgetResizeConstraints(widgetId: string): {
  minCols: number
  maxCols: number
  minRows: number
  maxRows: number
} {
  // Define constraints based on widget type (maxCols all set to 4 for full width resize)
  const constraints: Record<
    string,
    { minCols: number; maxCols: number; minRows: number; maxRows: number }
  > = {
    // Device widgets
    statistics: { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
    chart: { minCols: 2, maxCols: 4, minRows: 1, maxRows: 2 },
    button: { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
    slider: { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
    switch: { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
    gauge: { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
    // Model widgets
    'confusion-matrix': { minCols: 2, maxCols: 4, minRows: 2, maxRows: 4 },
    // 'roc-curve' removed: no constraints kept
    'feature-importance': { minCols: 1, maxCols: 4, minRows: 1, maxRows: 3 },
    'prediction-output': { minCols: 1, maxCols: 4, minRows: 1, maxRows: 2 },
  }

  return (
    constraints[widgetId] || {
      minCols: 1,
      maxCols: 4,
      minRows: 1,
      maxRows: 4,
    }
  )
}

/**
 * Calculate widget grid area string
 */
export function calculateGridArea(
  row: number,
  col: number,
  rowSpan: number,
  colSpan: number
): string {
  return `${row} / ${col} / ${row + rowSpan} / ${col + colSpan}`
}

/**
 * Check if widget can be resized
 */
export function canResizeWidget(widgetId: string): boolean {
  const noResizeWidgets = ['button', 'switch'] // Widgets that shouldn't be resized

  if (noResizeWidgets.includes(widgetId)) {
    return false
  }

  // You can add more specific logic here
  return true
}
