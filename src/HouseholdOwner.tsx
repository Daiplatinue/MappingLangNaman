import type React from "react"

import { useState } from "react"
import { Home, Droplet, Zap, Users, AlertTriangle, FileText, Bell, Send, BarChart3, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const householdData = {
  id: "A3",
  address: "A3 Sugbo St",
  blockName: "Sugbo GK Village Block A",
  blockNumber: "A",
  occupants: 5,
  yearBuilt: 2010,
  waterConsumption: {
    current: 180,
    previous: 165,
    history: [150, 155, 160, 165, 170, 180],
  },
  electricityConsumption: {
    current: 220,
    previous: 210,
    history: [190, 195, 200, 205, 210, 220],
  },
  waterPayment: {
    current: 1800,
    rate: 10,
    threshold: 150,
    exceededRate: 15,
  },
  electricityPayment: {
    current: 2640,
    rate: 12,
    threshold: 200,
    exceededRate: 18,
  },
  paymentLogs: [
    {
      id: 1,
      type: "Utilities",
      amount: 4170,
      date: "2024-02-15",
      status: "Paid",
      details: "Water: 165m³ (₱1,650), Electricity: 210kWh (₱2,520)",
    },
    {
      id: 2,
      type: "Utilities",
      amount: 3950,
      date: "2024-01-15",
      status: "Paid",
      details: "Water: 155m³ (₱1,550), Electricity: 200kWh (₱2,400)",
    },
    {
      id: 3,
      type: "Utilities",
      amount: 3750,
      date: "2023-12-15",
      status: "Paid",
      details: "Water: 150m³ (₱1,500), Electricity: 195kWh (₱2,250)",
    },
    {
      id: 4,
      type: "Association Dues",
      amount: 500,
      date: "2024-02-01",
      status: "Paid",
      details: "Monthly subdivision maintenance fee",
    },
  ],
  requests: [
    { id: 1, type: "Maintenance", status: "Completed", date: "2023-12-15", description: "Water pipe leakage" },
    { id: 2, type: "Utility", status: "Pending", date: "2024-03-01", description: "Electricity meter check" },
  ],
  incidents: [
    { id: 1, type: "Security", status: "Resolved", date: "2023-11-10", description: "Suspicious person near house" },
  ],
}

const ConsumptionCard = ({
  icon,
  title,
  value,
  unit,
  change,
  color,
  payment,
  threshold,
  rate,
  exceededRate,
}: {
  icon: React.ReactNode
  title: string
  value: number
  unit: string
  change: number
  color: string
  payment: number
  threshold: number
  rate: number
  exceededRate: number
}) => {
  const isIncrease = change > 0
  const isExceeded = value > threshold

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
        <p className={`text-xs ${isIncrease ? "text-red-500" : "text-green-500"} flex items-center gap-1 mt-1`}>
          {isIncrease ? "↑" : "↓"} {Math.abs(change)}% from last month
        </p>

        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Payment:</span>
            <span className="font-bold">₱{payment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">Rate:</span>
            <span className="text-xs">
              ₱{rate}/unit{" "}
              {isExceeded && (
                <span className="text-red-500">
                  ↑ ₱{exceededRate}/unit over {threshold}
                </span>
              )}
            </span>
          </div>

          {isExceeded && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              Usage exceeds threshold of {threshold} {unit.split("/")[0]}. Higher rate applied.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const RequestCard = ({
  item,
}: {
  item: { id: number; type: string; status: string; date: string; description: string }
  type: "request" | "incident"
}) => {
  return (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">{item.type}</CardTitle>
            <Badge
              variant={item.status === "Pending" ? "outline" : item.status === "Completed" ? "default" : "secondary"}
            >
              {item.status}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{item.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="ml-auto">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

const EmergencyRequestDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 bg-red-500 hover:bg-red-600">
          <AlertTriangle className="h-4 w-4" />
          Emergency Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Emergency Request</DialogTitle>
          <DialogDescription>This will be sent immediately to the community management team.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="emergency-type">Emergency Type</Label>
            <Select defaultValue="medical">
              <SelectTrigger id="emergency-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical Emergency</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="security">Security Threat</SelectItem>
                <SelectItem value="utility">Critical Utility Failure</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="emergency-description">Brief Description</Label>
            <Textarea id="emergency-description" placeholder="Describe the emergency situation..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-number">Contact Number</Label>
            <Input id="contact-number" placeholder="Your contact number" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-red-500 hover:bg-red-600">
            Submit Emergency Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const NewRequestDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <FileText className="h-4 w-4" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit New Request</DialogTitle>
          <DialogDescription>Fill out the form to submit a new request to the management.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="request-type">Request Type</Label>
            <Select defaultValue="maintenance">
              <SelectTrigger id="request-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="request-description">Description</Label>
            <Textarea id="request-description" placeholder="Describe your request..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preferred-date">Preferred Date (if applicable)</Label>
            <Input id="preferred-date" type="date" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ReportIncidentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Bell className="h-4 w-4" />
          Report Incident
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report an Incident</DialogTitle>
          <DialogDescription>Report any incidents or issues in the community.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="incident-type">Incident Type</Label>
            <Select defaultValue="security">
              <SelectTrigger id="incident-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="noise">Noise Complaint</SelectItem>
                <SelectItem value="property">Property Damage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="incident-date">Date & Time of Incident</Label>
            <Input id="incident-date" type="datetime-local" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="incident-description">Description</Label>
            <Textarea id="incident-description" placeholder="Describe the incident..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="incident-location">Location</Label>
            <Input id="incident-location" placeholder="Where did this happen?" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Component
function HouseholdOwner() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const waterChange =
    ((householdData.waterConsumption.current - householdData.waterConsumption.previous) /
      householdData.waterConsumption.previous) *
    100
  const electricityChange =
    ((householdData.electricityConsumption.current - householdData.electricityConsumption.previous) /
      householdData.electricityConsumption.previous) *
    100

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Household Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10">
              House ID: {JSON.parse(localStorage.getItem("users") || '{"hid":""}').hid}
            </Badge>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px] w-full">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="requests">
              <Send className="h-4 w-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="house">
              <Home className="h-4 w-4 mr-2" />
              House Details
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <ConsumptionCard
                icon={<Droplet className="h-4 w-4 text-white" />}
                title="Water Consumption"
                value={householdData.waterConsumption.current}
                unit="m³/month"
                change={waterChange}
                color="bg-blue-500"
                payment={householdData.waterPayment.current}
                threshold={householdData.waterPayment.threshold}
                rate={householdData.waterPayment.rate}
                exceededRate={householdData.waterPayment.exceededRate}
              />
              <ConsumptionCard
                icon={<Zap className="h-4 w-4 text-white" />}
                title="Electricity Consumption"
                value={householdData.electricityConsumption.current}
                unit="kWh/month"
                change={electricityChange}
                color="bg-yellow-500"
                payment={householdData.electricityPayment.current}
                threshold={householdData.electricityPayment.threshold}
                rate={householdData.electricityPayment.rate}
                exceededRate={householdData.electricityPayment.exceededRate}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Consumption History</CardTitle>
                <CardDescription>Last 6 months of utility usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {householdData.waterConsumption.history.map((value, index) => (
                    <div key={`water-${index}`} className="relative flex flex-col items-center">
                      <div
                        className="w-8 bg-blue-500 rounded-t-sm"
                        style={{ height: `${(value / 200) * 150}px` }}
                      ></div>
                      <div
                        className="w-8 bg-yellow-500 rounded-t-sm absolute bottom-0 left-0 z-10"
                        style={{
                          height: `${(householdData.electricityConsumption.history[index] / 250) * 150}px`,
                          opacity: 0.7,
                        }}
                      ></div>
                      <span className="text-xs mt-1">M{index + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-xs">Water</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                    <span className="text-xs">Electricity</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <EmergencyRequestDialog />
              <NewRequestDialog />
              <ReportIncidentDialog />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...householdData.requests, ...householdData.incidents]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 3)
                      .map((item) => (
                        <div key={`activity-${item.id}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div
                            className={`p-2 rounded-full ${item.type === "Security" ? "bg-red-100" : "bg-blue-100"}`}
                          >
                            {item.type === "Security" ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <FileText className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {householdData.paymentLogs.slice(0, 4).map((payment) => (
                      <div
                        key={`payment-${payment.id}`}
                        className="flex items-center justify-between pb-3 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              payment.type === "Utilities" ? "bg-primary/10" : "bg-gray-100"
                            }`}
                          >
                            {payment.type === "Utilities" ? (
                              <Home className="h-4 w-4 text-primary" />
                            ) : (
                              <Home className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{payment.type}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{payment.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₱{payment.amount.toLocaleString()}</p>
                          <Badge variant="outline" className="bg-green-50 text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      View All Payments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Requests & Incidents</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Phone className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Community Emergency Line</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>
                  <Button variant="destructive">Call Now</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-3">My Requests</h3>
                {householdData.requests.length > 0 ? (
                  householdData.requests.map((request) => (
                    <RequestCard key={`request-${request.id}`} item={request} type="request" />
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">No requests found</CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Reported Incidents</h3>
                {householdData.incidents.length > 0 ? (
                  householdData.incidents.map((incident) => (
                    <RequestCard key={`incident-${incident.id}`} item={incident} type="incident" />
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">No incidents reported</CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* House Details Tab */}
          <TabsContent value="house" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>House Information</CardTitle>
                <CardDescription>
                  {householdData.address}, Block {householdData.blockNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src="https://cdn.pixabay.com/photo/2022/03/19/02/04/building-7077718_1280.jpg"
                      alt="House"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Block</span>
                        <span className="font-medium">{householdData.blockNumber}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">House ID</span>
                        <span className="font-medium">{householdData.id}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Year Built</span>
                        <span className="font-medium">{householdData.yearBuilt}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Occupants</span>
                        <span className="font-medium">{householdData.occupants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Address</h3>
                      <p className="text-muted-foreground">{householdData.address}</p>
                      <p className="text-muted-foreground">{householdData.blockName}</p>
                      <p className="text-muted-foreground">Deca Homes Tunghaan Subdivision</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Utilities</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Water Meter ID</span>
                          <span>WM-{householdData.id}-2010</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Electric Meter ID</span>
                          <span>EM-{householdData.id}-2010</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Community</h3>
                      <p className="text-muted-foreground">
                        Part of {householdData.blockName}, established in {householdData.yearBuilt}.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Occupants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: householdData.occupants }).map((_, index) => (
                      <div key={`occupant-${index}`} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Occupant {index + 1}</p>
                          <p className="text-xs text-muted-foreground">
                            {index === 0 ? "Primary Resident" : "Family Member"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-500" />
                        <span>Water Bill</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        Paid
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Electricity Bill</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        Paid
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        <span>Association Dues</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50">
                        Due in 5 days
                      </Badge>
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      View Payment History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default HouseholdOwner