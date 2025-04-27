import type React from "react"

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
import { Tabs, TabsContent } from "@/components/ui/tabs"
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
import { toast } from "sonner"
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
} from "@/components/ui/sidebar"

// Remove the initial data arrays at the top of the file (lines 81-421) and replace with an import
import {
  initialBlocksData,
  initialHouseholdsData,
  initialIncidentsData,
  initialPaymentLogsData,
  initialNewResidentsData,
  initialSecurityAssignmentsData,
  initialUsersData,
} from "./AdminTabs/blocks-data"

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

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedBlock, setSelectedBlock] = useState<any>(null)
  const [selectedHousehold, setSelectedHousehold] = useState<any>(null)
  const [view, setView] = useState("blocks")

  const [blocksData, setBlocksData] = useState(initialBlocksData)
  const [householdsData, setHouseholdsData] = useState(initialHouseholdsData)
  const [incidentsData, setIncidentsData] = useState(initialIncidentsData)
  const [paymentLogsData, setPaymentLogsData] = useState(initialPaymentLogsData)
  const [newResidentsData, setNewResidentsData] = useState(initialNewResidentsData)
  const [securityAssignmentsData, setSecurityAssignmentsData] = useState(initialSecurityAssignmentsData)

  // Add to the AdminDashboard component state declarations
  const [usersData, setUsersData] = useState(initialUsersData)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    referralCode: "",
    blockId: "",
    householdId: "",
    userType: "customer",
  })

  const [isAddHouseholdOpen, setIsAddHouseholdOpen] = useState(false)
  const [newHousehold, setNewHousehold] = useState({
    id: "",
    blockId: "",
    address: "",
    occupants: 0,
    waterConsumption: 0,
    electricityConsumption: 0,
    status: "Occupied",
    paymentStatus: "Paid",
  })

  const [updatedStatus, setUpdatedStatus] = useState("")
  const [statusNotes, setStatusNotes] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Add these state variables to the AdminDashboard component (around line 500)
  const [selectedGuardId, setSelectedGuardId] = useState<number | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedShift, setSelectedShift] = useState<string>("")

  const totalBlocks = blocksData.length
  const totalHouseholds = blocksData.reduce((sum, block) => sum + block.totalHouseholds, 0)
  const totalWaterConsumption = blocksData.reduce((sum, block) => sum + block.waterConsumption, 0)
  const totalElectricityConsumption = blocksData.reduce((sum, block) => sum + block.electricityConsumption, 0)
  const totalIncidents = incidentsData.length
  const totalUnderRenovation = blocksData.reduce((sum, block) => sum + block.underRenovation, 0)
  const totalUpcomingRenovation = blocksData.reduce((sum, block) => sum + block.upcomingRenovation, 0)
  const totalUnderConstruction = blocksData.reduce((sum, block) => sum + block.underConstruction, 0)

  const handleBlockSelect = (block: any) => {
    setSelectedBlock(block)
    setSelectedHousehold(null)
    setView("households")
  }

  const handleHouseholdSelect = (household: any) => {
    setSelectedHousehold(household)
    setView("household-details")
  }

  const handleBack = () => {
    if (view === "household-details") {
      setView("households")
      setSelectedHousehold(null)
    } else if (view === "households") {
      setView("blocks")
      setSelectedBlock(null)
    }
  }

  const filteredHouseholds = selectedBlock
    ? householdsData.filter((household) => household.blockId === selectedBlock.id)
    : householdsData

  const filteredPaymentLogs = selectedHousehold
    ? paymentLogsData.filter((log) => log.householdId === selectedHousehold.id)
    : selectedBlock
      ? paymentLogsData.filter((log) => log.blockId === selectedBlock.id)
      : paymentLogsData

  const filteredIncidents = selectedHousehold
    ? incidentsData.filter((incident) => incident.householdId === selectedHousehold.id)
    : selectedBlock
      ? incidentsData.filter((incident) => incident.blockId === selectedBlock.id)
      : incidentsData

  const handleNewHouseholdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let parsedValue = value

    if (name === "occupants" || name === "waterConsumption" || name === "electricityConsumption") {
      parsedValue = (Number.parseInt(value) || 0).toString()
    }

    setNewHousehold({
      ...newHousehold,
      [name]: parsedValue,
    })
  }

  const handleAddHousehold = () => {
    if (!newHousehold.blockId || !newHousehold.address) {
      toast.error("Please fill in all required fields")
      return
    }

    // Auto-increment household ID based on block
    const blockHouseholds = householdsData.filter((h) => h.blockId === newHousehold.blockId)
    const maxNumber =
      blockHouseholds.length > 0 ? Math.max(...blockHouseholds.map((h) => Number.parseInt(h.id.substring(1)))) : 0
    const newId = `${newHousehold.blockId}${maxNumber + 1}`

    const householdWithDefaults = {
      ...newHousehold,
      id: newId,
      occupants: 0,
      waterConsumption: 0,
      electricityConsumption: 0,
      status: "Occupied",
      paymentStatus: "Paid",
    }

    const updatedHouseholds = [...householdsData, householdWithDefaults]
    setHouseholdsData(updatedHouseholds)

    const updatedBlocks = blocksData.map((block) => {
      if (block.id === newHousehold.blockId) {
        return {
          ...block,
          totalHouseholds: block.totalHouseholds + 1,
          waterConsumption: block.waterConsumption + householdWithDefaults.waterConsumption,
          electricityConsumption: block.electricityConsumption + householdWithDefaults.electricityConsumption,
          underRenovation:
            householdWithDefaults.status === "Under Renovation" ? block.underRenovation + 1 : block.underRenovation,
          upcomingRenovation:
            householdWithDefaults.status === "Upcoming Renovation"
              ? block.upcomingRenovation + 1
              : block.upcomingRenovation,
          underConstruction:
            householdWithDefaults.status === "Under Construction"
              ? block.underConstruction + 1
              : block.underConstruction,
        }
      }
      return block
    })
    setBlocksData(updatedBlocks)

    setNewHousehold({
      id: "",
      blockId: "",
      address: "",
      occupants: 0,
      waterConsumption: 0,
      electricityConsumption: 0,
      status: "Occupied",
      paymentStatus: "Paid",
    })
    setIsAddHouseholdOpen(false)

    toast.success("Household added successfully")
  }

  const handleUpdateHouseholdStatus = () => {
    if (!selectedHousehold || !updatedStatus) {
      toast.error("Please select a status")
      return
    }

    const updatedHouseholds = householdsData.map((household) => {
      if (household.id === selectedHousehold.id) {
        return {
          ...household,
          status: updatedStatus,
        }
      }
      return household
    })
    setHouseholdsData(updatedHouseholds)

    setSelectedHousehold({
      ...selectedHousehold,
      status: updatedStatus,
    })

    const updatedBlocks = blocksData.map((block) => {
      if (block.id === selectedHousehold.blockId) {
        let newUnderRenovation = block.underRenovation
        let newUpcomingRenovation = block.upcomingRenovation
        let newUnderConstruction = block.underConstruction

        if (selectedHousehold.status === "Under Renovation") newUnderRenovation--
        else if (selectedHousehold.status === "Upcoming Renovation") newUpcomingRenovation--
        else if (selectedHousehold.status === "Under Construction") newUnderConstruction--

        if (updatedStatus === "Under Renovation") newUnderRenovation++
        else if (updatedStatus === "Upcoming Renovation") newUpcomingRenovation++
        else if (updatedStatus === "Under Construction") newUnderConstruction++

        return {
          ...block,
          underRenovation: newUnderRenovation,
          upcomingRenovation: newUpcomingRenovation,
          underConstruction: newUnderConstruction,
        }
      }
      return block
    })
    setBlocksData(updatedBlocks)

    setUpdatedStatus("")
    setStatusNotes("")
    setStartDate("")
    setEndDate("")

    toast.success("Household status updated successfully")
  }

  const handleAddIncident = (incident: any) => {
    const newId = Math.max(...incidentsData.map((i) => i.id)) + 1
    const newIncident = {
      ...incident,
      id: newId,
      date: new Date().toISOString().split("T")[0],
      status: "In Progress",
    }

    setIncidentsData([...incidentsData, newIncident])

    const updatedBlocks = blocksData.map((block) => {
      if (block.id === incident.blockId) {
        return {
          ...block,
          incidents: block.incidents + 1,
        }
      }
      return block
    })
    setBlocksData(updatedBlocks)

    toast.success("Incident reported successfully")
  }

  const handleSendNotification = (notification: any) => {
    toast.success(`Notification sent to ${notification.recipients}`)
  }

  // Add the handleAssignUser function after the handleSendNotification function in the AdminDashboard component
  const handleAssignUser = (userId: number, blockId: string, householdId: string) => {
    // Get the user's current household and block
    const user = usersData.find((u) => u.id === userId)
    if (!user) return

    const oldBlockId = user.blockId
    const oldHouseholdId = user.householdId

    // Update the user's assignment
    const updatedUsers = usersData.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          blockId: blockId,
          householdId: householdId,
        }
      }
      return u
    })

    setUsersData(updatedUsers)

    // Update the household occupant count if the user was previously assigned
    if (oldHouseholdId) {
      const updatedHouseholds = householdsData.map((h) => {
        if (h.id === oldHouseholdId) {
          return {
            ...h,
            occupants: Math.max(0, h.occupants - 1),
          }
        }
        return h
      })
      setHouseholdsData(updatedHouseholds)
    }

    // Update the new household occupant count
    if (householdId) {
      const updatedHouseholds = householdsData.map((h) => {
        if (h.id === householdId) {
          return {
            ...h,
            occupants: h.occupants + 1,
          }
        }
        return h
      })
      setHouseholdsData(updatedHouseholds)
    }

    // Show success message
    if (householdId) {
      toast.success(`User assigned to ${householdId}`)
    } else {
      toast.success(`User unassigned from ${oldHouseholdId}`)
    }
  }

  const handleUnassignUser = (userId: number) => {
    handleAssignUser(userId, "", "")
  }

  // Add a function to get available households for a block
  // Add this function after the handleUnassignUser function
  const getAvailableHouseholds = (blockId: string) => {
    // Generate all possible household IDs for the block (A1-A10, B1-B10, etc.)
    return Array.from({ length: 10 }, (_, i) => {
      const num = i + 1
      const id = `${blockId}${num}`

      // Get the current household data if it exists
      const household = householdsData.find((h) => h.id === id)

      // Count occupants assigned to this household
      const occupantCount = usersData.filter((u) => u.householdId === id).length

      return {
        id,
        exists: !!household,
        occupants: occupantCount,
        // If the household exists in our data, use that status, otherwise mark as "Available"
        status: household ? household.status : "Available",
      }
    })
  }

  // Function to generate a random referral code
  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let referralCode = ""
    for (let i = 0; i < 12; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return referralCode
  }

  // Fix the handleAssignGuard function in the AdminDashboard component (around line 1000)
  const handleAssignGuard = (guardId: number, location: string, shift: string) => {
    // Find the guard in the users data
    const guard = usersData.find((u) => u.id === guardId)
    if (!guard) {
      toast.error("Guard not found")
      return
    }

    // Check if there's already an assignment for this location and shift
    const existingAssignment = securityAssignmentsData.find((a) => a.location === location && a.shift === shift)

    if (existingAssignment) {
      // Update the existing assignment
      const updatedAssignments = securityAssignmentsData.map((a) => {
        if (a.location === location && a.shift === shift) {
          return {
            ...a,
            guard: `${guard.firstName} ${guard.lastName}`,
            status: "On Duty",
          }
        }
        return a
      })
      setSecurityAssignmentsData(updatedAssignments)
    } else {
      // Create a new assignment
      const newId = Math.max(...securityAssignmentsData.map((a) => a.id)) + 1
      const newAssignment = {
        id: newId,
        location,
        guard: `${guard.firstName} ${guard.lastName}`,
        shift,
        status: "On Duty",
      }
      setSecurityAssignmentsData([...securityAssignmentsData, newAssignment])
    }

    toast.success(`${guard.firstName} ${guard.lastName} assigned to ${location} for ${shift}`)
  }

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
                  {/* Add to the SidebarMenu inside the Management SidebarGroup */}
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "users"} onClick={() => setActiveTab("users")}>
                      <Users className="h-4 w-4" />
                      <span>Users</span>
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
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
                  </div>
                  <NotifyHouseholdDialog onSendNotification={handleSendNotification} />
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>

            <main className="container mx-auto py-6 px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 w-full">
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
                      <Dialog open={isAddHouseholdOpen} onOpenChange={setIsAddHouseholdOpen}>
                        <DialogTrigger asChild>
                          {/* Update the button text in the blocks tab (around line 1180) */}
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            View/Edit Households
                          </Button>
                        </DialogTrigger>
                        {/* Replace the isAddHouseholdOpen dialog content (around line 1200) to remove the ability to add households
                        and only allow viewing/editing existing ones */}
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>View/Edit Household Details</DialogTitle>
                            <DialogDescription>Select a household to view or edit its details.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="blockId">Block</Label>
                                <Select
                                  name="blockId"
                                  value={newHousehold.blockId}
                                  onValueChange={(value) => setNewHousehold({ ...newHousehold, blockId: value })}
                                >
                                  <SelectTrigger id="blockId">
                                    <SelectValue placeholder="Select block" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {blocksData.map((block) => (
                                      <SelectItem key={block.id} value={block.id}>
                                        {block.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="householdId">Household</Label>
                                <Select
                                  name="householdId"
                                  value={newHousehold.id}
                                  onValueChange={(value) => {
                                    const household = householdsData.find((h) => h.id === value)
                                    if (household) {
                                      setNewHousehold(household)
                                    }
                                  }}
                                  disabled={!newHousehold.blockId}
                                >
                                  <SelectTrigger id="householdId">
                                    <SelectValue placeholder="Select household" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {householdsData
                                      .filter((h) => h.blockId === newHousehold.blockId)
                                      .map((household) => (
                                        <SelectItem key={household.id} value={household.id}>
                                          {household.id} - {household.status}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {newHousehold.id && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="address">Address</Label>
                                  <Input
                                    id="address"
                                    name="address"
                                    placeholder="e.g. A5 Sugbo St"
                                    value={newHousehold.address}
                                    onChange={handleNewHouseholdChange}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                      value={newHousehold.status}
                                      onValueChange={(value) => setNewHousehold({ ...newHousehold, status: value })}
                                    >
                                      <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Occupied">Occupied</SelectItem>
                                        <SelectItem value="Under Renovation">Under Renovation</SelectItem>
                                        <SelectItem value="Upcoming Renovation">Upcoming Renovation</SelectItem>
                                        <SelectItem value="Under Construction">Under Construction</SelectItem>
                                        <SelectItem value="Upcoming Construction">Upcoming Construction</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="paymentStatus">Payment Status</Label>
                                    <Select
                                      value={newHousehold.paymentStatus}
                                      onValueChange={(value) =>
                                        setNewHousehold({ ...newHousehold, paymentStatus: value })
                                      }
                                    >
                                      <SelectTrigger id="paymentStatus">
                                        <SelectValue placeholder="Select payment status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="N/A">N/A</SelectItem>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Overdue">Overdue</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => {
                                if (!newHousehold.id) {
                                  toast.error("Please select a household")
                                  return
                                }

                                // Update the household in the state
                                const updatedHouseholds = householdsData.map((h) => {
                                  if (h.id === newHousehold.id) {
                                    return newHousehold
                                  }
                                  return h
                                })

                                setHouseholdsData(updatedHouseholds)
                                setIsAddHouseholdOpen(false)
                                toast.success("Household updated successfully")
                              }}
                            >
                              Update Household
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
                                              <Select
                                                defaultValue={selectedHousehold.status}
                                                onValueChange={setUpdatedStatus}
                                              >
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
                                              <Textarea
                                                id="notes"
                                                placeholder="Add any relevant notes..."
                                                value={statusNotes}
                                                onChange={(e) => setStatusNotes(e.target.value)}
                                              />
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="start-date">Start Date (if applicable)</Label>
                                              <Input
                                                id="start-date"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                              />
                                            </div>
                                            <div className="grid gap-2">
                                              <Label htmlFor="end-date">Expected End Date</Label>
                                              <Input
                                                id="end-date"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                              />
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="submit" onClick={handleUpdateHouseholdStatus}>
                                              Update Status
                                            </Button>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Incident
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Report New Incident</DialogTitle>
                            <DialogDescription>
                              Fill in the details to report a new incident in the subdivision.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="incident-block">Block</Label>
                                <Select defaultValue="">
                                  <SelectTrigger id="incident-block">
                                    <SelectValue placeholder="Select block" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {blocksData.map((block) => (
                                      <SelectItem key={block.id} value={block.id}>
                                        {block.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="incident-household">Household</Label>
                                <Select defaultValue="">
                                  <SelectTrigger id="incident-household">
                                    <SelectValue placeholder="Select household" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {householdsData.map((household) => (
                                      <SelectItem key={household.id} value={household.id}>
                                        {household.id} - {household.address}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-type">Incident Type</Label>
                              <Select defaultValue="">
                                <SelectTrigger id="incident-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Security">Security</SelectItem>
                                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                                  <SelectItem value="Noise">Noise</SelectItem>
                                  <SelectItem value="Construction">Construction</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-description">Description</Label>
                              <Textarea id="incident-description" placeholder="Describe the incident..." rows={4} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => {
                                const newIncident = {
                                  blockId: "A", // This would come from the form
                                  householdId: "A1", // This would come from the form
                                  type: "Security", // This would come from the form
                                  description: "New incident reported", // This would come from the form
                                }
                                handleAddIncident(newIncident)
                                // Close dialog
                              }}
                            >
                              Report Incident
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
                      {/* Update the security tab dialog to properly assign guards (around line 1800) */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Assign Guard
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Guard to Security Position</DialogTitle>
                            <DialogDescription>Select a guard and assign them to a security position</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="guard">Select Guard</Label>
                              <Select
                                onValueChange={(value) => {
                                  // Store the selected guard ID in a state variable
                                  setSelectedGuardId(Number.parseInt(value))
                                }}
                              >
                                <SelectTrigger id="guard">
                                  <SelectValue placeholder="Select a guard" />
                                </SelectTrigger>
                                <SelectContent>
                                  {usersData
                                    .filter((user) => user.userType === "guard")
                                    .map((guard) => (
                                      <SelectItem key={guard.id} value={guard.id.toString()}>
                                        {guard.firstName} {guard.lastName}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="location">Location</Label>
                              <Select
                                onValueChange={(value) => {
                                  // Store the selected location in a state variable
                                  setSelectedLocation(value)
                                }}
                              >
                                <SelectTrigger id="location">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Main Entrance">Main Entrance</SelectItem>
                                  <SelectItem value="Exit 1">Exit 1</SelectItem>
                                  <SelectItem value="Exit 2">Exit 2</SelectItem>
                                  <SelectItem value="Block A">Block A</SelectItem>
                                  <SelectItem value="Block B">Block B</SelectItem>
                                  <SelectItem value="Block C">Block C</SelectItem>
                                  <SelectItem value="Block D">Block D</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="shift">Shift</Label>
                              <Select
                                onValueChange={(value) => {
                                  // Store the selected shift in a state variable
                                  setSelectedShift(value)
                                }}
                              >
                                <SelectTrigger id="shift">
                                  <SelectValue placeholder="Select shift" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Morning (6AM-2PM)">Morning (6AM-2PM)</SelectItem>
                                  <SelectItem value="Evening (2PM-10PM)">Evening (2PM-10PM)</SelectItem>
                                  <SelectItem value="Night (10PM-6AM)">Night (10PM-6AM)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                if (!selectedGuardId || !selectedLocation || !selectedShift) {
                                  toast.error("Please select all fields")
                                  return
                                }
                                handleAssignGuard(selectedGuardId, selectedLocation, selectedShift)
                              }}
                            >
                              Assign Guard
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Guard Assignments</CardTitle>
                      <CardDescription>Current security guard assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Location</TableHead>
                                <TableHead>Guard</TableHead>
                                <TableHead>Shift</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {securityAssignmentsData.map((assignment) => (
                                <TableRow key={assignment.id}>
                                  <TableCell>{assignment.location}</TableCell>
                                  <TableCell>{assignment.guard}</TableCell>
                                  <TableCell>{assignment.shift}</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        assignment.status === "On Duty"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-700"
                                      }
                                    >
                                      {assignment.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Available Guards</h4>
                          <div className="space-y-2">
                            {usersData
                              .filter((user) => user.userType === "guard")
                              .map((guard) => (
                                <div key={guard.id} className="flex items-center justify-between p-3 border rounded-md">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {guard.firstName.charAt(0)}
                                        {guard.lastName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <span className="font-medium">
                                        {guard.firstName} {guard.lastName}
                                      </span>
                                      <span className="text-xs block text-muted-foreground">{guard.email}</span>
                                    </div>
                                  </div>
                                  <Badge variant="outline">Guard</Badge>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Add the following TabsContent before the closing Tabs tag */}
                <TabsContent value="users" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add User
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                              Enter the details for the new user to add to the system.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  placeholder="First Name"
                                  value={newUser.firstName}
                                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  placeholder="Last Name"
                                  value={newUser.lastName}
                                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="middleName">Middle Name (Optional)</Label>
                              <Input
                                id="middleName"
                                name="middleName"
                                placeholder="Middle Name"
                                value={newUser.middleName}
                                onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="referralCode">Referral Code (Auto-generated)</Label>
                              <Input
                                id="referralCode"
                                name="referralCode"
                                placeholder="Auto-generated on save"
                                value={newUser.referralCode}
                                disabled
                                className="bg-gray-50"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="userType">User Type</Label>
                              <Select
                                value={newUser.userType}
                                onValueChange={(value) => {
                                  setNewUser({
                                    ...newUser,
                                    userType: value,
                                    // Clear block and household if changing to guard
                                    ...(value === "guard" ? { blockId: "", householdId: "" } : {}),
                                  })
                                }}
                              >
                                <SelectTrigger id="userType">
                                  <SelectValue placeholder="Select user type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="customer">Customer</SelectItem>
                                  <SelectItem value="guard">Guard</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {newUser.userType === "customer" && (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="blockId">Block</Label>
                                  <Select
                                    value={newUser.blockId}
                                    onValueChange={(value) => {
                                      setNewUser({ ...newUser, blockId: value, householdId: "" })
                                    }}
                                  >
                                    <SelectTrigger id="blockId">
                                      <SelectValue placeholder="Select block" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {blocksData.map((block) => (
                                        <SelectItem key={block.id} value={block.id}>
                                          {block.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="householdId">Household ID</Label>
                                  <Select
                                    value={newUser.householdId}
                                    onValueChange={(value) => setNewUser({ ...newUser, householdId: value })}
                                    disabled={!newUser.blockId}
                                  >
                                    <SelectTrigger id="householdId">
                                      <SelectValue placeholder="Select household" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {newUser.blockId &&
                                        getAvailableHouseholds(newUser.blockId).map((household) => (
                                          <SelectItem key={household.id} value={household.id}>
                                            {household.id} - {household.occupants} occupant(s)
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => {
                                if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.userType) {
                                  toast.error("Please fill in all required fields")
                                  return
                                }

                                // For customer type, require block and household
                                if (newUser.userType === "customer" && (!newUser.blockId || !newUser.householdId)) {
                                  toast.error("Please select a block and household for customer users")
                                  return
                                }

                                const newId = usersData.length > 0 ? Math.max(...usersData.map((u) => u.id)) + 1 : 1
                                // Generate a random 12-character referral code
                                const referralCode = generateReferralCode()
                                const updatedUser = {
                                  ...newUser,
                                  id: newId,
                                  referralCode: referralCode,
                                }
                                setUsersData([...usersData, updatedUser])

                                // Update the household occupant count if this is a customer
                                if (newUser.userType === "customer" && newUser.householdId) {
                                  const household = householdsData.find((h) => h.id === newUser.householdId)
                                  if (household) {
                                    const updatedHouseholds = householdsData.map((h) => {
                                      if (h.id === newUser.householdId) {
                                        return {
                                          ...h,
                                          occupants: h.occupants + 1,
                                        }
                                      }
                                      return h
                                    })
                                    setHouseholdsData(updatedHouseholds)
                                  }
                                }

                                setNewUser({
                                  id: 0,
                                  firstName: "",
                                  lastName: "",
                                  middleName: "",
                                  email: "",
                                  referralCode: "",
                                  blockId: "",
                                  householdId: "",
                                  userType: "customer",
                                })
                                setIsAddUserOpen(false)
                                toast.success("User added successfully")
                              }}
                            >
                              Add User
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Referral Code</TableHead>
                            <TableHead>Block</TableHead>
                            <TableHead>Household</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usersData.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {user.firstName.charAt(0)}
                                      {user.lastName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span className="font-medium">
                                      {user.firstName} {user.lastName}
                                    </span>
                                    {user.middleName && (
                                      <span className="text-xs text-muted-foreground ml-1">({user.middleName})</span>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant={user.userType === "guard" ? "secondary" : "default"}>
                                  {user.userType === "guard" ? "Guard" : "Customer"}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.referralCode}</TableCell>
                              <TableCell>{user.blockId ? `Block ${user.blockId}` : "-"}</TableCell>
                              <TableCell>
                                {user.householdId || (user.userType === "guard" ? "N/A" : "Unassigned")}
                              </TableCell>
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
                      <CardTitle>Household Management</CardTitle>
                      <CardDescription>Manage household occupants and assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Home className="h-4 w-4 mr-2" />
                            Manage Household Occupants
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Household Occupants</DialogTitle>
                            <DialogDescription>View and manage occupants assigned to households</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="grid gap-4">
                              <div>
                                <Label className="mb-2 block">Select Block</Label>
                                <Select
                                  value={selectedBlock?.id || ""}
                                  onValueChange={(value) => {
                                    const block = blocksData.find((b) => b.id === value)
                                    setSelectedBlock(block)
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a block" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {blocksData.map((block) => (
                                      <SelectItem key={block.id} value={block.id}>
                                        {block.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                {selectedBlock && (
                                  <div className="mt-4">
                                    <h4 className="font-medium mb-2">Households in {selectedBlock.name}</h4>
                                    <div className="grid gap-2 max-h-[400px] overflow-y-auto">
                                      {getAvailableHouseholds(selectedBlock.id).map((household) => {
                                        const occupants = usersData.filter(
                                          (user) => user.householdId === household.id && user.userType === "customer",
                                        )
                                        const householdData = householdsData.find((h) => h.id === household.id)

                                        return (
                                          <Card
                                            key={household.id}
                                            className={`p-3 ${household.status !== "Occupied" && household.status !== "Available" ? "bg-gray-50" : ""}`}
                                          >
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <div className="flex items-center">
                                                  <span className="font-medium">{household.id}</span>
                                                  {householdData && householdData.status !== "Occupied" && (
                                                    <Badge variant="outline" className="ml-2 text-xs">
                                                      {householdData.status}
                                                    </Badge>
                                                  )}
                                                </div>
                                                <span className="text-sm text-muted-foreground block">
                                                  {occupants.length} occupant{occupants.length !== 1 ? "s" : ""}
                                                </span>
                                                {occupants.length > 0 && (
                                                  <div className="mt-1 text-xs text-muted-foreground">
                                                    {occupants.map((u) => `${u.firstName} ${u.lastName}`).join(", ")}
                                                  </div>
                                                )}
                                              </div>
                                              <Dialog>
                                                <DialogTrigger asChild>
                                                  <Button variant="outline" size="sm">
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Assign
                                                  </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                  <DialogHeader>
                                                    <DialogTitle>Assign Occupants to {household.id}</DialogTitle>
                                                    <DialogDescription>
                                                      Select users to assign to this household
                                                    </DialogDescription>
                                                  </DialogHeader>
                                                  <div className="py-4">
                                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                                      {usersData
                                                        .filter((user) => user.userType === "customer") // Only show customers
                                                        .map((user) => (
                                                          <div
                                                            key={user.id}
                                                            className="flex items-center justify-between p-3 border-b last:border-0"
                                                          >
                                                            <div className="flex items-center gap-2">
                                                              <Avatar className="h-8 w-8">
                                                                <AvatarFallback>
                                                                  {user.firstName.charAt(0)}
                                                                  {user.lastName.charAt(0)}
                                                                </AvatarFallback>
                                                              </Avatar>
                                                              <div>
                                                                <span className="font-medium">
                                                                  {user.firstName} {user.lastName}
                                                                </span>
                                                                <span className="text-xs block text-muted-foreground">
                                                                  {user.email}
                                                                </span>
                                                                {user.householdId &&
                                                                  user.householdId !== household.id && (
                                                                    <span className="text-xs text-amber-600">
                                                                      Currently assigned to {user.householdId}
                                                                    </span>
                                                                  )}
                                                              </div>
                                                            </div>
                                                            <Button
                                                              variant={
                                                                user.householdId === household.id
                                                                  ? "default"
                                                                  : "outline"
                                                              }
                                                              size="sm"
                                                              onClick={() =>
                                                                handleAssignUser(
                                                                  user.id,
                                                                  selectedBlock.id,
                                                                  household.id,
                                                                )
                                                              }
                                                            >
                                                              {user.householdId === household.id
                                                                ? "Assigned"
                                                                : "Assign"}
                                                            </Button>
                                                          </div>
                                                        ))}
                                                    </div>
                                                  </div>
                                                </DialogContent>
                                              </Dialog>
                                            </div>
                                          </Card>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security Guards</CardTitle>
                      <CardDescription>View security guards in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {usersData
                            .filter((user) => user.userType === "guard")
                            .map((guard) => (
                              <div key={guard.id} className="flex items-center justify-between p-3 border rounded-md">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {guard.firstName.charAt(0)}
                                      {guard.lastName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span className="font-medium">
                                      {guard.firstName} {guard.lastName}
                                    </span>
                                    <span className="text-xs block text-muted-foreground">{guard.email}</span>
                                  </div>
                                </div>
                                <Badge variant="outline">Guard</Badge>
                              </div>
                            ))}
                          {usersData.filter((user) => user.userType === "guard").length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                              No security guards in the system
                            </div>
                          )}
                        </div>
                      </div>
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

const NotifyHouseholdDialog = ({ onSendNotification }: { onSendNotification: (notification: any) => void }) => {
  const [notificationType, setNotificationType] = useState("announcement")
  const [recipients, setRecipients] = useState("all")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")

  const handleSendNotification = () => {
    onSendNotification({
      type: notificationType,
      recipients,
      subject,
      message,
      priority,
    })
  }

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
            <Select value={notificationType} onValueChange={setNotificationType}>
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
            <Select value={recipients} onValueChange={setRecipients}>
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
            <Input
              id="subject"
              placeholder="Enter notification subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your notification message..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
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
          <Button type="submit" onClick={handleSendNotification}>
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdminDashboard