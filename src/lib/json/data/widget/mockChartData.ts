/**
 * Mock Chart Data
 * Sample data for chart widget display
 * Colors are managed by chartColorUtils.ts
 */
export const mockChartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
  datasets: [
    {
      label: 'V1',
      data: [22.5, 21.8, 23.1, 25.5, 26.8, 24.1, 23.5],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'V2',
      data: [45.2, 48.5, 52.1, 50.8, 49.2, 46.5, 47.8],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'V3',
      data: [65.5, 68.2, 70.5, 72.1, 69.8, 67.2, 68.5],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
}
