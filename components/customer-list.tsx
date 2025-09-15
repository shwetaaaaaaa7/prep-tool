"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, TrendingUp, DollarSign } from "lucide-react"

// Mock customer data
const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@retailstore.com",
    company: "Johnson Retail Store",
    totalSpent: 125000,
    lastOrder: "2024-01-15",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@chenenterprises.com",
    company: "Chen Enterprises",
    totalSpent: 89000,
    lastOrder: "2024-01-12",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@modernhome.com",
    company: "Modern Home Solutions",
    totalSpent: 156000,
    lastOrder: "2024-01-10",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david@thompsondecor.com",
    company: "Thompson Decor",
    totalSpent: 67000,
    lastOrder: "2023-12-28",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">{activeCustomers} active customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Customer Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalRevenue / totalCustomers).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per customer lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>Select a customer to view their detailed profile and engagement history</CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => router.push(`/customer/${customer.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.company}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold">${customer.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Last order: {customer.lastOrder}</div>
                  <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
