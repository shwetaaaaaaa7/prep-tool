"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CustomerLeftPanel } from "@/components/customer-left-panel"
import { CustomerRightPanel } from "@/components/customer-right-panel"

// Mock customer data - in real app, this would come from API
const mockCustomerData = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@retailstore.com",
    nickname: "SJ",
    company: "Johnson Retail Store",
    education: "MBA in Business Administration",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2022-03-15",
    totalSpent: 125000,
    lastOrder: "2024-01-15",
    status: "active",
    avatar: "/placeholder.svg?height=80&width=80",
    notes: {
      likes: ["Modern designs", "Eco-friendly materials", "Quick delivery"],
      dislikes: ["Complex patterns", "Heavy fabrics", "Long lead times"],
      interests: ["Sustainable living", "Interior design trends", "Smart home technology"],
    },
    keyHighlights: {
      totalOrders: 24,
      averageOrderValue: 5208,
      preferredCategories: ["Curtains", "Blinds", "Smart Home"],
      loyaltyScore: 8.5,
    },
    engagements: [
      {
        id: "1",
        date: "2024-01-15",
        type: "Meeting",
        subject: "Q1 Product Planning",
        notes: "Discussed new smart curtain line, very interested in automation features",
      },
      {
        id: "2",
        date: "2024-01-10",
        type: "Email",
        subject: "Follow-up on samples",
        notes: "Sent fabric samples for spring collection",
      },
      {
        id: "3",
        date: "2023-12-20",
        type: "Call",
        subject: "Holiday order discussion",
        notes: "Placed large order for holiday season, requested expedited shipping",
      },
    ],
    purchases: [
      { month: "Jan 2024", amount: 12500, category: "Curtains" },
      { month: "Dec 2023", amount: 18000, category: "Blinds" },
      { month: "Nov 2023", amount: 8500, category: "Smart Home" },
      { month: "Oct 2023", amount: 15000, category: "Curtains" },
      { month: "Sep 2023", amount: 11000, category: "Accessories" },
      { month: "Aug 2023", amount: 9500, category: "Curtains" },
    ],
    lastMeeting: {
      date: "2024-01-15",
      duration: "45 minutes",
      outcome: "Positive - interested in Q2 smart home line",
      nextSteps: ["Send smart curtain catalog", "Schedule demo", "Prepare pricing proposal"],
    },
  },
}

export function CustomerProfileLayout({ customerId }: { customerId: string }) {
  const router = useRouter()
  const [customer, setCustomer] = useState<any>(null)

  useEffect(() => {
    // In real app, fetch customer data from API
    const customerData = mockCustomerData[customerId as keyof typeof mockCustomerData]
    if (customerData) {
      setCustomer(customerData)
    }
  }, [customerId]) // added customerId to dependency array to fix missing dependency

  if (!customer) {
    return <div className="p-8">Customer not found</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{customer.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerLeftPanel customer={customer} />
        <CustomerRightPanel customer={customer} />
      </div>
    </div>
  )
}
