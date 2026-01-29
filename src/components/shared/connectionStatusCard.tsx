'use client'

import { ArrowRight } from 'lucide-react'

interface ConnectionStatusCardProps {
  status: 'online' | 'offline'
}

export default function ConnectionStatusCard({
  status,
}: ConnectionStatusCardProps) {
  return (
    <div className="w-full p-3 bg-card dark:bg-slate-900 rounded-lg border border-border dark:border-slate-700 flex items-center gap-3">
      <div
        className={`p-2 rounded-full shrink-0 ${
          status === 'online'
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}
      >
        <ArrowRight
          className={`h-4 w-4 ${
            status === 'online'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-foreground dark:text-slate-200">
          Connection Status
        </h3>
        <p
          className={`text-xs mt-0.5 ${
            status === 'online'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {status === 'online'
            ? 'Device is online and receiving data'
            : 'Device is offline'}
        </p>
      </div>
      <div className="text-right text-xs shrink-0 flex gap-6">
        <div>
          <p className="text-muted-foreground dark:text-slate-400">
            Subscribed Topics
          </p>
          <p className="font-semibold dark:text-slate-200">2</p>
        </div>
        <div>
          <p className="text-muted-foreground dark:text-slate-400">
            Last Update
          </p>
          <p className="font-semibold dark:text-slate-200">4:27:27 PM</p>
        </div>
      </div>
    </div>
  )
}
