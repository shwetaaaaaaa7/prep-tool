import { CustomerProfileLayout } from "@/components/customer-profile-layout"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CustomerProfileLayout customerId={params.id} />
    </DashboardLayout>
  )
}
