'use client'

interface DeviceDetailGridSectionProps {
  children?: React.ReactNode
}

export default function DeviceDetailGridSection({
  children,
}: DeviceDetailGridSectionProps) {
  return <div className="grid grid-cols-4 gap-4 w-full">{children}</div>
}
