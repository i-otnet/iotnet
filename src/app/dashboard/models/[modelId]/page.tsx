import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import ModelDetailOverviewSection from '@/components/modules/dashboard/modelDetail/modelDetailOverviewSection'
import ModelDetailGridSection from '@/components/modules/dashboard/modelDetail/modelDetailGridSection'
import ModelDetailHeader from '@/components/modules/dashboard/modelDetail/modelDetailHeader'
import ConnectionStatusCard from '@/components/shared/connectionStatusCard'
import { mockModelsData } from '@/lib/json/modelsData'

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ modelId: string }>
}) {
  const { modelId } = await params
  const model = mockModelsData.data.models.find(
    (m) => m.id === parseInt(modelId)
  )

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

            <ModelDetailGridSection>
              <ConnectionStatusCard
                status={model.status as 'online' | 'offline'}
              />
            </ModelDetailGridSection>
          </ModelDetailOverviewSection>
        </div>
      </main>
    </DashboardLayout>
  )
}
