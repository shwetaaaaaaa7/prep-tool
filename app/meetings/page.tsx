import { DashboardLayout } from "@/components/dashboard-layout"
import { MeetingsDashboard } from "@/components/meetings-dashboard"

export default function MeetingsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Meetings & Agendas</h2>
        </div>
        <MeetingsDashboard />
      </div>
    </DashboardLayout>
  )
}
