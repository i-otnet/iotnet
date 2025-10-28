'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/modules/dashboard/sidebar'
import DashboardHeader from '@/components/modules/dashboard/header'

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
            // Prefer direct component reference comparison which is stable after production builds
            const childType = child.type as React.ComponentType<
              Record<string, unknown>
            >

            // If the child is the DashboardHeader component, inject onMenuClick
            if (childType === DashboardHeader) {
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
