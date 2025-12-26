'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Cloud, Network } from 'lucide-react'

interface SetupOptionProps {
  selected: string | null
  setSelected: (option: string) => void
}

export default function SetupOption({
  selected,
  setSelected,
}: SetupOptionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-2 gap-6 pt-4">
      {/* === Option 1: Use IoTNet (Recommended) === */}
      <Card
        role="button"
        onClick={() => setSelected('iotnet')}
        className={cn(
          'cursor-pointer transition-all rounded-xl p-6 border shadow-sm flex flex-col items-center gap-4 text-center hover:shadow-md',
          selected === 'iotnet'
            ? 'border-primary bg-primary/10'
            : 'bg-background'
        )}
      >
        <div
          className={cn(
            'w-12 h-12 flex items-center justify-center rounded-full',
            selected === 'iotnet'
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/20 text-primary'
          )}
        >
          <Cloud className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-1">
          <h2
            className={cn(
              'text-lg font-semibold',
              selected === 'iotnet' ? 'text-primary' : 'text-foreground'
            )}
          >
            Use IoTNet
          </h2>
          <Badge
            variant={selected === 'iotnet' ? 'default' : 'default'}
            className="text-xs px-2 py-0.5 w-fit mx-auto"
          >
            Recommended
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm">
          Connect instantly to the default IoTNet broker — fast and hassle-free.
        </p>
      </Card>

      {/* === Option 2: Use Existing Broker === */}
      <Card
        role="button"
        onClick={() => setSelected('external')}
        className={cn(
          'cursor-pointer transition-all rounded-xl p-6 border shadow-sm flex flex-col items-center gap-4 text-center hover:shadow-md',
          selected === 'external'
            ? 'border-primary bg-primary/10'
            : 'bg-background'
        )}
      >
        <div
          className={cn(
            'w-12 h-12 flex items-center justify-center rounded-full',
            selected === 'external'
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/20 text-primary'
          )}
        >
          <Network className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-1">
          <h2
            className={cn(
              'text-lg font-semibold',
              selected === 'external' ? 'text-primary' : 'text-foreground'
            )}
          >
            Use Existing Broker
          </h2>
          <Badge
            variant={selected === 'external' ? 'default' : 'default'}
            className="text-xs px-2 py-0.5 w-fit mx-auto"
          >
            Custom
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm">
          Connect to an external MQTT broker with your own credentials.
        </p>
      </Card>
    </div>
  )
}
