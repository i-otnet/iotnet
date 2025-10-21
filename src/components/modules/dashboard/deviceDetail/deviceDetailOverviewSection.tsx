'use client'

interface DeviceDetailOverviewSectionProps {
  children?: React.ReactNode
}

export default function DeviceDetailOverviewSection({
  children,
}: DeviceDetailOverviewSectionProps) {
  return <div className="space-y-4">{children}</div>
}
