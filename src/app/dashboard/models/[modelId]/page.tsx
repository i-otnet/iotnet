'use client'

import { use, useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import ModelDetailOverviewSection from '@/components/modules/dashboard/modelDetail/modelDetailOverviewSection'
import ModelDetailGridSection from '@/components/modules/dashboard/modelDetail/modelDetailGridSection'
import ModelDetailHeader from '@/components/modules/dashboard/modelDetail/modelDetailHeader'
import ConnectionStatusCard from '@/components/shared/connectionStatusCard'
import RedirectPage from '@/components/shared/redirectPage'
import { mockModelsData } from '@/lib/json/modelsData'

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ modelId: string }>
}) {
  const { modelId } = use(params)
  const model = mockModelsData.data.models.find(
    (m) => m.id === parseInt(modelId)
  )

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with delay for redirect effect
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [modelId])

  if (isLoading) {
    return (
      <RedirectPage
        isRedirecting={true}
        message="Loading Model"
        subMessage="Please wait a moment..."
      />
    )
  }

  if (!model) {
    return (
      <DashboardLayout>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
          <div className="w-full mx-auto max-w-7xl">
            <p className="text-muted-foreground">Model not found</p>
          </div>
        </main>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <ModelDetailOverviewSection>
            <ModelDetailHeader modelName={model.name} modelType={model.type} />

            {/* Connection Status - Full Width, Outside Grid */}
            <div className="mb-6">
              <ConnectionStatusCard
                status={model.status as 'online' | 'offline'}
              />
            </div>

            {/* Model Widget Grid Section */}
            <ModelDetailGridSection>
              {/* Widgets will be added here */}
            </ModelDetailGridSection>
          </ModelDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
