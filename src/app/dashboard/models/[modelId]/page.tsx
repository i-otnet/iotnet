import DashboardLayout from '@/components/layout/dashboard/dashboardLayout'
import DashboardHeader from '@/components/modules/dashboard/header'
import DashboardModelsLayout from '@/components/layout/dashboard/dashboardModelsLayout'

export default function ModelDetailPage({
  params,
}: {
  params: { modelId: string }
}) {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/30">
        <div className="w-full mx-auto max-w-7xl">
          <DashboardModelsLayout>
            <h1 className="text-2xl font-bold">Hello World</h1>
            <p className="text-muted-foreground mt-2">
              Model ID: {params.modelId}
            </p>
          </DashboardModelsLayout>
        </div>
      </main>
    </DashboardLayout>
  )
}
