'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/modules/dashboard/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full lg:w-auto">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Only pass onMenuClick to DashboardHeader component
            const childType = child.type as React.ComponentType
            if (childType && childType.name === 'DashboardHeader') {
              return React.cloneElement(
                child as React.ReactElement<Record<string, unknown>>,
                {
                  onMenuClick: () => setSidebarOpen(true),
                }
              )
            }
          }
          return child
        })}
      </div>
    </div>
  )
}
