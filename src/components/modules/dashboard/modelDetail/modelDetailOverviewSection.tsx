'use client'

interface ModelDetailOverviewSectionProps {
  children?: React.ReactNode
}

export default function ModelDetailOverviewSection({
  children,
}: ModelDetailOverviewSectionProps) {
  return <div className="space-y-4">{children}</div>
}
