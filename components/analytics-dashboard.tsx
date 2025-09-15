"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Users, DollarSign, ShoppingCart, Calendar, Phone, Mail } from "lucide-react"

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 18, customers: 12 },
  { month: "Feb", revenue: 52000, orders: 22, customers: 15 },
  { month: "Mar", revenue: 48000, orders: 19, customers: 13 },
  { month: "Apr", revenue: 61000, orders: 25, customers: 18 },
  { month: "May", revenue: 55000, orders: 23, customers: 16 },
  { month: "Jun", revenue: 67000, orders: 28, customers: 20 },
]

const categoryData = [
  { name: "Curtains", value: 45, color: "#0d9488" },
  { name: "Blinds", value: 30, color: "#059669" },
  { name: "Smart Home", value: 20, color: "#16a34a" },
  { name: "Accessories", value: 5, color: "#4ade80" },
]

const engagementData = [
  { month: "Jan", meetings: 8, calls: 15, emails: 32 },
  { month: "Feb", meetings: 12, calls: 18, emails: 28 },
  { month: "Mar", meetings: 10, calls: 22, emails: 35 },
  { month: "Apr", meetings: 15, calls: 20, emails: 40 },
  { month: "May", meetings: 13, calls: 25, emails: 38 },
  { month: "Jun", meetings: 18, calls: 28, emails: 45 },
]

const customerSegments = [
  { segment: "High Value", count: 8, revenue: 180000, color: "#164e63" },
  { segment: "Regular", count: 15, revenue: 120000, color: "#0ea5e9" },
  { segment: "New", count: 12, revenue: 45000, color: "#f59e0b" },
  { segment: "At Risk", count: 5, revenue: 25000, color: "#ef4444" },
]

export function AnalyticsDashboard() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = customerSegments.reduce((sum, segment) => sum + segment.count, 0)
  const avgOrderValue = Math.round(totalRevenue / totalOrders)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+15% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgOrderValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Orders</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Tracking</TabsTrigger>
          <TabsTrigger value="customers">Customer Segments</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                      <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders & Customers</CardTitle>
                <CardDescription>Monthly orders and new customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="var(--color-primary)" name="Orders" />
                      <Bar dataKey="customers" fill="var(--color-secondary)" name="New Customers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Activities</CardTitle>
                <CardDescription>Monthly touchpoints with customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="meetings" fill="var(--color-chart-1)" name="Meetings" />
                      <Bar dataKey="calls" fill="var(--color-chart-2)" name="Calls" />
                      <Bar dataKey="emails" fill="var(--color-chart-3)" name="Emails" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Summary</CardTitle>
                <CardDescription>Total engagement activities this period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-chart-1" />
                    <div>
                      <div className="font-semibold">Meetings</div>
                      <div className="text-sm text-muted-foreground">Face-to-face interactions</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">76</div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-8 w-8 text-chart-2" />
                    <div>
                      <div className="font-semibold">Phone Calls</div>
                      <div className="text-sm text-muted-foreground">Voice conversations</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">128</div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-8 w-8 text-chart-3" />
                    <div>
                      <div className="font-semibold">Emails</div>
                      <div className="text-sm text-muted-foreground">Written communications</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">218</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customers by value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                        <div>
                          <div className="font-medium">{segment.segment}</div>
                          <div className="text-sm text-muted-foreground">{segment.count} customers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${segment.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Health Score</CardTitle>
                <CardDescription>Overall customer relationship health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">8.2</div>
                  <div className="text-sm text-muted-foreground">Average Health Score</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excellent (9-10)</span>
                    <Badge variant="default">12 customers</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Good (7-8)</span>
                    <Badge variant="secondary">18 customers</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fair (5-6)</span>
                    <Badge variant="outline">8 customers</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">At Risk (1-4)</span>
                    <Badge variant="destructive">2 customers</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Category Performance</CardTitle>
                <CardDescription>Revenue distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best selling products this period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Smart Curtain System Pro</div>
                      <div className="text-sm text-muted-foreground">Smart Home</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">24 units</div>
                      <div className="text-sm text-muted-foreground">$7,176</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Luxury Velvet Curtains</div>
                      <div className="text-sm text-muted-foreground">Curtains</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">18 units</div>
                      <div className="text-sm text-muted-foreground">$3,582</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Eco-Friendly Bamboo Blinds</div>
                      <div className="text-sm text-muted-foreground">Blinds</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">15 units</div>
                      <div className="text-sm text-muted-foreground">$2,235</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
