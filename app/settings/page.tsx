import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <SettingsForm />
      </div>
    </DashboardLayout>
  )
}
