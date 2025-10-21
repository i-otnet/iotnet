'use client'

interface ModelDetailGridSectionProps {
  children?: React.ReactNode
}

export default function ModelDetailGridSection({
  children,
}: ModelDetailGridSectionProps) {
  return <div className="grid gap-4">{children}</div>
}
