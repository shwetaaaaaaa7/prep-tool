"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, TrendingUp, Star } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function CustomerLeftPanel({ customer }: { customer: any }) {
  return (
    <div className="space-y-6">
      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
              <AvatarFallback className="text-lg">
                {customer.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">"{customer.nickname}"</p>
              <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.education}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Customer since {customer.joinDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Notes</CardTitle>
          <CardDescription>Key insights for better customer relationships</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-green-600 mb-2">Likes</h4>
            <div className="flex flex-wrap gap-2">
              {customer.notes.likes.map((like: string, index: number) => (
                <Badge key={index} variant="outline" className="text-green-600 border-green-200">
                  {like}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-red-600 mb-2">Dislikes</h4>
            <div className="flex flex-wrap gap-2">
              {customer.notes.dislikes.map((dislike: string, index: number) => (
                <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                  {dislike}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {customer.notes.interests.map((interest: string, index: number) => (
                <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Key Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{customer.keyHighlights.totalOrders}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                ${customer.keyHighlights.averageOrderValue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Avg Order Value</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">${customer.totalSpent.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <div className="text-2xl font-bold text-primary">{customer.keyHighlights.loyaltyScore}</div>
              <div className="text-sm text-muted-foreground">/10</div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Preferred Categories</h4>
            <div className="flex flex-wrap gap-2">
              {customer.keyHighlights.preferredCategories.map((category: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Engagements</CardTitle>
          <CardDescription>All interactions and touchpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customer.engagements.map((engagement: any) => (
              <div key={engagement.id} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline">{engagement.type}</Badge>
                  <span className="text-sm text-muted-foreground">{engagement.date}</span>
                </div>
                <h4 className="font-medium">{engagement.subject}</h4>
                <p className="text-sm text-muted-foreground mt-1">{engagement.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>Monthly spending over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customer.purchases}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Line type="monotone" dataKey="amount" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
