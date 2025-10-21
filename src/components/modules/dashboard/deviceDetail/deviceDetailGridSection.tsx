'use client'

interface DeviceDetailGridSectionProps {
  children?: React.ReactNode
}

export default function DeviceDetailGridSection({
  children,
}: DeviceDetailGridSectionProps) {
  return <div className="grid gap-4">{children}</div>
}
