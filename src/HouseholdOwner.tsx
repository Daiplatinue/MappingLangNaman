import type React from "react"

import { useState } from "react"
import {
  Home,
  Droplet,
  Zap,
  Users,
  AlertTriangle,
  FileText,
  Bell,
  Send,
  BarChart3,
  Phone,
  Map,
  Info,
  Eye,
  ChevronDown,
} from "lucide-react"

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
  const [showDetails, setShowDetails] = useState(false)
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
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-2 text-sm"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <span>View Payment Details</span>
            <span className="font-bold">{showDetails ? "Hide" : "Show"}</span>
          </Button>

          {showDetails && (
            <div className="mt-2 p-3 border rounded-md bg-background/95 animate-in fade-in-50 duration-200">
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

              <Button className="w-full mt-3 text-sm" size="sm">
                Pay Online Now
              </Button>
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


const OnlinePaymentDialog = ({ setActiveTab }: { setActiveTab: (value: string) => void }) => {
  const [paymentType, setPaymentType] = useState("utilities")
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleProcessPayment = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        setActiveTab("payment-logs")
      }, 3000)
    }, 2000)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Pay Online</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Online Payment</DialogTitle>
            <DialogDescription>Complete your payment securely online.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger id="payment-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilities">Utilities (₱4,440)</SelectItem>
                  <SelectItem value="water">Water Only (₱1,800)</SelectItem>
                  <SelectItem value="electricity">Electricity Only (₱2,640)</SelectItem>
                  <SelectItem value="association">Association Dues (₱500)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm">Amount to Pay:</span>
                <span className="font-bold">
                  ₱
                  {paymentType === "utilities"
                    ? "4,440"
                    : paymentType === "water"
                      ? "1,800"
                      : paymentType === "electricity"
                        ? "2,640"
                        : "500"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">Processing Fee:</span>
                <span className="text-xs">₱20.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total:</span>
                <span className="font-bold">
                  ₱
                  {paymentType === "utilities"
                    ? "4,460"
                    : paymentType === "water"
                      ? "1,820"
                      : paymentType === "electricity"
                        ? "2,660"
                        : "520"}
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-name">Name on Card</Label>
              <Input id="card-name" placeholder="John Doe" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={handleProcessPayment} disabled={isProcessing}>
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing Payment...
                </div>
              ) : (
                "Process Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-center text-muted-foreground mb-4">
              Your payment has been processed successfully. A receipt has been sent to your email.
            </p>
            <div className="p-4 bg-green-50 border border-green-100 rounded-md w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Transaction ID:</span>
                <span className="font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Amount:</span>
                <span className="font-bold">
                  ₱
                  {paymentType === "utilities"
                    ? "4,460"
                    : paymentType === "water"
                      ? "1,820"
                      : paymentType === "electricity"
                        ? "2,660"
                        : "520"}
                </span>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground">Redirecting to payment logs...</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Main Component
function HouseholdOwner() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showDashboardDetails, setShowDashboardDetails] = useState(false)

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
            <h1 className="text-xl font-bold">Subdivision Mapping</h1>
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
        <div className="flex items-center mb-4">
          <div className="flex-1 flex items-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <TabsList className="h-auto p-1">
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-1">
                      <TabsTrigger value="dashboard" className="px-3 py-1.5">
                        <BarChart3 className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Dashboard</span>
                      </TabsTrigger>
                      <TabsTrigger value="requests" className="px-3 py-1.5">
                        <Send className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Requests</span>
                      </TabsTrigger>
                      <TabsTrigger value="house" className="px-3 py-1.5">
                        <Home className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">House</span>
                      </TabsTrigger>
                      <TabsTrigger value="emergency" className="px-3 py-1.5">
                        <AlertTriangle className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Emergency</span>
                      </TabsTrigger>
                      <TabsTrigger value="new-request" className="px-3 py-1.5">
                        <FileText className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">New Request</span>
                      </TabsTrigger>
                      <TabsTrigger value="report" className="px-3 py-1.5">
                        <Bell className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Report</span>
                      </TabsTrigger>
                      <TabsTrigger value="payment-logs" className="px-3 py-1.5">
                        <FileText className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Payments</span>
                      </TabsTrigger>
                    </div>
                  </TabsList>

                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 gap-2"
                    onClick={() => setShowDashboardDetails(!showDashboardDetails)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">{showDashboardDetails ? "Hide Consumptions" : "Show Consumptions"}</span>
                  </Button>
                </div>

                {/* Dashboard Details Panel */}
                {showDashboardDetails && (
                  <div className="p-4 border rounded-lg animate-in fade-in-50 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Household Dashboard</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowDashboardDetails(false)}
                      >
                        <span>Hide</span>
                        <ChevronDown className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>

                    <div className="space-y-4">
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
                    </div>
                  </div>
                )}

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
                    <div className="relative z-10">
                      <div className="grid gap-4 md:grid-cols-2 items-center">
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Subdivision Mapping</h1>
                          <p className="text-muted-foreground mb-4">
                            Your comprehensive solution for managing and visualizing community resources, utilities, and
                            services in your neighborhood.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <OnlinePaymentDialog setActiveTab={setActiveTab} />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="relative w-full max-w-sm aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative h-full flex items-center justify-center">
                              <Map className="h-32 w-32 text-primary" strokeWidth={1} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Mapping</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Interactive maps of your subdivision with detailed information about facilities, services, and
                          infrastructure.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Map className="h-4 w-4" />
                          Explore Map
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Utility Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Track and manage your household utilities including water, electricity, and waste management
                          services.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Zap className="h-4 w-4" />
                          View Utilities
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Access community services, report incidents, and stay connected with your neighborhood.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Users className="h-4 w-4" />
                          Community Hub
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Features</CardTitle>
                      <CardDescription>Discover what Subdivision Mapping can do for you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Map className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Interactive Mapping</h3>
                            <p className="text-sm text-muted-foreground">
                              Visualize your community with interactive maps showing facilities, services, and
                              infrastructure.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Droplet className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Utility Tracking</h3>
                            <p className="text-sm text-muted-foreground">
                              Monitor water and electricity usage with detailed analytics and payment management.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Incident Reporting</h3>
                            <p className="text-sm text-muted-foreground">
                              Report and track community incidents, maintenance requests, and security concerns.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Community Engagement</h3>
                            <p className="text-sm text-muted-foreground">
                              Connect with neighbors, access community resources, and participate in local events.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <Info className="h-4 w-4" />
                        Learn More About Our System
                      </Button>
                    </CardFooter>
                  </Card>
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
                          <CardContent className="py-8 text-center text-muted-foreground">
                            No requests found
                          </CardContent>
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
                          <CardContent className="py-8 text-center text-muted-foreground">
                            No incidents reported
                          </CardContent>
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

                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <Button variant="outline">View History</Button>
                            <OnlinePaymentDialog setActiveTab={setActiveTab} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Emergency Request Tab */}
                <TabsContent value="emergency" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Emergency Request</h2>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>

                  <Card className="border-red-200">
                    <CardHeader className="bg-red-50 border-b border-red-100">
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Submit Emergency Request
                      </CardTitle>
                      <CardDescription className="text-red-600">
                        This will be sent immediately to the community management team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
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
                          <Textarea
                            id="emergency-description"
                            placeholder="Describe the emergency situation..."
                            className="min-h-[120px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="contact-number">Contact Number</Label>
                          <Input id="contact-number" placeholder="Your contact number" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                        Submit Emergency Request
                      </Button>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between w-full">
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
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* New Request Tab */}
                <TabsContent value="new-request" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Submit New Request</h2>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        New Request Form
                      </CardTitle>
                      <CardDescription>Fill out the form to submit a new request to the management.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
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
                          <Textarea
                            id="request-description"
                            placeholder="Describe your request..."
                            className="min-h-[120px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="preferred-date">Preferred Date (if applicable)</Label>
                          <Input id="preferred-date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="request-location">Location</Label>
                          <Input id="request-location" placeholder="Where is this request for?" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="request-priority">Priority</Label>
                          <Select defaultValue="normal">
                            <SelectTrigger id="request-priority">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        Submit Request
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Report Incident Tab */}
                <TabsContent value="report" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Report an Incident</h2>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Incident Report Form
                      </CardTitle>
                      <CardDescription>Report any incidents or issues in the community.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
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
                          <Textarea
                            id="incident-description"
                            placeholder="Describe the incident..."
                            className="min-h-[120px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="incident-location">Location</Label>
                          <Input id="incident-location" placeholder="Where did this happen?" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="incident-witnesses">Witnesses (if any)</Label>
                          <Input id="incident-witnesses" placeholder="Names of any witnesses" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="incident-severity">Severity</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger id="incident-severity">
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        Submit Report
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Payment Logs Tab */}
                <TabsContent value="payment-logs" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Payment History</h2>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Download All Receipts
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Payments</CardTitle>
                      <CardDescription>View and manage your payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add the new payment at the top */}
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-green-100">
                              <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {new Date().toLocaleDateString()} <Badge className="ml-2 bg-green-500">New</Badge>
                              </p>
                              <p className="text-sm text-muted-foreground">Utilities Payment</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₱4,460.00</p>
                            <div className="flex gap-2 mt-1">
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                View Receipt
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Existing payments */}
                        {householdData.paymentLogs.map((payment) => (
                          <div
                            key={`payment-log-${payment.id}`}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${payment.type === "Utilities" ? "bg-primary/10" : "bg-gray-100"}`}
                              >
                                {payment.type === "Utilities" ? (
                                  <Home className="h-5 w-5 text-primary" />
                                ) : (
                                  <Home className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{payment.date}</p>
                                <p className="text-sm text-muted-foreground">{payment.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₱{payment.amount.toLocaleString()}</p>
                              <div className="flex gap-2 mt-1">
                                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                  View Receipt
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total Payments (2024)</span>
                            <span className="font-bold">₱12,570.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Monthly Payment</span>
                            <span className="font-bold">₱4,190.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Next Payment Due</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">₱500.00</span>
                              <Badge variant="outline" className="bg-yellow-50">
                                Due in 5 days
                              </Badge>
                            </div>
                          </div>
                          <Separator />
                          <div className="pt-2">
                            <Button variant="outline" className="w-full">
                              Set Up Automatic Payments
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Credit Card</p>
                                <p className="text-xs text-muted-foreground">**** **** **** 4321</p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-green-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">E-Wallet</p>
                                <p className="text-xs text-muted-foreground">Connected Account</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Use
                            </Button>
                          </div>

                          <Button className="w-full">Add Payment Method</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HouseholdOwner