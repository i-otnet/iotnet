'use client'

interface DeviceDetailGridSectionProps {
  deviceId: string
  children?: React.ReactNode
}

export default function DeviceDetailGridSection({
  deviceId,
  children,
}: DeviceDetailGridSectionProps) {
  return <div className="grid gap-4">{children}</div>
}
