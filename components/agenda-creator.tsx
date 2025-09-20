"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, Package, TrendingUp, Mail, ArrowLeft, Plus, X } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const customers = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    company: "Johnson Wealth Advisors",
    totalSpent: 2500000,
    purchases: [
      { month: "Jan", amount: 450000 },
      { month: "Dec", amount: 680000 },
      { month: "Nov", amount: 320000 },
      { month: "Oct", amount: 550000 },
    ],
  },
}

const products = {
  "1": { id: "1", name: "Vanguard Total Stock Market ETF", price: 245.5, category: "ETFs" },
  "2": { id: "2", name: "Fidelity Growth Company Fund", price: 156.75, category: "Mutual Funds" },
  "3": { id: "3", name: "BlackRock ESG Equity SMA", price: 500000, category: "SMAs" },
}

export function AgendaCreator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [customer, setCustomer] = useState<any>(null)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [agendaItems, setAgendaItems] = useState<string[]>([])
  const [newAgendaItem, setNewAgendaItem] = useState("")
  const [meetingDetails, setMeetingDetails] = useState({
    title: "",
    date: "",
    time: "",
    duration: "60",
    type: "video",
    notes: "",
  })

  const customerId = searchParams.get("customer")
  const productIds = searchParams.get("products")

  useEffect(() => {
    if (customerId && customers[customerId as keyof typeof customers]) {
      setCustomer(customers[customerId as keyof typeof customers])
    }

    if (productIds) {
      const productIdArray = productIds.split(",")
      const selectedProds = productIdArray.map((id) => products[id as keyof typeof products]).filter(Boolean)
      setSelectedProducts(selectedProds)
    }
  }, [customerId, productIds]) // Use extracted values instead of searchParams object

  const addAgendaItem = () => {
    if (newAgendaItem.trim()) {
      setAgendaItems([...agendaItems, newAgendaItem.trim()])
      setNewAgendaItem("")
    }
  }

  const removeAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index))
  }

  const generateAgenda = () => {
    const autoItems = [
      "Review customer portfolio performance and investment history",
      "Present recommended financial products based on risk profile",
      "Discuss fee structures and minimum investment requirements",
      "Plan asset allocation strategy and rebalancing schedule",
    ]
    setAgendaItems([...agendaItems, ...autoItems])
  }

  const sendMeetingInvite = () => {
    // In real app, this would send an actual email
    alert("Meeting invite sent successfully!")
    router.push("/meetings")
  }

  if (!customer) {
    return <div className="p-8">Loading customer data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h3 className="text-lg font-semibold">Creating agenda for {customer.name}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Customer Data & Products */}
        <div className="space-y-6">
          {/* Customer Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.company}</p>
                <p className="text-sm font-medium mt-2">Total Invested: ${customer.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Investment History</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customer.purchases}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                      <Bar dataKey="amount" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recommended Products
              </CardTitle>
              <CardDescription>Financial products to discuss in the meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${product.price}</div>
                    </div>
                  </div>
                ))}
                {selectedProducts.length === 0 && <p className="text-sm text-muted-foreground">No products selected</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Agenda Creation */}
        <div className="space-y-6">
          {/* Meeting Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Meeting Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    value={meetingDetails.title}
                    onChange={(e) => setMeetingDetails({ ...meetingDetails, title: e.target.value })}
                    placeholder="Enter meeting title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Meeting Type</Label>
                  <Select
                    value={meetingDetails.type}
                    onValueChange={(value) => setMeetingDetails({ ...meetingDetails, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={meetingDetails.date}
                    onChange={(e) => setMeetingDetails({ ...meetingDetails, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={meetingDetails.time}
                    onChange={(e) => setMeetingDetails({ ...meetingDetails, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Select
                    value={meetingDetails.duration}
                    onValueChange={(value) => setMeetingDetails({ ...meetingDetails, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                      <SelectItem value="90">90 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agenda Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Meeting Agenda
              </CardTitle>
              <CardDescription>Build your meeting agenda with key discussion points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAgendaItem}
                  onChange={(e) => setNewAgendaItem(e.target.value)}
                  placeholder="Add agenda item..."
                  onKeyPress={(e) => e.key === "Enter" && addAgendaItem()}
                />
                <Button onClick={addAgendaItem} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={generateAgenda} variant="outline" size="sm">
                Generate Smart Agenda
              </Button>
              <div className="space-y-2">
                {agendaItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{item}</span>
                    <Button onClick={() => removeAgendaItem(index)} variant="ghost" size="sm">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {agendaItems.length === 0 && <p className="text-sm text-muted-foreground">No agenda items added yet</p>}
              </div>
            </CardContent>
          </Card>

          {/* Meeting Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={meetingDetails.notes}
                onChange={(e) => setMeetingDetails({ ...meetingDetails, notes: e.target.value })}
                placeholder="Add any additional notes or preparation items..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button onClick={sendMeetingInvite} className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Meeting Invite
                </Button>
                <Button variant="outline" onClick={() => router.push("/meetings")}>
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
