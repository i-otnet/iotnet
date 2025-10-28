'use client'

import { ArrowRight } from 'lucide-react'

interface ConnectionStatusCardProps {
  status: 'online' | 'offline'
}

export default function ConnectionStatusCard({
  status,
}: ConnectionStatusCardProps) {
  return (
    <div className="w-full p-3 bg-card dark:bg-slate-900 rounded-lg border border-border dark:border-slate-700 flex items-center gap-3 flex-nowrap">
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
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-semibold text-sm text-foreground dark:text-slate-200 truncate">
          Connection Status
        </h3>
        <p
          className={`text-xs mt-0.5 ${
            status === 'online'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {status === 'online' ? (
            <>
              {/* Mobile: short message */}
              <span className="block sm:hidden">Device is online</span>
              {/* Desktop: full message, allow truncation if needed */}
              <span className="hidden sm:block truncate">
                Device is online and receiving data
              </span>
            </>
          ) : (
            <span className="truncate">Device is offline</span>
          )}
        </p>
      </div>
      <div className="ml-3 text-right text-xs shrink-0 flex gap-4 items-center whitespace-nowrap">
        <div className="text-right">
          <p className="text-muted-foreground dark:text-slate-400 text-[11px]">
            Topics
          </p>
          <p className="font-semibold dark:text-slate-200">2</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground dark:text-slate-400 text-[11px]">
            Updated
          </p>
          <p className="font-semibold dark:text-slate-200">4:27:27 PM</p>
        </div>
      </div>
    </div>
  )
}
