import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Popup, useMap, Marker, useMapEvents, Circle, Polygon } from "react-leaflet"
import type L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  Home,
  Calendar,
  Droplet,
  Zap,
  ChevronLeft,
  Info,
  LayoutGrid,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  Save,
  Move,
  Square,
  CircleIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster, toast } from "sonner";

const CENTER_POSITION: [number, number] = [10.249231, 123.78923]
const INITIAL_ZOOM = 18

interface HouseProperties {
  id: string
  address: string
  occupants: number
  yearBuilt: number
  waterConsumption: number
  electricityConsumption: number
}

interface PinProperties {
  id: string
  name: string
  blockNumber: string
  numberOfHouseholds: number
  totalResidents: number
  yearEstablished: number
  type: string
  houses: HouseProperties[]
}

interface Pin {
  position: [number, number]
  properties: PinProperties
}

const pinsData: Pin[] = [
  {
    position: [10.249559, 123.787449],
    properties: {
      id: "Pin1",
      name: "Sugbo GK Village Block A",
      blockNumber: "A",
      numberOfHouseholds: 20,
      totalResidents: 80,
      yearEstablished: 2010,
      type: "Residential",
      houses: [
        {
          id: "A1",
          address: "A1 Sugbo St",
          occupants: 4,
          yearBuilt: 2010,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "A2",
          address: "A2 Sugbo St",
          occupants: 3,
          yearBuilt: 2010,
          waterConsumption: 120,
          electricityConsumption: 180,
        },
      ],
    },
  },
  {
    position: [10.24959, 123.78768],
    properties: {
      id: "Pin2",
      name: "Sugbo GK Village Block B",
      blockNumber: "B",
      numberOfHouseholds: 18,
      totalResidents: 72,
      yearEstablished: 2011,
      type: "Residential",
      houses: [
        {
          id: "B1",
          address: "B1 Sugbo St",
          occupants: 5,
          yearBuilt: 2011,
          waterConsumption: 180,
          electricityConsumption: 220,
        },
        {
          id: "B2",
          address: "B2 Sugbo St",
          occupants: 4,
          yearBuilt: 2011,
          waterConsumption: 140,
          electricityConsumption: 190,
        },
      ],
    },
  },
  {
    position: [10.248255, 123.790373],
    properties: {
      id: "Pin3",
      name: "Sugbo GK Village Block C",
      blockNumber: "C",
      numberOfHouseholds: 15,
      totalResidents: 60,
      yearEstablished: 2012,
      type: "Residential",
      houses: [
        {
          id: "C1",
          address: "C1 Sugbo St",
          occupants: 4,
          yearBuilt: 2012,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
      ],
    },
  },
]

// Sample polygon data
const polygonData = [
  {
    id: "zone1",
    positions: [
      [10.250039, 123.787369],
      [10.250028, 123.787283],
      [10.249163, 123.787508],
      [10.249178, 123.787605],
    ],
    name: "Zone A1",
    type: "Residential Zone",
  },
  {
    id: "zone2",
    positions: [
      [10.250034, 123.787497],
      [10.250055, 123.787578],
      [10.249226, 123.787819],
      [10.249194, 123.787712],
    ],
    name: "Zone A2",
    type: "Residential Zone",
  },

  // Upper middle zones
  {
    id: "zone3",
    positions: [
      [10.249939, 123.788275],
      [10.250139, 123.788962],
      [10.250261, 123.788940],
      [10.250049, 123.788227],
    ],
    name: "Zone B1",
    type: "Residential Zone",
  },
  {
    id: "zone4",
    positions: [
      [10.249822, 123.788329],
      [10.249875, 123.788468],
      [10.249347, 123.788972],
      [10.249236, 123.788881],
    ],
    name: "Zone B2",
    type: "Residential Zone",
  },
  {
    id: "zone5",
    positions: [
      [10.249917, 123.788624],
      [10.249965, 123.788758],
      [10.249522, 123.789160],
      [10.249379, 123.789123],
    ],
    name: "Zone B3",
    type: "Residential Zone",
  },

  // Middle zones
  {
    id: "zone6",
    positions: [
      [10.249991, 123.788913],
      [10.250007, 123.789026],
      [10.249754, 123.789284],
      [10.249622, 123.789219],
    ],
    name: "Zone C1",
    type: "Residential Zone",
  },
  {
    id: "zone7",
    positions: [
      [10.248434, 123.789332],
      [10.248434, 123.789209],
      [10.248867, 123.789187],
      [10.249236, 123.789230],
      [10.249664, 123.789402],
      [10.249595, 123.789514],
      [10.249094, 123.789321]
    ],
    name: "Zone C2",
    type: "Residential Zone",
  },

  // Lower zones (Saint Mary area)
  {
    id: "zone8",
    positions: [
      [10.249532, 123.789659],
      [10.249506, 123.789750],
      [10.248983, 123.789584],
      [10.248455, 123.789605],
      [10.248424, 123.789466],
      [10.248951, 123.789450],
    ],
    name: "Zone D1",
    type: "Residential Zone",
  },
  {
    id: "zone9",
    positions: [
      [10.248619, 123.788833],
      [10.248614, 123.789053],
      [10.248677, 123.789048],
      [10.248687, 123.788828],
    ],
    name: "Zone D2",
    type: "Residential Zone",
  },
  {
    id: "zone10",
    positions: [
      [10.248397, 123.789069],
      [10.248471, 123.789058],
      [10.248487, 123.788822],
      [10.248397, 123.788822],
    ],
    name: "Zone D2",
    type: "Residential Zone",
  },
  {
    id: "zone11",
    positions: [
      [10.248197, 123.789783],
      [10.248170, 123.788822],
      [10.248270, 123.788801],
      [10.248302, 123.789783],
    ],
    name: "Zone D2",
    type: "Residential Zone",
  },
  {
    id: "zone12",
    positions: [
      [10.248603, 123.790990],
      [10.248350, 123.789917],
      [10.248434, 123.789933],
      [10.248719, 123.790957],
    ],
    name: "Zone D2",
    type: "Residential Zone",
  },
  {
    id: "zone13",
    positions: [
      [10.248075, 123.789943],
      [10.248276, 123.790829],
      [10.248424, 123.790823],
      [10.248197, 123.789943],
    ],
    name: "Zone D2",
    type: "Residential Zone",
  },
]

type EditorMode = "view" | "add" | "edit" | "delete" | "draw-polygon" | "draw-circle"

const MapInitializer = () => {
  const map = useMap()

  useEffect(() => {
    if (map) {
      map.setView(CENTER_POSITION, INITIAL_ZOOM)
    }
  }, [map])

  return null
}

const CoordinatesDisplay = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })

  const map = useMapEvents({
    mousemove: (e) => {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })

  return (
    <div className="absolute top-0 left-0 right-0 z-[1000] bg-background/80 backdrop-blur-sm text-xs p-2 flex justify-center">
      Latitude: {position.lat.toFixed(6)} | Longitude: {position.lng.toFixed(6)} | Zoom: {map.getZoom()}
    </div>
  )
}

