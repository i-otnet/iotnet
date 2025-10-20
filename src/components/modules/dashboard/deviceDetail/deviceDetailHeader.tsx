'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil } from 'lucide-react'

interface DeviceDetailHeaderProps {
  deviceName: string
  deviceType: string
}

export default function DeviceDetailHeader({
  deviceName,
  deviceType,
}: DeviceDetailHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10 flex-shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{deviceName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{deviceType}</p>
        </div>
      </div>
      <Button size="lg">
        <Pencil className="h-5 w-5 mr-2" />
        Edit
      </Button>
    </div>
  )
}
