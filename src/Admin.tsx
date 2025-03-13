import { useState } from "react"
import {
  Bell,
  Building,
  Calendar,
  ChevronDown,
  Construction,
  Droplet,
  FileText,
  Filter,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Shield,
  User,
  UserPlus,
  Users,
  Zap,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const blocksData = [
  {
    id: "A",
    name: "Block A",
    totalHouseholds: 24,
    waterConsumption: 4320,
    electricityConsumption: 5280,
    incidents: 3,
    underRenovation: 2,
    upcomingRenovation: 1,
    underConstruction: 1,
  },
  {
    id: "B",
    name: "Block B",
    totalHouseholds: 32,
    waterConsumption: 5760,
    electricityConsumption: 7040,
    incidents: 5,
    underRenovation: 3,
    upcomingRenovation: 2,
    underConstruction: 0,
  },
  {
    id: "C",
    name: "Block C",
    totalHouseholds: 28,
    waterConsumption: 5040,
    electricityConsumption: 6160,
    incidents: 2,
    underRenovation: 1,
    upcomingRenovation: 3,
    underConstruction: 2,
  },
  {
    id: "D",
    name: "Block D",
    totalHouseholds: 20,
    waterConsumption: 3600,
    electricityConsumption: 4400,
    incidents: 1,
    underRenovation: 0,
    upcomingRenovation: 2,
    underConstruction: 1,
  },
]

const householdsData = [
  {
    id: "A1",
    blockId: "A",
    address: "A1 Sugbo St",
    occupants: 4,
    waterConsumption: 180,
    electricityConsumption: 220,
    status: "Occupied",
    paymentStatus: "Paid",
  },
  {
    id: "A2",
    blockId: "A",
    address: "A2 Sugbo St",
    occupants: 3,
    waterConsumption: 150,
    electricityConsumption: 190,
    status: "Under Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "A3",
    blockId: "A",
    address: "A3 Sugbo St",
    occupants: 5,
    waterConsumption: 200,
    electricityConsumption: 240,
    status: "Occupied",
    paymentStatus: "Overdue",
  },
  {
    id: "B1",
    blockId: "B",
    address: "B1 Sugbo St",
    occupants: 4,
    waterConsumption: 170,
    electricityConsumption: 210,
    status: "Upcoming Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "B2",
    blockId: "B",
    address: "B2 Sugbo St",
    occupants: 2,
    waterConsumption: 120,
    electricityConsumption: 160,
    status: "Under Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "C1",
    blockId: "C",
    address: "C1 Sugbo St",
    occupants: 6,
    waterConsumption: 220,
    electricityConsumption: 280,
    status: "Under Construction",
    paymentStatus: "N/A",
  },
  {
    id: "D1",
    blockId: "D",
    address: "D1 Sugbo St",
    occupants: 0,
    waterConsumption: 0,
    electricityConsumption: 0,
    status: "Upcoming Construction",
    paymentStatus: "N/A",
  },
]

const incidentsData = [
  {
    id: 1,
    blockId: "A",
    householdId: "A3",
    type: "Security",
    description: "Suspicious person near house",
    date: "2024-03-10",
    status: "Resolved",
  },
  {
    id: 2,
    blockId: "B",
    householdId: "B1",
    type: "Maintenance",
    description: "Water pipe leakage affecting neighboring houses",
    date: "2024-03-12",
    status: "In Progress",
  },
  {
    id: 3,
    blockId: "A",
    householdId: "A2",
    type: "Noise",
    description: "Excessive noise from renovation",
    date: "2024-03-08",
    status: "Resolved",
  },
  {
    id: 4,
    blockId: "B",
    householdId: "B2",
    type: "Security",
    description: "Gate left open overnight",
    date: "2024-03-11",
    status: "Resolved",
  },
  {
    id: 5,
    blockId: "C",
    householdId: "C1",
    type: "Construction",
    description: "Construction debris not properly disposed",
    date: "2024-03-09",
    status: "In Progress",
  },
]

const paymentLogsData = [
  {
    id: 1,
    blockId: "A",
    householdId: "A1",
    type: "Utilities",
    amount: 4400,
    date: "2024-03-05",
    status: "Paid",
  },
  {
    id: 2,
    blockId: "A",
    householdId: "A2",
    type: "Utilities",
    amount: 3800,
    date: "2024-03-07",
    status: "Paid",
  },
  {
    id: 3,
    blockId: "A",
    householdId: "A3",
    type: "Utilities",
    amount: 4800,
    date: "2024-03-15",
    status: "Overdue",
  },
  {
    id: 4,
    blockId: "B",
    householdId: "B1",
    type: "Utilities",
    amount: 4200,
    date: "2024-03-06",
    status: "Paid",
  },
  {
    id: 5,
    blockId: "B",
    householdId: "B2",
    type: "Utilities",
    amount: 3200,
    date: "2024-03-08",
    status: "Paid",
  },
]

const newResidentsData = [
  {
    id: 1,
    name: "John Doe",
    householdId: "A4",
    moveInDate: "2024-03-01",
    previousAddress: "Cebu City",
    contactNumber: "09123456789",
  },
  {
    id: 2,
    name: "Jane Smith",
    householdId: "B3",
    moveInDate: "2024-03-05",
    previousAddress: "Mandaue City",
    contactNumber: "09987654321",
  },
  {
    id: 3,
    name: "Mark Johnson",
    householdId: "C2",
    moveInDate: "2024-03-10",
    previousAddress: "Lapu-Lapu City",
    contactNumber: "09456789123",
  },
]

const securityAssignmentsData = [
  {
    id: 1,
    location: "Main Entrance",
    guard: "Robert Garcia",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 2,
    location: "Main Entrance",
    guard: "Michael Santos",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
  {
    id: 3,
    location: "Main Entrance",
    guard: "James Rodriguez",
    shift: "Night (10PM-6AM)",
    status: "Off Duty",
  },
  {
    id: 4,
    location: "Exit 1",
    guard: "Carlos Reyes",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 5,
    location: "Exit 1",
    guard: "David Martinez",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
  {
    id: 6,
    location: "Exit 2",
    guard: "Juan Dela Cruz",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 7,
    location: "Exit 2",
    guard: "Pedro Sanchez",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
]

// Component for the statistics card
const StatCard = ({ icon, title, value, description, color }: any) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

// Component for block card
const BlockCard = ({ block, onClick, isActive }: any) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isActive ? "border-primary border-2" : ""}`}
      onClick={() => onClick(block)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{block.name}</CardTitle>
        <CardDescription>{block.totalHouseholds} households</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <span>{block.waterConsumption} m³</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>{block.electricityConsumption} kWh</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>{block.incidents} incidents</span>
          </div>
          <div className="flex items-center gap-2">
            <Construction className="h-4 w-4 text-orange-500" />
            <span>{block.underRenovation + block.upcomingRenovation + block.underConstruction} construction</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Component for household card
const getStatusColor = (status: string) => {
  switch (status) {
    case "Under Renovation":
      return "bg-orange-100 text-orange-700"
    case "Upcoming Renovation":
      return "bg-yellow-100 text-yellow-700"
    case "Under Construction":
      return "bg-purple-100 text-purple-700"
    case "Upcoming Construction":
      return "bg-blue-100 text-blue-700"
    default:
      return "bg-green-100 text-green-700"
  }
}

const HouseholdCard = ({ household, onClick, isActive }: any) => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Overdue":
        return "bg-red-100 text-red-700"
      case "N/A":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isActive ? "border-primary border-2" : ""}`}
      onClick={() => onClick(household)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{household.id}</CardTitle>
          <Badge className={getStatusColor(household.status)}>{household.status}</Badge>
        </div>
        <CardDescription>{household.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <span>{household.waterConsumption} m³</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>{household.electricityConsumption} kWh</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-500" />
            <span>{household.occupants} occupants</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <Badge className={getPaymentStatusColor(household.paymentStatus)}>{household.paymentStatus}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Notification Dialog Component
const NotifyHouseholdDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Bell className="h-4 w-4" />
          Send Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Notification to Households</DialogTitle>
          <DialogDescription>Send an announcement or notification to selected households or blocks.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="notification-type">Notification Type</Label>
            <Select defaultValue="announcement">
              <SelectTrigger id="notification-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="maintenance">Maintenance Notice</SelectItem>
                <SelectItem value="payment">Payment Reminder</SelectItem>
                <SelectItem value="emergency">Emergency Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Select defaultValue="all">
              <SelectTrigger id="recipients">
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Households</SelectItem>
                <SelectItem value="block-a">Block A</SelectItem>
                <SelectItem value="block-b">Block B</SelectItem>
                <SelectItem value="block-c">Block C</SelectItem>
                <SelectItem value="block-d">Block D</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter notification subject" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Enter your notification message..." rows={5} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select defaultValue="normal">
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Send Notification</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Admin Dashboard Component
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedBlock, setSelectedBlock] = useState<any>(null)
  const [selectedHousehold, setSelectedHousehold] = useState<any>(null)
  const [view, setView] = useState("blocks") // blocks, households, household-details

  // Calculate totals for dashboard
  const totalBlocks = blocksData.length
  const totalHouseholds = blocksData.reduce((sum, block) => sum + block.totalHouseholds, 0)
  const totalWaterConsumption = blocksData.reduce((sum, block) => sum + block.waterConsumption, 0)
  const totalElectricityConsumption = blocksData.reduce((sum, block) => sum + block.electricityConsumption, 0)
  const totalIncidents = incidentsData.length
  const totalUnderRenovation = blocksData.reduce((sum, block) => sum + block.underRenovation, 0)
  const totalUpcomingRenovation = blocksData.reduce((sum, block) => sum + block.upcomingRenovation, 0)
  const totalUnderConstruction = blocksData.reduce((sum, block) => sum + block.underConstruction, 0)

  // Handle block selection
  const handleBlockSelect = (block: any) => {
    setSelectedBlock(block)
    setSelectedHousehold(null)
    setView("households")
  }

  // Handle household selection
  const handleHouseholdSelect = (household: any) => {
    setSelectedHousehold(household)
    setView("household-details")
  }

  // Handle back navigation
  const handleBack = () => {
    if (view === "household-details") {
      setView("households")
      setSelectedHousehold(null)
    } else if (view === "households") {
      setView("blocks")
      setSelectedBlock(null)
    }
  }

  // Filter households by selected block
  const filteredHouseholds = selectedBlock
    ? householdsData.filter((household) => household.blockId === selectedBlock.id)
    : householdsData

  // Filter payment logs by selected block or household
  const filteredPaymentLogs = selectedHousehold
    ? paymentLogsData.filter((log) => log.householdId === selectedHousehold.id)
    : selectedBlock
      ? paymentLogsData.filter((log) => log.blockId === selectedBlock.id)
      : paymentLogsData

  // Filter incidents by selected block or household
  const filteredIncidents = selectedHousehold
    ? incidentsData.filter((incident) => incident.householdId === selectedHousehold.id)
    : selectedBlock
      ? incidentsData.filter((incident) => incident.blockId === selectedBlock.id)
      : incidentsData

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-6">
            <div className="flex items-center gap-2 font-semibold mt-2.5">
              <span>Welcome, Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeTab === "blocks"}
                      onClick={() => {
                        setActiveTab("blocks")
                        setView("blocks")
                        setSelectedBlock(null)
                        setSelectedHousehold(null)
                      }}
                    >
                      <Building className="h-4 w-4" />
                      <span>Blocks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "households"} onClick={() => setActiveTab("households")}>
                      <Home className="h-4 w-4" />
                      <span>Households</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "payments"} onClick={() => setActiveTab("payments")}>
                      <FileText className="h-4 w-4" />
                      <span>Payments</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "incidents"} onClick={() => setActiveTab("incidents")}>
                      <AlertTriangle className="h-4 w-4" />
                      <span>Incidents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeTab === "construction"}
                      onClick={() => setActiveTab("construction")}
                    >
                      <Construction className="h-4 w-4" />
                      <span>Construction</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "residents"} onClick={() => setActiveTab("residents")}>
                      <UserPlus className="h-4 w-4" />
                      <span>New Residents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "security"} onClick={() => setActiveTab("security")}>
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@subdivision.com</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-7xl">
            <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
              <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
                  </div>
                  <NotifyHouseholdDialog />
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>

            <main className="container mx-auto py-6 px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 w-full">
                <TabsList className="grid grid-cols-4 md:w-[600px] w-full mx-auto">
                  <TabsTrigger value="dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="blocks">
                    <Building className="h-4 w-4 mr-2" />
                    Blocks
                  </TabsTrigger>
                  <TabsTrigger value="households">
                    <Home className="h-4 w-4 mr-2" />
                    Households
                  </TabsTrigger>
                  <TabsTrigger value="payments">
                    <FileText className="h-4 w-4 mr-2" />
                    Payments
                  </TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4 w-full">
                    <StatCard
                      icon={<Building className="h-4 w-4 text-white" />}
                      title="Total Blocks"
                      value={totalBlocks}
                      description="Total number of blocks in the subdivision"
                      color="bg-blue-500"
                    />
                    <StatCard
                      icon={<Home className="h-4 w-4 text-white" />}
                      title="Total Households"
                      value={totalHouseholds}
                      description="Total number of households across all blocks"
                      color="bg-green-500"
                    />
                    <StatCard
                      icon={<AlertTriangle className="h-4 w-4 text-white" />}
                      title="Total Incidents"
                      value={totalIncidents}
                      description="Reported incidents in the subdivision"
                      color="bg-red-500"
                    />
                    <StatCard
                      icon={<Construction className="h-4 w-4 text-white" />}
                      title="Under Construction"
                      value={totalUnderConstruction + totalUnderRenovation + totalUpcomingRenovation}
                      description="Houses under construction or renovation"
                      color="bg-orange-500"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Utility Consumption Overview</CardTitle>
                        <CardDescription>Total water and electricity consumption by block</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {blocksData.map((block) => (
                            <div key={block.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{block.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {block.totalHouseholds} households
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Droplet className="h-4 w-4 text-blue-500" />
                                    <span>Water</span>
                                  </div>
                                  <span>{block.waterConsumption} m³</span>
                                </div>
                                <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${(block.waterConsumption / totalWaterConsumption) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-yellow-500" />
                                    <span>Electricity</span>
                                  </div>
                                  <span>{block.electricityConsumption} kWh</span>
                                </div>
                                <div className="h-2 w-full bg-yellow-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-500 rounded-full"
                                    style={{
                                      width: `${(block.electricityConsumption / totalElectricityConsumption) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Construction & Renovation Status</CardTitle>
                        <CardDescription>Houses under construction or scheduled for renovation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                              <span>Under Renovation</span>
                            </div>
                            <span className="font-medium">{totalUnderRenovation}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                              <span>Upcoming Renovation</span>
                            </div>
                            <span className="font-medium">{totalUpcomingRenovation}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                              <span>Under Construction</span>
                            </div>
                            <span className="font-medium">{totalUnderConstruction}</span>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium">Recent Construction Updates</h4>
                            <div className="space-y-2">
                              {householdsData
                                .filter((h) => h.status !== "Occupied")
                                .slice(0, 3)
                                .map((household) => (
                                  <div key={household.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Home className="h-4 w-4 text-gray-500" />
                                      <span>
                                        {household.id} - {household.address}
                                      </span>
                                    </div>
                                    <Badge
                                      className={
                                        household.status === "Under Renovation"
                                          ? "bg-orange-100 text-orange-700"
                                          : household.status === "Upcoming Renovation"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-purple-100 text-purple-700"
                                      }
                                    >
                                      {household.status}
                                    </Badge>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Incidents</CardTitle>
                        <CardDescription>Latest reported incidents in the subdivision</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {incidentsData.slice(0, 4).map((incident) => (
                            <div key={incident.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                              <div
                                className={`p-2 rounded-full ${
                                  incident.type === "Security"
                                    ? "bg-red-100"
                                    : incident.type === "Maintenance"
                                      ? "bg-blue-100"
                                      : incident.type === "Noise"
                                        ? "bg-yellow-100"
                                        : "bg-purple-100"
                                }`}
                              >
                                <AlertTriangle
                                  className={`h-4 w-4 ${
                                    incident.type === "Security"
                                      ? "text-red-500"
                                      : incident.type === "Maintenance"
                                        ? "text-blue-500"
                                        : incident.type === "Noise"
                                          ? "text-yellow-500"
                                          : "text-purple-500"
                                  }`}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{incident.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {incident.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{incident.date}</span>
                                  <Badge
                                    className={
                                      incident.status === "Resolved"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
                                  >
                                    {incident.status}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {incident.blockId}-{incident.householdId}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("incidents")}>
                          View All Incidents
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>New Residents</CardTitle>
                        <CardDescription>Recently moved-in residents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {newResidentsData.map((resident) => (
                            <div key={resident.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                              <Avatar>
                                <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{resident.name}</p>
                                <p className="text-sm text-muted-foreground">House ID: {resident.householdId}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">Moved in: {resident.moveInDate}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("residents")}>
                          View All New Residents
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                {/* Blocks Tab */}
                <TabsContent value="blocks" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Blocks Management</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Block
                      </Button>
                    </div>
                  </div>

                  {view === "blocks" && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {blocksData.map((block) => (
                        <BlockCard
                          key={block.id}
                          block={block}
                          onClick={handleBlockSelect}
                          isActive={selectedBlock?.id === block.id}
                        />
                      ))}
                    </div>
                  )}

                  {view === "households" && selectedBlock && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" size="sm" onClick={handleBack}>
                          <ChevronDown className="h-4 w-4 rotate-90 mr-2" />
                          Back to Blocks
                        </Button>
                        <h3 className="text-lg font-medium">
                          {selectedBlock.name} - {filteredHouseholds.length} Households
                        </h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredHouseholds.map((household) => (
                          <HouseholdCard
                            key={household.id}
                            household={household}
                            onClick={handleHouseholdSelect}
                            isActive={selectedHousehold?.id === household.id}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {view === "household-details" && selectedHousehold && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" size="sm" onClick={handleBack}>
                          <ChevronDown className="h-4 w-4 rotate-90 mr-2" />
                          Back to Households
                        </Button>
                        <h3 className="text-lg font-medium">
                          Household {selectedHousehold.id} - {selectedHousehold.address}
                        </h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Household Information</CardTitle>
                            <CardDescription>{selectedHousehold.address}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <div className="space-y-4">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Block</span>
                                    <span className="font-medium">{selectedHousehold.blockId}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">House ID</span>
                                    <span className="font-medium">{selectedHousehold.id}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        className={
                                          selectedHousehold.status === "Under Renovation"
                                            ? "bg-orange-100 text-orange-700"
                                            : selectedHousehold.status === "Upcoming Renovation"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : selectedHousehold.status === "Under Construction"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-green-100 text-green-700"
                                        }
                                      >
                                        {selectedHousehold.status}
                                      </Badge>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            Change Status
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Update House Status</DialogTitle>
                                            <DialogDescription>
                                              Change the current status of {selectedHousehold.id} -{" "}
                                              {selectedHousehold.address}
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                              <Label htmlFor="status">Status</Label>
                                              <Select defaultValue={selectedHousehold.status}>
                                                <SelectTrigger id="status">
                                                  <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="Occupied">Occupied</SelectItem>
                                                  <SelectItem value="Under Renovation">Under Renovation</SelectItem>
                                                  <SelectItem value="Upcoming Renovation">
                                                    Upcoming Renovation
                                                  </SelectItem>
                                                  <SelectItem value="Under Construction">Under Construction</SelectItem>
                                                  <SelectItem value="Upcoming Construction">
                                                    Upcoming Construction
                                                  </SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="notes">Notes</Label>
                                              <Textarea id="notes" placeholder="Add any relevant notes..." />
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="start-date">Start Date (if applicable)</Label>
                                              <Input id="start-date" type="date" />
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="end-date">Expected End Date</Label>
                                              <Input id="end-date" type="date" />
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="submit">Update Status</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Occupants</span>
                                    <span className="font-medium">{selectedHousehold.occupants}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="space-y-4">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Water Consumption</span>
                                    <div className="flex items-center gap-2">
                                      <Droplet className="h-4 w-4 text-blue-500" />
                                      <span className="font-medium">{selectedHousehold.waterConsumption} m³</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Electricity Consumption</span>
                                    <div className="flex items-center gap-2">
                                      <Zap className="h-4 w-4 text-yellow-500" />
                                      <span className="font-medium">
                                        {selectedHousehold.electricityConsumption} kWh
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <Badge
                                      className={
                                        selectedHousehold.paymentStatus === "Overdue"
                                          ? "bg-red-100 text-red-700"
                                          : selectedHousehold.paymentStatus === "N/A"
                                            ? "bg-gray-100 text-gray-700"
                                            : "bg-green-100 text-green-700"
                                      }
                                    >
                                      {selectedHousehold.paymentStatus}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="flex gap-2 w-full">
                              <Button variant="outline" className="flex-1">
                                Edit Details
                              </Button>
                              <Button className="flex-1">Send Notification</Button>
                            </div>
                          </CardFooter>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {filteredIncidents.length > 0 ? (
                                filteredIncidents.map((incident) => (
                                  <div key={incident.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                                    <div
                                      className={`p-2 rounded-full ${
                                        incident.type === "Security"
                                          ? "bg-red-100"
                                          : incident.type === "Maintenance"
                                            ? "bg-blue-100"
                                            : incident.type === "Noise"
                                              ? "bg-yellow-100"
                                              : "bg-purple-100"
                                      }`}
                                    >
                                      <AlertTriangle
                                        className={`h-4 w-4 ${
                                          incident.type === "Security"
                                            ? "text-red-500"
                                            : incident.type === "Maintenance"
                                              ? "text-blue-500"
                                              : incident.type === "Noise"
                                                ? "text-yellow-500"
                                                : "text-purple-500"
                                        }`}
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{incident.description}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {incident.type}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{incident.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                  No incidents reported for this household
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Payment History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredPaymentLogs.length > 0 ? (
                                filteredPaymentLogs.map((payment) => (
                                  <TableRow key={payment.id}>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>{payment.type}</TableCell>
                                    <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Badge
                                        className={
                                          payment.status === "Overdue"
                                            ? "bg-red-100 text-red-700"
                                            : payment.status === "N/A"
                                              ? "bg-gray-100 text-gray-700"
                                              : "bg-green-100 text-green-700"
                                        }
                                      >
                                        {payment.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center">
                                    No payment records found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>

                {/* Households Tab */}
                <TabsContent value="households" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">All Households</h2>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Block" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blocks</SelectItem>
                          {blocksData.map((block) => (
                            <SelectItem key={block.id} value={block.id}>
                              {block.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Household
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {householdsData.map((household) => (
                      <HouseholdCard
                        key={household.id}
                        household={household}
                        onClick={(household : any) => {
                          setSelectedHousehold(household)
                          setView("household-details")
                        }}
                        isActive={selectedHousehold?.id === household.id}
                      />
                    ))}
                  </div>
                  {view === "household-details" && selectedHousehold && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setView("blocks")
                            setSelectedHousehold(null)
                          }}
                        >
                          <ChevronDown className="h-4 w-4 rotate-90 mr-2" />
                          Back to Households
                        </Button>
                        <h3 className="text-lg font-medium">
                          Household {selectedHousehold.id} - {selectedHousehold.address}
                        </h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Household Information</CardTitle>
                            <CardDescription>{selectedHousehold.address}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <div className="space-y-4">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Block</span>
                                    <span className="font-medium">{selectedHousehold.blockId}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">House ID</span>
                                    <span className="font-medium">{selectedHousehold.id}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        className={
                                          selectedHousehold.status === "Under Renovation"
                                            ? "bg-orange-100 text-orange-700"
                                            : selectedHousehold.status === "Upcoming Renovation"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : selectedHousehold.status === "Under Construction"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-green-100 text-green-700"
                                        }
                                      >
                                        {selectedHousehold.status}
                                      </Badge>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            Change Status
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Update House Status</DialogTitle>
                                            <DialogDescription>
                                              Change the current status of {selectedHousehold.id} -{" "}
                                              {selectedHousehold.address}
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                              <Label htmlFor="status">Status</Label>
                                              <Select defaultValue={selectedHousehold.status}>
                                                <SelectTrigger id="status">
                                                  <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="Occupied">Occupied</SelectItem>
                                                  <SelectItem value="Under Renovation">Under Renovation</SelectItem>
                                                  <SelectItem value="Upcoming Renovation">
                                                    Upcoming Renovation
                                                  </SelectItem>
                                                  <SelectItem value="Under Construction">Under Construction</SelectItem>
                                                  <SelectItem value="Upcoming Construction">
                                                    Upcoming Construction
                                                  </SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="notes">Notes</Label>
                                              <Textarea id="notes" placeholder="Add any relevant notes..." />
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="submit">Update Status</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Occupants</span>
                                    <span className="font-medium">{selectedHousehold.occupants}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="space-y-4">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Water Consumption</span>
                                    <div className="flex items-center gap-2">
                                      <Droplet className="h-4 w-4 text-blue-500" />
                                      <span className="font-medium">{selectedHousehold.waterConsumption} m³</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Electricity Consumption</span>
                                    <div className="flex items-center gap-2">
                                      <Zap className="h-4 w-4 text-yellow-500" />
                                      <span className="font-medium">
                                        {selectedHousehold.electricityConsumption} kWh
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <Badge
                                      className={
                                        selectedHousehold.paymentStatus === "Overdue"
                                          ? "bg-red-100 text-red-700"
                                          : selectedHousehold.paymentStatus === "N/A"
                                            ? "bg-gray-100 text-gray-700"
                                            : "bg-green-100 text-green-700"
                                      }
                                    >
                                      {selectedHousehold.paymentStatus}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="flex gap-2 w-full">
                              <Button variant="outline" className="flex-1">
                                Edit Details
                              </Button>
                              <Button className="flex-1">Send Notification</Button>
                            </div>
                          </CardFooter>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {filteredIncidents.length > 0 ? (
                                filteredIncidents.map((incident) => (
                                  <div key={incident.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                                    <div
                                      className={`p-2 rounded-full ${
                                        incident.type === "Security"
                                          ? "bg-red-100"
                                          : incident.type === "Maintenance"
                                            ? "bg-blue-100"
                                            : incident.type === "Noise"
                                              ? "bg-yellow-100"
                                              : "bg-purple-100"
                                      }`}
                                    >
                                      <AlertTriangle
                                        className={`h-4 w-4 ${
                                          incident.type === "Security"
                                            ? "text-red-500"
                                            : incident.type === "Maintenance"
                                              ? "text-blue-500"
                                              : incident.type === "Noise"
                                                ? "text-yellow-500"
                                                : "text-purple-500"
                                        }`}
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{incident.description}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {incident.type}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{incident.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                  No incidents reported for this household
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Payment History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredPaymentLogs.length > 0 ? (
                                filteredPaymentLogs.map((payment) => (
                                  <TableRow key={payment.id}>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>{payment.type}</TableCell>
                                    <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Badge
                                        className={
                                          payment.status === "Overdue"
                                            ? "bg-red-100 text-red-700"
                                            : payment.status === "N/A"
                                              ? "bg-gray-100 text-gray-700"
                                              : "bg-green-100 text-green-700"
                                        }
                                      >
                                        {payment.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center">
                                    No payment records found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Payment Logs</h2>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Block" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blocks</SelectItem>
                          {blocksData.map((block) => (
                            <SelectItem key={block.id} value={block.id}>
                              {block.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Household</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paymentLogsData.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>
                                {payment.blockId}-{payment.householdId}
                              </TableCell>
                              <TableCell>{payment.type}</TableCell>
                              <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    payment.status === "Overdue"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-green-100 text-green-700"
                                  }
                                >
                                  {payment.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Incidents Tab */}
                <TabsContent value="incidents" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Incidents</h2>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Incident
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Household</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {incidentsData.map((incident) => (
                            <TableRow key={incident.id}>
                              <TableCell>{incident.date}</TableCell>
                              <TableCell>
                                {incident.blockId}-{incident.householdId}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{incident.type}</Badge>
                              </TableCell>
                              <TableCell>{incident.description}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    incident.status === "Resolved"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }
                                >
                                  {incident.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Construction Tab */}
                <TabsContent value="construction" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Construction & Renovation</h2>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="under-renovation">Under Renovation</SelectItem>
                          <SelectItem value="upcoming-renovation">Upcoming Renovation</SelectItem>
                          <SelectItem value="under-construction">Under Construction</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Construction
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="bg-orange-50">
                        <CardTitle className="flex items-center gap-2">
                          <Construction className="h-5 w-5 text-orange-500" />
                          Under Renovation
                        </CardTitle>
                        <CardDescription>Currently being renovated</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {householdsData
                            .filter((h) => h.status === "Under Renovation")
                            .map((household) => (
                              <div
                                key={household.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">
                                    {household.id} - {household.address}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Block {household.blockId}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-yellow-50">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-yellow-500" />
                          Upcoming Renovation
                        </CardTitle>
                        <CardDescription>Scheduled for renovation</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {householdsData
                            .filter((h) => h.status === "Upcoming Renovation")
                            .map((household) => (
                              <div
                                key={household.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">
                                    {household.id} - {household.address}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Block {household.blockId}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-purple-50">
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-purple-500" />
                          Under Construction
                        </CardTitle>
                        <CardDescription>New houses being built</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {householdsData
                            .filter((h) => h.status === "Under Construction")
                            .map((household) => (
                              <div
                                key={household.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">
                                    {household.id} - {household.address}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Block {household.blockId}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* New Residents Tab */}
                <TabsContent value="residents" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">New Residents</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Resident
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Household</TableHead>
                            <TableHead>Move-in Date</TableHead>
                            <TableHead>Previous Address</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {newResidentsData.map((resident) => (
                            <TableRow key={resident.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{resident.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{resident.householdId}</TableCell>
                              <TableCell>{resident.moveInDate}</TableCell>
                              <TableCell>{resident.previousAddress}</TableCell>
                              <TableCell>{resident.contactNumber}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome Package Status</CardTitle>
                      <CardDescription>Track welcome packages for new residents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {newResidentsData.map((resident) => (
                          <div
                            key={resident.id}
                            className="flex items-center justify-between pb-4 border-b last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{resident.name}</p>
                                <p className="text-sm text-muted-foreground">House ID: {resident.householdId}</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Security Management</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Assign Guard
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Main Entrance</CardTitle>
                        <CardDescription>Security assignments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {securityAssignmentsData
                            .filter((s) => s.location === "Main Entrance")
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">{assignment.guard}</p>
                                  <p className="text-sm text-muted-foreground">{assignment.shift}</p>
                                </div>
                                <Badge
                                  className={
                                    assignment.status === "On Duty"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {assignment.status}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Exit 1</CardTitle>
                        <CardDescription>Security assignments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {securityAssignmentsData
                            .filter((s) => s.location === "Exit 1")
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">{assignment.guard}</p>
                                  <p className="text-sm text-muted-foreground">{assignment.shift}</p>
                                </div>
                                <Badge
                                  className={
                                    assignment.status === "On Duty"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {assignment.status}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Exit 2</CardTitle>
                        <CardDescription>Security assignments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {securityAssignmentsData
                            .filter((s) => s.location === "Exit 2")
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-center justify-between pb-4 border-b last:border-0"
                              >
                                <div>
                                  <p className="font-medium">{assignment.guard}</p>
                                  <p className="text-sm text-muted-foreground">{assignment.shift}</p>
                                </div>
                                <Badge
                                  className={
                                    assignment.status === "On Duty"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {assignment.status}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Security Incidents</CardTitle>
                      <CardDescription>Security-related incidents in the subdivision</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {incidentsData
                            .filter((i) => i.type === "Security")
                            .map((incident) => (
                              <TableRow key={incident.id}>
                                <TableCell>{incident.date}</TableCell>
                                <TableCell>
                                  {incident.blockId}-{incident.householdId}
                                </TableCell>
                                <TableCell>{incident.description}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      incident.status === "Resolved"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
                                  >
                                    {incident.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboard