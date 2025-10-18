'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Info } from 'lucide-react'

export default function BrokerIonetSetup() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* Summary Card */}
      <Card className="border border-border/70 shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-medium">
              Configuration Summary
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wide opacity-80"
          >
            Auto-config
          </Badge>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground leading-relaxed pt-1">
          <p className="mb-2">
            These are the settings that will be applied automatically:
          </p>
          <Separator className="mb-3 opacity-30" />
          <ul className="space-y-1 pl-4">
            <li className="list-disc">
              Broker URL:{' '}
              <span className="text-foreground font-medium">
                broker.i-ot.net
              </span>
            </li>
            <li className="list-disc">
              Port: <span className="text-foreground font-medium">1883</span>{' '}
              (MQTT) / <span className="text-foreground font-medium">8883</span>{' '}
              (MQTTS)
            </li>
            <li className="list-disc">
              Security:{' '}
              <span className="text-foreground font-medium">
                TLS encryption enabled
              </span>
            </li>
            <li className="list-disc">
              Authentication:{' '}
              <span className="text-foreground font-medium">
                Auto-generated credentials
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
