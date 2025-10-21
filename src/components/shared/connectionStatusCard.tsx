'use client'

import { ArrowRight } from 'lucide-react'

interface ConnectionStatusCardProps {
  status: 'online' | 'offline'
}

export default function ConnectionStatusCard({
  status,
}: ConnectionStatusCardProps) {
  return (
    <div className="p-3 bg-white rounded-lg border border-border flex items-center gap-3">
      <div
        className={`p-2 rounded-full flex-shrink-0 ${
          status === 'online' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <ArrowRight
          className={`h-4 w-4 ${
            status === 'online' ? 'text-green-600' : 'text-red-600'
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-foreground">
          Connection Status
        </h3>
        <p
          className={`text-xs mt-0.5 ${
            status === 'online' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status === 'online'
            ? 'Device is online and receiving data'
            : 'Device is offline'}
        </p>
      </div>
      <div className="text-right text-xs flex-shrink-0 flex gap-6">
        <div>
          <p className="text-muted-foreground">Subscribed Topics</p>
          <p className="font-semibold">2</p>
        </div>
        <div>
          <p className="text-muted-foreground">Last Update</p>
          <p className="font-semibold">4:27:27 PM</p>
        </div>
      </div>
    </div>
  )
}
