'use client'

interface DeviceDetailOverviewSectionProps {
  deviceId: string
  children?: React.ReactNode
}

export default function DeviceDetailOverviewSection({
  deviceId,
  children,
}: DeviceDetailOverviewSectionProps) {
  return <div className="space-y-4">{children}</div>
}