// Draggable marker for editing mode
const DraggableMarker = ({
  position,
  onDragEnd,
  color = "blue",
}: {
  position: [number, number]
  onDragEnd: (pos: [number, number]) => void
  color?: string
}) => {
  const markerRef = useRef<L.Marker>(null)

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current
      if (marker != null) {
        const newPos = marker.getLatLng()
        onDragEnd([newPos.lat, newPos.lng])
      }
    },
  }

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup>
        <div className="p-2">
          <p className="text-sm">Drag me to adjust position</p>
          <p className="text-xs text-muted-foreground mt-1">
            Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
          </p>
        </div>
      </Popup>
    </Marker>
  )
}

// Custom marker component with animation
const AnimatedMarker = ({
  position,
  properties,
  onClick,
  editable = false,
  onEdit,
  onDelete,
}: {
  position: [number, number]
  properties: PinProperties
  onClick: () => void
  editable?: boolean
  onEdit?: () => void
  onDelete?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Marker
      position={position}
      eventHandlers={{
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false),
      }}
      opacity={isHovered ? 1 : 0.8}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-primary">{properties.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-primary/10">
              Block {properties.blockNumber}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {properties.type}
            </Badge>
          </div>
          <p className="mt-2 text-sm">
            <span className="font-medium">Households:</span> {properties.numberOfHouseholds}
          </p>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => onClick()}>
              View
            </Button>
            {editable && (
              <>
                <Button size="sm" variant="outline" className="flex-1" onClick={onEdit}>
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" className="flex-1" onClick={onDelete}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

// House card component with animation
const HouseCard = ({
  house,
  onClick,
  onEdit,
  onDelete,
  editable = false,
}: {
  house: HouseProperties
  onClick: () => void
  onEdit?: () => void
  onDelete?: () => void
  editable?: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-primary">{house.address}</h3>
          <p className="text-sm text-muted-foreground">ID: {house.id}</p>
        </div>
        <Badge variant={house.occupants > 3 ? "default" : "outline"}>
          {house.occupants} {house.occupants === 1 ? "Occupant" : "Occupants"}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{house.yearBuilt}</span>
        </div>
        <div className="flex items-center gap-1">
          <Droplet className="h-3 w-3 text-blue-500" />
          <span>{house.waterConsumption} m³</span>
        </div>
        <div className="flex items-center gap-1 col-span-2">
          <Zap className="h-3 w-3 text-yellow-500" />
          <span>{house.electricityConsumption} kWh</span>
        </div>
      </div>

      {editable && (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              if (onEdit) onEdit()
            }}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              if (onDelete) onDelete()
            }}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// Stat card component with animation
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-card border rounded-lg p-4"
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-medium text-lg">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Form for adding/editing pins
const PinForm = ({
  pin,
  onSubmit,
  onCancel,
}: {
  pin?: { position: [number, number]; properties: PinProperties }
  onSubmit: (data: { position: [number, number]; properties: PinProperties }) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<{
    position: [number, number]
    properties: PinProperties
  }>(
    pin || {
      position: [0, 0],
      properties: {
        id: `Pin${Date.now()}`,
        name: "",
        blockNumber: "",
        numberOfHouseholds: 0,
        totalResidents: 0,
        yearEstablished: new Date().getFullYear(),
        type: "Residential",
        houses: [],
      },
    },
  )

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      properties: {
        ...prev.properties,
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.properties.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="blockNumber">Block Number</Label>
          <Input
            id="blockNumber"
            value={formData.properties.blockNumber}
            onChange={(e) => handleChange("blockNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfHouseholds">Households</Label>
          <Input
            id="numberOfHouseholds"
            type="number"
            value={formData.properties.numberOfHouseholds}
            onChange={(e) => handleChange("numberOfHouseholds", Number.parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalResidents">Residents</Label>
          <Input
            id="totalResidents"
            type="number"
            value={formData.properties.totalResidents}
            onChange={(e) => handleChange("totalResidents", Number.parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Input
            id="yearEstablished"
            type="number"
            value={formData.properties.yearEstablished}
            onChange={(e) => handleChange("yearEstablished", Number.parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={formData.properties.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(formData)} className="flex-1">
          {pin ? "Update" : "Add"} Pin
        </Button>
      </div>
    </div>
  )
}

// Form for adding/editing houses
const HouseForm = ({
  house,
  onSubmit,
  onCancel,
}: {
  house?: HouseProperties
  onSubmit: (data: HouseProperties) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<HouseProperties>(
    house || {
      id: `House${Date.now()}`,
      address: "",
      occupants: 0,
      yearBuilt: new Date().getFullYear(),
      waterConsumption: 0,
      electricityConsumption: 0,
    },
  )

  const handleChange = (field: keyof HouseProperties, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupants">Occupants</Label>
          <Input
            id="occupants"
            type="number"
            value={formData.occupants}
            onChange={(e) => handleChange("occupants", Number.parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            type="number"
            value={formData.yearBuilt}
            onChange={(e) => handleChange("yearBuilt", Number.parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="waterConsumption">Water (m³)</Label>
          <Input
            id="waterConsumption"
            type="number"
            value={formData.waterConsumption}
            onChange={(e) => handleChange("waterConsumption", Number.parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="electricityConsumption">Electricity (kWh)</Label>
          <Input
            id="electricityConsumption"
            type="number"
            value={formData.electricityConsumption}
            onChange={(e) => handleChange("electricityConsumption", Number.parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(formData)} className="flex-1">
          {house ? "Update" : "Add"} House
        </Button>
      </div>
    </div>
  )
}

// Map Editor Component
export default function MapEditor() {
  const [pins, setPins] = useState<Pin[]>(pinsData)
  const [polygons, setPolygons] = useState(polygonData)
  const [circles, setCircles] = useState<
    { id: string; center: [number, number]; radius: number; name: string; type: string }[]
  >([])

  const [selectedPin, setSelectedPin] = useState<PinProperties | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<HouseProperties | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<(typeof polygonData)[0] | null>(null)
  const [selectedCircle, setSelectedCircle] = useState<(typeof circles)[0] | null>(null)

  const [activeTab, setActiveTab] = useState("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [editorMode, setEditorMode] = useState<EditorMode>("view")

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPin, setEditingPin] = useState<Pin | null>(null)
  const [editingHouse, setEditingHouse] = useState<HouseProperties | null>(null)

  const [tempMarkerPosition, setTempMarkerPosition] = useState<[number, number] | null>(null)
  const [drawingPolygon, setDrawingPolygon] = useState<[number, number][]>([])
  const [drawingCircle, setDrawingCircle] = useState<{ center: [number, number]; radius: number } | null>(null)

  const [showLayers, setShowLayers] = useState({
    pins: true,
    polygons: true,
    circles: true,
  })

  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle map click based on editor mode
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng

    if (editorMode === "add") {
      setTempMarkerPosition([lat, lng])
      setEditingPin(null)
      setIsFormOpen(true)
    } else if (editorMode === "draw-polygon") {
      setDrawingPolygon((prev) => [...prev, [lat, lng]])
    } else if (editorMode === "draw-circle") {
      if (!drawingCircle) {
        setDrawingCircle({ center: [lat, lng], radius: 50 })
      }
    }
  }

  // Handle pin click
  const handlePinClick = (pin: PinProperties) => {
    if (editorMode === "view") {
      setSelectedPin(pin)
      setSelectedHouse(null)
      setActiveTab("overview")
      setIsModalOpen(true)
    } else if (editorMode === "delete") {
      setPins(pins.filter((p) => p.properties.id !== pin.id))
    }
  }

  // Handle house click
  const handleHouseClick = (house: HouseProperties) => {
    if (editorMode === "view") {
      setSelectedHouse(house)
    }
  }

  // Handle edit pin
  const handleEditPin = (pin: PinProperties) => {
    const pinToEdit = pins.find((p) => p.properties.id === pin.id)
    if (pinToEdit) {
      setEditingPin(pinToEdit)
      setIsFormOpen(true)
    }
  }

  // Handle delete pin
  const handleDeletePin = (pin: PinProperties) => {
    setPins(pins.filter((p) => p.properties.id !== pin.id))
  }

  // Handle edit house
  const handleEditHouse = (house: HouseProperties) => {
    setEditingHouse(house)
    setIsFormOpen(true)
  }

  // Handle delete house
  const handleDeleteHouse = (house: HouseProperties) => {
    if (selectedPin) {
      const updatedPins = pins.map((pin) => {
        if (pin.properties.id === selectedPin.id) {
          return {
            ...pin,
            properties: {
              ...pin.properties,
              houses: pin.properties.houses.filter((h) => h.id !== house.id),
            },
          }
        }
        return pin
      })
      setPins(updatedPins)

      // Update selected pin
      const updatedPin = updatedPins.find((p) => p.properties.id === selectedPin.id)
      if (updatedPin) {
        setSelectedPin(updatedPin.properties)
      }
    }
  }

  // Handle add/update pin
  const handlePinFormSubmit = (data: { position: [number, number]; properties: PinProperties }) => {
    if (editingPin) {
      // Update existing pin
      setPins(pins.map((pin) => (pin.properties.id === editingPin.properties.id ? data : pin)))
    } else {
      // Add new pin
      setPins([...pins, data])
    }
    setIsFormOpen(false)
    setTempMarkerPosition(null)
    setEditingPin(null)
    setEditorMode("view")
  }

  // Handle add/update house
  const handleHouseFormSubmit = (data: HouseProperties) => {
    if (selectedPin) {
      if (editingHouse) {
        // Update existing house
        const updatedPins = pins.map((pin) => {
          if (pin.properties.id === selectedPin.id) {
            return {
              ...pin,
              properties: {
                ...pin.properties,
                houses: pin.properties.houses.map((h) => (h.id === editingHouse.id ? data : h)),
              },
            }
          }
          return pin
        })
        setPins(updatedPins)

        // Update selected pin
        const updatedPin = updatedPins.find((p) => p.properties.id === selectedPin.id)
        if (updatedPin) {
          setSelectedPin(updatedPin.properties)
        }
      } else {
        // Add new house
        const updatedPins = pins.map((pin) => {
          if (pin.properties.id === selectedPin.id) {
            return {
              ...pin,
              properties: {
                ...pin.properties,
                houses: [...pin.properties.houses, data],
              },
            }
          }
          return pin
        })
        setPins(updatedPins)

        // Update selected pin
        const updatedPin = updatedPins.find((p) => p.properties.id === selectedPin.id)
        if (updatedPin) {
          setSelectedPin(updatedPin.properties)
        }
      }
    }
    setIsFormOpen(false)
    setEditingHouse(null)
  }

  // Handle complete polygon drawing
  const handleCompletePolygon = () => {
    if (drawingPolygon.length >= 3) {
      const newPolygon = {
        id: `poly${Date.now()}`,
        positions: drawingPolygon,
        name: `Zone ${polygons.length + 1}`,
        type: "New Zone",
      }
      setPolygons([...polygons, newPolygon])
    }
    setDrawingPolygon([])
    setEditorMode("view")
  }

  // Handle complete circle drawing
  const handleCompleteCircle = () => {
    if (drawingCircle) {
      const newCircle = {
        id: `circle${Date.now()}`,
        center: drawingCircle.center,
        radius: drawingCircle.radius,
        name: `Area ${circles.length + 1}`,
        type: "New Area",
      }
      setCircles([...circles, newCircle])
      setDrawingCircle(null)
      setEditorMode("view")
    }
  }

  // Handle circle radius change
  const handleCircleRadiusChange = (value: number[]) => {
    if (drawingCircle) {
      setDrawingCircle({
        ...drawingCircle,
        radius: value[0],
      })
    }
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedPin(null)
      setSelectedHouse(null)
      setSelectedPolygon(null)
      setSelectedCircle(null)
    }, 300)
  }

  // Go back to pin from house view
  const goBackToPin = () => {
    setSelectedHouse(null)
  }

  // Map event handler component
  const MapEventHandler = () => {
    const [editorMode, setEditorMode] = useState<string | null>(null)
    const [tempMarkerPosition, setTempMarkerPosition] = useState<[number, number] | null>(null)
    const [editingPin, setEditingPin] = useState<any>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [drawingPolygon, setDrawingPolygon] = useState<[number, number][]>([])
    const [drawingCircle, setDrawingCircle] = useState<{ center: [number, number]; radius: number } | null>(null)
  
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
  
      if (editorMode === "add") {
        setTempMarkerPosition([lat, lng])
        setEditingPin(null)
        setIsFormOpen(true)
      } else if (editorMode === "draw-polygon") {
        setDrawingPolygon((prev) => [...prev, [lat, lng]])
      } else if (editorMode === "draw-circle") {
        if (!drawingCircle) {
          setDrawingCircle({ center: [lat, lng], radius: 50 })
        }
      }
    }
  
    useMapEvents({
      click: handleMapClick,
      contextmenu: (e) => {
        // Prevent the default context menu
        e.originalEvent.preventDefault()
  
        const { lat, lng } = e.latlng
        const coordsText = `[${lat.toFixed(6)}, ${lng.toFixed(6)}]`
  
        // Copy to clipboard
        navigator.clipboard
          .writeText(coordsText)
          .then(() => {
            toast.success("Coordinates copied!", {
              description: `${coordsText} has been copied to clipboard.`,
              duration: 3000,
            })
          })
          .catch((err) => {
            toast.error("Failed to copy", {
              description: "Could not copy coordinates to clipboard.",
              duration: 3000,
            })
            console.error("Failed to copy: ", err)
          })
      },
    })
  
    return null
  }
  
  // Export data as JSON
  const exportData = () => {
    const data = {
      pins,
      polygons,
      circles,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "map-data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Deca Homes Tunghaan Subdivision Map Editor</h1>
        </div>
      </header>

      {/* Editor Toolbar */}
      <div className="bg-muted/50 border-b p-2">
        <div className="container mx-auto flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "view" ? "default" : "outline"}
                  onClick={() => {
                    setEditorMode("view")
                    setTempMarkerPosition(null)
                    setDrawingPolygon([])
                    setDrawingCircle(null)
                  }}
                >
                  <Move className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TooltipTrigger>
              <TooltipContent>Navigate the map</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "add" ? "default" : "outline"}
                  onClick={() => setEditorMode("add")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pin
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click on map to add a new pin</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "edit" ? "default" : "outline"}
                  onClick={() => setEditorMode("edit")}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit existing pins</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "delete" ? "default" : "outline"}
                  onClick={() => setEditorMode("delete")}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click on pins to delete them</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-px bg-border mx-1"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "draw-polygon" ? "default" : "outline"}
                  onClick={() => setEditorMode("draw-polygon")}
                >
                  <Square className="h-4 w-4 mr-1" />
                  Draw Zone
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click to add polygon points</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={editorMode === "draw-circle" ? "default" : "outline"}
                  onClick={() => setEditorMode("draw-circle")}
                >
                  <CircleIcon className="h-4 w-4 mr-1" />
                  Draw Area
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click to place a circle</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-px bg-border mx-1"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowLayers((prev) => ({ ...prev, pins: !prev.pins }))
                  }}
                >
                  <MapPin className={`h-4 w-4 mr-1 ${showLayers.pins ? "opacity-100" : "opacity-50"}`} />
                  Pins
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle pins visibility</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowLayers((prev) => ({ ...prev, polygons: !prev.polygons }))
                  }}
                >
                  <Square className={`h-4 w-4 mr-1 ${showLayers.polygons ? "opacity-100" : "opacity-50"}`} />
                  Zones
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle zones visibility</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowLayers((prev) => ({ ...prev, circles: !prev.circles }))
                  }}
                >
                  <CircleIcon className={`h-4 w-4 mr-1 ${showLayers.circles ? "opacity-100" : "opacity-50"}`} />
                  Areas
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle areas visibility</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="ml-auto">
            <Button size="sm" variant="default" onClick={exportData}>
              <Save className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {typeof window !== "undefined" && (
          <MapContainer
            center={CENTER_POSITION}
            zoom={INITIAL_ZOOM}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            ref={(map) => {
              mapRef.current = map
              if (mapRef.current) {
                mapRef.current.invalidateSize()
              }
            }}
          >
            <MapInitializer />
            <CoordinatesDisplay />
            <MapEventHandler />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render pins */}
            {showLayers.pins &&
              pins.map((pin) => (
                <AnimatedMarker
                  key={pin.properties.id}
                  position={pin.position}
                  properties={pin.properties}
                  onClick={() => handlePinClick(pin.properties)}
                  editable={editorMode === "edit"}
                  onEdit={() => handleEditPin(pin.properties)}
                  onDelete={() => handleDeletePin(pin.properties)}
                />
              ))}

            {/* Render polygons */}
            {showLayers.polygons &&
              polygons.map((polygon) => (
                <Polygon
                  key={polygon.id}
                  positions={polygon.positions as unknown as L.LatLngExpression[][]}
                  pathOptions={{ color: "purple", fillOpacity: 0.2 }}
                  eventHandlers={{
                    click: () => {
                      if (editorMode === "view") {
                        setSelectedPolygon(polygon)
                        setIsModalOpen(true)
                      }
                    },
                  }}
                />
              ))}

            {/* Render circles */}
            {showLayers.circles &&
              circles.map((circle) => (
                <Circle
                  key={circle.id}
                  center={circle.center}
                  radius={circle.radius}
                  pathOptions={{ color: "green", fillOpacity: 0.2 }}
                  eventHandlers={{
                    click: () => {
                      if (editorMode === "view") {
                        setSelectedCircle(circle)
                        setIsModalOpen(true)
                      }
                    },
                  }}
                />
              ))}

            {/* Temporary marker for adding new pin */}
            {tempMarkerPosition && (
              <DraggableMarker position={tempMarkerPosition} onDragEnd={(pos) => setTempMarkerPosition(pos)} />
            )}

            {/* Drawing polygon */}
            {drawingPolygon.length > 0 && (
              <>
                <Polygon positions={drawingPolygon} pathOptions={{ color: "blue", fillOpacity: 0.2 }} />
                {drawingPolygon.map((point, index) => (
                  <Marker key={index} position={point} />
                ))}
              </>
            )}

            {/* Drawing circle */}
            {drawingCircle && (
              <>
                <Circle
                  center={drawingCircle.center}
                  radius={drawingCircle.radius}
                  pathOptions={{ color: "green", fillOpacity: 0.2 }}
                />
                <Marker position={drawingCircle.center} />
              </>
            )}
          </MapContainer>
        )}

        {/* Drawing controls */}
        {editorMode === "draw-polygon" && drawingPolygon.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg p-3 shadow-lg z-[1000]">
            <div className="flex items-center gap-2">
              <span className="text-sm">Points: {drawingPolygon.length}</span>
              <Button size="sm" onClick={handleCompletePolygon}>
                Complete Zone
              </Button>
              <Button size="sm" variant="outline" onClick={() => setDrawingPolygon([])}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {editorMode === "draw-circle" && drawingCircle && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg p-3 shadow-lg z-[1000] w-80">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Radius (meters):</span>
                <span className="text-sm font-medium">{drawingCircle.radius}m</span>
              </div>
              <Slider
                value={[drawingCircle.radius]}
                min={10}
                max={500}
                step={10}
                onValueChange={handleCircleRadiusChange}
              />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleCompleteCircle}>
                  Complete Area
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDrawingCircle(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pin/House Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingPin
                ? "Edit Pin"
                : editingHouse
                  ? "Edit House"
                  : tempMarkerPosition
                    ? "Add New Pin"
                    : "Add New House"}
            </DialogTitle>
            <DialogDescription>
              {editingPin || tempMarkerPosition
                ? "Fill in the details for this location"
                : "Fill in the details for this house"}
            </DialogDescription>
          </DialogHeader>

          {editingPin || tempMarkerPosition ? (
            <PinForm
              pin={
                editingPin ||
                (tempMarkerPosition
                  ? {
                      position: tempMarkerPosition,
                      properties: {
                        id: `Pin${Date.now()}`,
                        name: "",
                        blockNumber: "",
                        numberOfHouseholds: 0,
                        totalResidents: 0,
                        yearEstablished: new Date().getFullYear(),
                        type: "Residential",
                        houses: [],
                      },
                    }
                  : undefined)
              }
              onSubmit={handlePinFormSubmit}
              onCancel={() => {
                setIsFormOpen(false)
                setTempMarkerPosition(null)
                setEditingPin(null)
              }}
            />
          ) : (
            <HouseForm
              house={editingHouse || undefined}
              onSubmit={handleHouseFormSubmit}
              onCancel={() => {
                setIsFormOpen(false)
                setEditingHouse(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Pin/House Details Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-hidden z-[2000]">
          <AnimatePresence>
            {selectedPin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <DialogHeader className="px-6 pt-6 pb-2">
                  {selectedHouse ? (
                    <Button variant="ghost" size="sm" className="absolute left-4 top-4" onClick={goBackToPin}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  ) : null}
                  <DialogTitle className="text-xl">
                    {selectedHouse ? selectedHouse.address : selectedPin.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedHouse
                      ? `House details for ${selectedHouse.id}`
                      : `Block ${selectedPin.blockNumber} - ${selectedPin.type}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 overflow-y-auto flex-1">
                  {selectedHouse ? (
                    <div className="py-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatCard
                          icon={<Users className="h-4 w-4 text-primary" />}
                          label="Occupants"
                          value={selectedHouse.occupants}
                        />
                        <StatCard
                          icon={<Calendar className="h-4 w-4 text-primary" />}
                          label="Year Built"
                          value={selectedHouse.yearBuilt}
                        />
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Consumption Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Droplet className="h-4 w-4 text-blue-500" />
                                <span>Water Consumption</span>
                              </div>
                              <Badge variant="outline" className="bg-blue-50">
                                {selectedHouse.waterConsumption} m³/month
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span>Electricity Consumption</span>
                              </div>
                              <Badge variant="outline" className="bg-yellow-50">
                                {selectedHouse.electricityConsumption} kWh/month
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            handleEditHouse(selectedHouse)
                            closeModal()
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit House
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="py-4">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="overview">
                          <Info className="h-4 w-4 mr-2" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="houses">
                          <LayoutGrid className="h-4 w-4 mr-2" />
                          Houses ({selectedPin.houses.length})
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4 mt-0">
                        <div className="grid grid-cols-2 gap-3">
                          <StatCard
                            icon={<Home className="h-4 w-4 text-primary" />}
                            label="Households"
                            value={selectedPin.numberOfHouseholds}
                          />
                          <StatCard
                            icon={<Users className="h-4 w-4 text-primary" />}
                            label="Residents"
                            value={selectedPin.totalResidents}
                          />
                          <StatCard
                            icon={<Calendar className="h-4 w-4 text-primary" />}
                            label="Established"
                            value={selectedPin.yearEstablished}
                          />
                          <StatCard
                            icon={<Building2 className="h-4 w-4 text-primary" />}
                            label="Type"
                            value={selectedPin.type}
                          />
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Location Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {selectedPin.name} is located in the Deca Homes Tunghaan Subdivision. This{" "}
                              {selectedPin.type.toLowerCase()} block was established in {selectedPin.yearEstablished}
                              and currently houses {selectedPin.totalResidents} residents across{" "}
                              {selectedPin.numberOfHouseholds} households.
                            </p>
                          </CardContent>
                        </Card>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              handleEditPin(selectedPin)
                              closeModal()
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit Block
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="houses" className="mt-0">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium">Houses in this block</h3>
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingHouse(null)
                              setIsFormOpen(true)
                              closeModal()
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add House
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPin.houses.map((house) => (
                            <HouseCard
                              key={house.id}
                              house={house}
                              onClick={() => handleHouseClick(house)}
                              editable={true}
                              onEdit={() => {
                                handleEditHouse(house)
                                closeModal()
                              }}
                              onDelete={() => handleDeleteHouse(house)}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>

                <CardFooter className="border-t p-4 mt-auto">
                  <Button variant="outline" className="w-full" onClick={closeModal}>
                    Close
                  </Button>
                </CardFooter>
              </motion.div>
            )}

            {selectedPolygon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <DialogHeader className="px-6 pt-6 pb-2">
                  <DialogTitle className="text-xl">{selectedPolygon.name}</DialogTitle>
                  <DialogDescription>{selectedPolygon.type}</DialogDescription>
                </DialogHeader>

                <div className="px-6 py-4 overflow-y-auto flex-1">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Zone Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This zone contains {selectedPolygon.positions.length} points defining its boundary.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <CardFooter className="border-t p-4 mt-auto">
                  <Button variant="outline" className="w-full" onClick={closeModal}>
                    Close
                  </Button>
                </CardFooter>
              </motion.div>
            )}

            {selectedCircle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <DialogHeader className="px-6 pt-6 pb-2">
                  <DialogTitle className="text-xl">{selectedCircle.name}</DialogTitle>
                  <DialogDescription>{selectedCircle.type}</DialogDescription>
                </DialogHeader>

                <div className="px-6 py-4 overflow-y-auto flex-1">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Area Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Radius:</span>
                          <Badge variant="outline">{selectedCircle.radius} meters</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Center:</span>
                          <Badge variant="outline">
                            {selectedCircle.center[0].toFixed(6)}, {selectedCircle.center[1].toFixed(6)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <CardFooter className="border-t p-4 mt-auto">
                  <Button variant="outline" className="w-full" onClick={closeModal}>
                    Close
                  </Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}