import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Popup, useMap, Marker, useMapEvents } from "react-leaflet"
import type L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Home, Calendar, Droplet, Zap, ChevronLeft, Info, LayoutGrid } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
        {
          id: "A3",
          address: "A3 Sugbo St",
          occupants: 5,
          yearBuilt: 2010,
          waterConsumption: 180,
          electricityConsumption: 220,
        },
        {
          id: "A4",
          address: "A4 Sugbo St",
          occupants: 2,
          yearBuilt: 2010,
          waterConsumption: 100,
          electricityConsumption: 150,
        },
        {
          id: "A5",
          address: "A5 Sugbo St",
          occupants: 4,
          yearBuilt: 2010,
          waterConsumption: 140,
          electricityConsumption: 190,
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
        {
          id: "B3",
          address: "B3 Sugbo St",
          occupants: 3,
          yearBuilt: 2011,
          waterConsumption: 130,
          electricityConsumption: 170,
        },
        {
          id: "B4",
          address: "B4 Sugbo St",
          occupants: 4,
          yearBuilt: 2011,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "B5",
          address: "B5 Sugbo St",
          occupants: 2,
          yearBuilt: 2011,
          waterConsumption: 110,
          electricityConsumption: 160,
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
        {
          id: "C2",
          address: "C2 Sugbo St",
          occupants: 3,
          yearBuilt: 2012,
          waterConsumption: 125,
          electricityConsumption: 175,
        },
        {
          id: "C3",
          address: "C3 Sugbo St",
          occupants: 5,
          yearBuilt: 2012,
          waterConsumption: 170,
          electricityConsumption: 210,
        },
        {
          id: "C4",
          address: "C4 Sugbo St",
          occupants: 2,
          yearBuilt: 2012,
          waterConsumption: 105,
          electricityConsumption: 155,
        },
        {
          id: "C5",
          address: "C5 Sugbo St",
          occupants: 4,
          yearBuilt: 2012,
          waterConsumption: 135,
          electricityConsumption: 185,
        },
      ],
    },
  },
  {
    position: [10.248508, 123.790405],
    properties: {
      id: "Pin4",
      name: "Sugbo GK Village Block D",
      blockNumber: "D",
      numberOfHouseholds: 22,
      totalResidents: 88,
      yearEstablished: 2013,
      type: "Residential",
      houses: [
        {
          id: "D1",
          address: "D1 Sugbo St",
          occupants: 4,
          yearBuilt: 2013,
          waterConsumption: 155,
          electricityConsumption: 205,
        },
        {
          id: "D2",
          address: "D2 Sugbo St",
          occupants: 5,
          yearBuilt: 2013,
          waterConsumption: 175,
          electricityConsumption: 225,
        },
        {
          id: "D3",
          address: "D3 Sugbo St",
          occupants: 3,
          yearBuilt: 2013,
          waterConsumption: 135,
          electricityConsumption: 185,
        },
        {
          id: "D4",
          address: "D4 Sugbo St",
          occupants: 4,
          yearBuilt: 2013,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "D5",
          address: "D5 Sugbo St",
          occupants: 2,
          yearBuilt: 2013,
          waterConsumption: 115,
          electricityConsumption: 165,
        },
      ],
    },
  },
  {
    position: [10.248249, 123.789305],
    properties: {
      id: "Pin5",
      name: "Sugbo GK Village Block E",
      blockNumber: "E",
      numberOfHouseholds: 17,
      totalResidents: 68,
      yearEstablished: 2014,
      type: "Residential",
      houses: [
        {
          id: "E1",
          address: "E1 Sugbo St",
          occupants: 4,
          yearBuilt: 2014,
          waterConsumption: 140,
          electricityConsumption: 190,
        },
        {
          id: "E2",
          address: "E2 Sugbo St",
          occupants: 3,
          yearBuilt: 2014,
          waterConsumption: 130,
          electricityConsumption: 180,
        },
        {
          id: "E3",
          address: "E3 Sugbo St",
          occupants: 5,
          yearBuilt: 2014,
          waterConsumption: 165,
          electricityConsumption: 215,
        },
        {
          id: "E4",
          address: "E4 Sugbo St",
          occupants: 2,
          yearBuilt: 2014,
          waterConsumption: 110,
          electricityConsumption: 160,
        },
        {
          id: "E5",
          address: "E5 Sugbo St",
          occupants: 4,
          yearBuilt: 2014,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
      ],
    },
  },
  {
    position: [10.248445, 123.788951],
    properties: {
      id: "Pin6",
      name: "Sugbo GK Village Community Center",
      blockNumber: "CC",
      numberOfHouseholds: 1,
      totalResidents: 0,
      yearEstablished: 2015,
      type: "Community",
      houses: [
        {
          id: "CC1",
          address: "Community Center",
          occupants: 0,
          yearBuilt: 2015,
          waterConsumption: 200,
          electricityConsumption: 300,
        },
      ],
    },
  },
  {
    position: [10.248656, 123.788951],
    properties: {
      id: "Pin7",
      name: "Sugbo GK Village Block F",
      blockNumber: "F",
      numberOfHouseholds: 19,
      totalResidents: 76,
      yearEstablished: 2015,
      type: "Residential",
      houses: [
        {
          id: "F1",
          address: "F1 Sugbo St",
          occupants: 4,
          yearBuilt: 2015,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "F2",
          address: "F2 Sugbo St",
          occupants: 5,
          yearBuilt: 2015,
          waterConsumption: 170,
          electricityConsumption: 220,
        },
        {
          id: "F3",
          address: "F3 Sugbo St",
          occupants: 3,
          yearBuilt: 2015,
          waterConsumption: 130,
          electricityConsumption: 180,
        },
        {
          id: "F4",
          address: "F4 Sugbo St",
          occupants: 4,
          yearBuilt: 2015,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
        {
          id: "F5",
          address: "F5 Sugbo St",
          occupants: 2,
          yearBuilt: 2015,
          waterConsumption: 115,
          electricityConsumption: 165,
        },
      ],
    },
  },
  {
    position: [10.249004, 123.789251],
    properties: {
      id: "Pin8",
      name: "Sugbo GK Village Block G",
      blockNumber: "G",
      numberOfHouseholds: 16,
      totalResidents: 64,
      yearEstablished: 2016,
      type: "Residential",
      houses: [
        {
          id: "G1",
          address: "G1 Sugbo St",
          occupants: 4,
          yearBuilt: 2016,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
        {
          id: "G2",
          address: "G2 Sugbo St",
          occupants: 3,
          yearBuilt: 2016,
          waterConsumption: 135,
          electricityConsumption: 185,
        },
        {
          id: "G3",
          address: "G3 Sugbo St",
          occupants: 5,
          yearBuilt: 2016,
          waterConsumption: 160,
          electricityConsumption: 210,
        },
        {
          id: "G4",
          address: "G4 Sugbo St",
          occupants: 2,
          yearBuilt: 2016,
          waterConsumption: 110,
          electricityConsumption: 160,
        },
        {
          id: "G5",
          address: "G5 Sugbo St",
          occupants: 4,
          yearBuilt: 2016,
          waterConsumption: 140,
          electricityConsumption: 190,
        },
      ],
    },
  },
  {
    position: [10.248983, 123.789514],
    properties: {
      id: "Pin9",
      name: "Sugbo GK Village Block H",
      blockNumber: "H",
      numberOfHouseholds: 21,
      totalResidents: 84,
      yearEstablished: 2017,
      type: "Residential",
      houses: [
        {
          id: "H1",
          address: "H1 Sugbo St",
          occupants: 4,
          yearBuilt: 2017,
          waterConsumption: 155,
          electricityConsumption: 205,
        },
        {
          id: "H2",
          address: "H2 Sugbo St",
          occupants: 5,
          yearBuilt: 2017,
          waterConsumption: 175,
          electricityConsumption: 225,
        },
        {
          id: "H3",
          address: "H3 Sugbo St",
          occupants: 3,
          yearBuilt: 2017,
          waterConsumption: 135,
          electricityConsumption: 185,
        },
        {
          id: "H4",
          address: "H4 Sugbo St",
          occupants: 4,
          yearBuilt: 2017,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "H5",
          address: "H5 Sugbo St",
          occupants: 2,
          yearBuilt: 2017,
          waterConsumption: 115,
          electricityConsumption: 165,
        },
      ],
    },
  },
  {
    position: [10.249537, 123.788683],
    properties: {
      id: "Pin10",
      name: "Sugbo GK Village Block I",
      blockNumber: "I",
      numberOfHouseholds: 18,
      totalResidents: 72,
      yearEstablished: 2018,
      type: "Residential",
      houses: [
        {
          id: "I1",
          address: "I1 Sugbo St",
          occupants: 4,
          yearBuilt: 2018,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
        {
          id: "I2",
          address: "I2 Sugbo St",
          occupants: 3,
          yearBuilt: 2018,
          waterConsumption: 130,
          electricityConsumption: 180,
        },
        {
          id: "I3",
          address: "I3 Sugbo St",
          occupants: 5,
          yearBuilt: 2018,
          waterConsumption: 165,
          electricityConsumption: 215,
        },
        {
          id: "I4",
          address: "I4 Sugbo St",
          occupants: 2,
          yearBuilt: 2018,
          waterConsumption: 110,
          electricityConsumption: 160,
        },
        {
          id: "I5",
          address: "I5 Sugbo St",
          occupants: 4,
          yearBuilt: 2018,
          waterConsumption: 140,
          electricityConsumption: 190,
        },
      ],
    },
  },
  {
    position: [10.24968, 123.788913],
    properties: {
      id: "Pin11",
      name: "Sugbo GK Village Block J",
      blockNumber: "J",
      numberOfHouseholds: 20,
      totalResidents: 80,
      yearEstablished: 2019,
      type: "Residential",
      houses: [
        {
          id: "J1",
          address: "J1 Sugbo St",
          occupants: 4,
          yearBuilt: 2019,
          waterConsumption: 150,
          electricityConsumption: 200,
        },
        {
          id: "J2",
          address: "J2 Sugbo St",
          occupants: 5,
          yearBuilt: 2019,
          waterConsumption: 170,
          electricityConsumption: 220,
        },
        {
          id: "J3",
          address: "J3 Sugbo St",
          occupants: 3,
          yearBuilt: 2019,
          waterConsumption: 130,
          electricityConsumption: 180,
        },
        {
          id: "J4",
          address: "J4 Sugbo St",
          occupants: 4,
          yearBuilt: 2019,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
        {
          id: "J5",
          address: "J5 Sugbo St",
          occupants: 2,
          yearBuilt: 2019,
          waterConsumption: 115,
          electricityConsumption: 165,
        },
      ],
    },
  },
  {
    position: [10.249859, 123.789112],
    properties: {
      id: "Pin12",
      name: "Sugbo GK Village Health Center",
      blockNumber: "HC",
      numberOfHouseholds: 1,
      totalResidents: 0,
      yearEstablished: 2020,
      type: "Community",
      houses: [
        {
          id: "HC1",
          address: "Health Center",
          occupants: 0,
          yearBuilt: 2020,
          waterConsumption: 180,
          electricityConsumption: 250,
        },
      ],
    },
  },
  {
    position: [10.250102, 123.788586],
    properties: {
      id: "Pin13",
      name: "Sugbo GK Village Block K",
      blockNumber: "K",
      numberOfHouseholds: 17,
      totalResidents: 68,
      yearEstablished: 2020,
      type: "Residential",
      houses: [
        {
          id: "K1",
          address: "K1 Sugbo St",
          occupants: 4,
          yearBuilt: 2020,
          waterConsumption: 145,
          electricityConsumption: 195,
        },
        {
          id: "K2",
          address: "K2 Sugbo St",
          occupants: 3,
          yearBuilt: 2020,
          waterConsumption: 135,
          electricityConsumption: 185,
        },
        {
          id: "K3",
          address: "K3 Sugbo St",
          occupants: 5,
          yearBuilt: 2020,
          waterConsumption: 160,
          electricityConsumption: 210,
        },
        {
          id: "K4",
          address: "K4 Sugbo St",
          occupants: 2,
          yearBuilt: 2020,
          waterConsumption: 110,
          electricityConsumption: 160,
        },
        {
          id: "K5",
          address: "K5 Sugbo St",
          occupants: 4,
          yearBuilt: 2020,
          waterConsumption: 140,
          electricityConsumption: 190,
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
    position: [10.250736, 123.787497],
    properties: {
      id: "Exit1",
      name: "Subdivision Exit Point 1",
      blockNumber: "EXIT",
      numberOfHouseholds: 0,
      totalResidents: 0,
      yearEstablished: 2010,
      type: "Infrastructure",
      houses: [],
    },
  },
  {
    position: [10.250741, 123.787712],
    properties: {
      id: "Exit2",
      name: "Subdivision Exit Point 2",
      blockNumber: "EXIT",
      numberOfHouseholds: 0,
      totalResidents: 0,
      yearEstablished: 2010,
      type: "Infrastructure",
      houses: [],
    },
  },
  {
    position: [10.248397, 123.791596],
    properties: {
      id: "Entrance",
      name: "Subdivision Main Entrance",
      blockNumber: "ENTRANCE",
      numberOfHouseholds: 0,
      totalResidents: 0,
      yearEstablished: 2010,
      type: "Infrastructure",
      houses: [],
    },
  },
]

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

// Custom marker component with animation
const AnimatedMarker = ({
  position,
  properties,
  onClick,
}: {
  position: [number, number]
  properties: PinProperties
  onClick: () => void
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
          <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => onClick()}>
            View Details
          </Button>
        </div>
      </Popup>
    </Marker>
  )
}

// House card component with animation
const HouseCard = ({ house, onClick }: { house: HouseProperties; onClick: () => void }) => {
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

export default function MapComponent() {
  const [selectedPin, setSelectedPin] = useState<PinProperties | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<HouseProperties | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
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

  const handlePinClick = (pin: PinProperties) => {
    setSelectedPin(pin)
    setSelectedHouse(null)
    setActiveTab("overview")
    setIsModalOpen(true)
  }

  const handleHouseClick = (house: HouseProperties) => {
    setSelectedHouse(house)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedPin(null)
      setSelectedHouse(null)
    }, 300)
  }

  const goBackToPin = () => {
    setSelectedHouse(null)
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Deca Homes Tunghaan Subdivision Mapping</h1>
        </div>
      </header>

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
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pinsData.map((pin) => (
              <AnimatedMarker
                key={pin.properties.id}
                position={pin.position}
                properties={pin.properties}
                onClick={() => handlePinClick(pin.properties)}
              />
            ))}
          </MapContainer>
        )}
      </div>

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
                      </TabsContent>

                      <TabsContent value="houses" className="mt-0">
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPin.houses.map((house) => (
                            <HouseCard key={house.id} house={house} onClick={() => handleHouseClick(house)} />
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
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}