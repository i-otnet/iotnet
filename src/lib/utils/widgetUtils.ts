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
    'roc-curve': 'ROC CURVE',
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
      return 'col-span-1 md:col-span-2 lg:col-span-2' // 1/2
    case 1:
    default:
      return 'col-span-1 md:col-span-1 lg:col-span-1' // 1/4
  }
}

/**
 * Get column span classes for model widget based on type
 */
export function getModelWidgetColSpan(widgetId: string): string {
  const size = getModelWidgetDefaultSize(widgetId)

  switch (size) {
    case 2:
      return 'col-span-1 md:col-span-2 lg:col-span-2' // 1/2
    case 1:
    default:
      return 'col-span-1 md:col-span-1 lg:col-span-1' // 1/4
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
    'roc-curve': 2, // 1/2
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
