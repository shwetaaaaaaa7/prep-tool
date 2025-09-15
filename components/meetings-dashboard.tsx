"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Plus, Video, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"

// Mock meetings data
const upcomingMeetings = [
  {
    id: "1",
    title: "Q2 Product Review",
    customer: "Sarah Johnson",
    customerCompany: "Johnson Retail Store",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "60 minutes",
    type: "video",
    status: "confirmed",
    agenda: ["Review Q1 performance", "Discuss new smart home line", "Pricing negotiations"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Spring Collection Preview",
    customer: "Michael Chen",
    customerCompany: "Chen Enterprises",
    date: "2024-01-22",
    time: "2:00 PM",
    duration: "45 minutes",
    type: "in-person",
    status: "pending",
    agenda: ["Spring collection showcase", "Volume discount discussion", "Delivery timeline"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Partnership Discussion",
    customer: "Emily Rodriguez",
    customerCompany: "Modern Home Solutions",
    date: "2024-01-25",
    time: "11:30 AM",
    duration: "90 minutes",
    type: "phone",
    status: "confirmed",
    agenda: ["Long-term partnership terms", "Exclusive product lines", "Marketing collaboration"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pastMeetings = [
  {
    id: "4",
    title: "Holiday Order Planning",
    customer: "David Thompson",
    customerCompany: "Thompson Decor",
    date: "2024-01-15",
    time: "3:00 PM",
    duration: "30 minutes",
    type: "video",
    status: "completed",
    outcome: "Placed $15K order for holiday season",
    nextSteps: ["Send invoice", "Schedule delivery", "Follow up in 2 weeks"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    title: "Product Demo",
    customer: "Sarah Johnson",
    customerCompany: "Johnson Retail Store",
    date: "2024-01-10",
    time: "1:00 PM",
    duration: "45 minutes",
    type: "in-person",
    status: "completed",
    outcome: "Very interested in smart curtain system",
    nextSteps: ["Send detailed proposal", "Arrange installation demo", "Schedule follow-up"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function MeetingsDashboard() {
  const router = useRouter()
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)

  const totalMeetings = upcomingMeetings.length + pastMeetings.length
  const confirmedMeetings = upcomingMeetings.filter((m) => m.status === "confirmed").length
  const pendingMeetings = upcomingMeetings.filter((m) => m.status === "pending").length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMeetings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedMeetings}</div>
            <p className="text-xs text-muted-foreground">Ready to go</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingMeetings}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Meeting Management</h3>
        <Button onClick={() => router.push("/agenda/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Agenda
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled meetings and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={meeting.avatar || "/placeholder.svg"} alt={meeting.customer} />
                        <AvatarFallback>
                          {meeting.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">{meeting.customer}</p>
                        <p className="text-xs text-muted-foreground">{meeting.customerCompany}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(meeting.type)}
                        <Badge variant={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Meetings</CardTitle>
              <CardDescription>Completed meetings and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={meeting.avatar || "/placeholder.svg"} alt={meeting.customer} />
                          <AvatarFallback>
                            {meeting.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{meeting.title}</h3>
                          <p className="text-sm text-muted-foreground">{meeting.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{meeting.date}</div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm">Outcome:</h4>
                        <p className="text-sm text-muted-foreground">{meeting.outcome}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Next Steps:</h4>
                        <ul className="text-sm text-muted-foreground">
                          {meeting.nextSteps?.map((step, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Visual overview of your meeting schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6 // Start from a Sunday
                  const hasMeeting = upcomingMeetings.some((meeting) => meeting.date.split("-")[2] === day.toString())
                  return (
                    <div
                      key={i}
                      className={`aspect-square p-2 border rounded-lg text-center text-sm ${
                        day > 0 && day <= 31
                          ? hasMeeting
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted cursor-pointer"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day > 0 && day <= 31 ? day : ""}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedMeeting.title}</CardTitle>
                  <CardDescription>
                    {selectedMeeting.customer} • {selectedMeeting.customerCompany}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMeeting(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Meeting Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {selectedMeeting.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {selectedMeeting.time} ({selectedMeeting.duration})
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(selectedMeeting.type)}
                      {selectedMeeting.type}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge variant={getStatusColor(selectedMeeting.status)} className="mb-2">
                    {selectedMeeting.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Agenda</h4>
                <ul className="space-y-1">
                  {selectedMeeting.agenda.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 pt-4">
                <Button size="sm">Join Meeting</Button>
                <Button size="sm" variant="outline">
                  Edit Agenda
                </Button>
                <Button size="sm" variant="outline">
                  Send Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
