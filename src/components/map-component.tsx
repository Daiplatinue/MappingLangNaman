import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap, useMapEvents, Circle, Polygon } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Home, Calendar, Info, LayoutGrid, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

const CENTER_POSITION: [number, number] = [10.249231, 123.78923]
const INITIAL_ZOOM = 18

// Define the allowed status and incident types as string literals
type StatusType =
  | "Occupied"
  | "Under Renovation"
  | "Upcoming Renovation"
  | "Under Construction"
  | "Upcoming Construction"
type IncidentType = "Maintenance" | "Noise" | "Construction" | "Other"

interface HouseProperties {
  id: string
  occupants: number
  status: {
    type: StatusType
    date: string
  }
  incidents: {
    type: IncidentType
    description: string
    date: string
  }[]
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

// Update the polygonData array to include more detailed properties and colors
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
    color: "#8B5CF6", // purple
    properties: {
      id: "Zone1",
      name: "Zone A1",
      blockNumber: "A1",
      numberOfHouseholds: 25,
      totalResidents: 95,
      yearEstablished: 2010,
      type: "Residential Zone",
      houses: [
        {
          id: "A1-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Jan 2022",
          },
          incidents: [
            {
              type: "Maintenance",
              description: "Water leak in bathroom requiring plumbing repair",
              date: "Mar 15, 2023",
            },
          ],
        },
        {
          id: "A1-2",
          occupants: 3,
          status: {
            type: "Under Renovation",
            date: "Started Apr 2023",
          },
          incidents: [
            {
              type: "Noise",
              description: "Complaint from neighbors about construction noise",
              date: "Apr 20, 2023",
            },
          ],
        },
      ],
    },
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
    color: "#8B5CF6", // purple
    properties: {
      id: "Zone2",
      name: "Zone A2",
      blockNumber: "A2",
      numberOfHouseholds: 22,
      totalResidents: 88,
      yearEstablished: 2010,
      type: "Residential Zone",
      houses: [
        {
          id: "A2-1",
          occupants: 5,
          status: {
            type: "Occupied",
            date: "Since Feb 2022",
          },
          incidents: [
            {
              type: "Other",
              description: "Minor fire incident in the kitchen",
              date: "Jun 10, 2023",
            },
          ],
        },
        {
          id: "A2-2",
          occupants: 4,
          status: {
            type: "Upcoming Construction",
            date: "Starting Jul 2023",
          },
          incidents: [],
        },
      ],
    },
  },

  // Upper middle zones
  {
    id: "zone3",
    positions: [
      [10.249939, 123.788275],
      [10.250139, 123.788962],
      [10.250261, 123.78894],
      [10.250049, 123.788227],
    ],
    name: "Zone B1",
    type: "Residential Zone",
    color: "#EC4899", // pink
    properties: {
      id: "Zone3",
      name: "Zone B1",
      blockNumber: "B1",
      numberOfHouseholds: 18,
      totalResidents: 72,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: [
        {
          id: "B1-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Mar 2022",
          },
          incidents: [],
        },
        {
          id: "B1-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Apr 2022",
          },
          incidents: [],
        },
      ],
    },
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
    color: "#EC4899", // pink
    properties: {
      id: "Zone4",
      name: "Zone B2",
      blockNumber: "B2",
      numberOfHouseholds: 20,
      totalResidents: 80,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: [
        {
          id: "B2-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since May 2022",
          },
          incidents: [],
        },
        {
          id: "B2-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Jun 2022",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone5",
    positions: [
      [10.249917, 123.788624],
      [10.249965, 123.788758],
      [10.249522, 123.78916],
      [10.249379, 123.789123],
    ],
    name: "Zone B3",
    type: "Residential Zone",
    color: "#EC4899", // pink
    properties: {
      id: "Zone5",
      name: "Zone B3",
      blockNumber: "B3",
      numberOfHouseholds: 15,
      totalResidents: 60,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: [
        {
          id: "B3-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Jul 2022",
          },
          incidents: [],
        },
        {
          id: "B3-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Aug 2022",
          },
          incidents: [],
        },
      ],
    },
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
    color: "#10B981", // green
    properties: {
      id: "Zone6",
      name: "Zone C1",
      blockNumber: "C1",
      numberOfHouseholds: 16,
      totalResidents: 64,
      yearEstablished: 2012,
      type: "Residential Zone",
      houses: [
        {
          id: "C1-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Sep 2022",
          },
          incidents: [],
        },
        {
          id: "C1-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Oct 2022",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone7",
    positions: [
      [10.248434, 123.789332],
      [10.248434, 123.789209],
      [10.248867, 123.789187],
      [10.249236, 123.78923],
      [10.249664, 123.789402],
      [10.249595, 123.789514],
      [10.249094, 123.789321],
    ],
    name: "Zone C2",
    type: "Residential Zone",
    color: "#10B981", // green
    properties: {
      id: "Zone7",
      name: "Zone C2",
      blockNumber: "C2",
      numberOfHouseholds: 17,
      totalResidents: 68,
      yearEstablished: 2012,
      type: "Residential Zone",
      houses: [
        {
          id: "C2-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Nov 2022",
          },
          incidents: [],
        },
        {
          id: "C2-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Dec 2022",
          },
          incidents: [],
        },
      ],
    },
  },

  // Lower zones (Saint Mary area)
  {
    id: "zone8",
    positions: [
      [10.249532, 123.789659],
      [10.249506, 123.78975],
      [10.248983, 123.789584],
      [10.248455, 123.789605],
      [10.248424, 123.789466],
      [10.248951, 123.78945],
    ],
    name: "Zone D1",
    type: "Residential Zone",
    color: "#F59E0B", // amber
    properties: {
      id: "Zone8",
      name: "Zone D1",
      blockNumber: "D1",
      numberOfHouseholds: 14,
      totalResidents: 56,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: [
        {
          id: "D1-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Jan 2023",
          },
          incidents: [],
        },
        {
          id: "D1-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Feb 2023",
          },
          incidents: [],
        },
      ],
    },
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
    color: "#F59E0B", // amber
    properties: {
      id: "Zone9",
      name: "Zone D2",
      blockNumber: "D2",
      numberOfHouseholds: 12,
      totalResidents: 48,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: [
        {
          id: "D2-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Mar 2023",
          },
          incidents: [],
        },
        {
          id: "D2-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Apr 2023",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone10",
    positions: [
      [10.248397, 123.789069],
      [10.248471, 123.789058],
      [10.248487, 123.788822],
      [10.248397, 123.788822],
    ],
    name: "Zone D3",
    type: "Residential Zone",
    color: "#F59E0B", // amber
    properties: {
      id: "Zone10",
      name: "Zone D3",
      blockNumber: "D3",
      numberOfHouseholds: 10,
      totalResidents: 40,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: [
        {
          id: "D3-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since May 2023",
          },
          incidents: [],
        },
        {
          id: "D3-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Jun 2023",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone11",
    positions: [
      [10.248197, 123.789783],
      [10.24817, 123.788822],
      [10.24827, 123.788801],
      [10.248302, 123.789783],
    ],
    name: "Zone D4",
    type: "Residential Zone",
    color: "#F59E0B", // amber
    properties: {
      id: "Zone11",
      name: "Zone D4",
      blockNumber: "D4",
      numberOfHouseholds: 11,
      totalResidents: 44,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: [
        {
          id: "D4-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Jul 2023",
          },
          incidents: [],
        },
        {
          id: "D4-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Aug 2023",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone12",
    positions: [
      [10.248603, 123.79099],
      [10.24835, 123.789917],
      [10.248434, 123.789933],
      [10.248719, 123.790957],
    ],
    name: "Zone D5",
    type: "Commercial Zone",
    color: "#EF4444", // red
    properties: {
      id: "Zone12",
      name: "Zone D5",
      blockNumber: "D5",
      numberOfHouseholds: 13,
      totalResidents: 52,
      yearEstablished: 2013,
      type: "Commercial Zone",
      houses: [
        {
          id: "D5-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Sep 2023",
          },
          incidents: [],
        },
        {
          id: "D5-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Oct 2023",
          },
          incidents: [],
        },
      ],
    },
  },
  {
    id: "zone13",
    positions: [
      [10.248075, 123.789943],
      [10.248276, 123.790829],
      [10.248424, 123.790823],
      [10.248197, 123.789943],
    ],
    name: "Zone D6",
    type: "Community Zone",
    color: "#3B82F6", // blue
    properties: {
      id: "Zone13",
      name: "Zone D6",
      blockNumber: "D6",
      numberOfHouseholds: 9,
      totalResidents: 36,
      yearEstablished: 2013,
      type: "Community Zone",
      houses: [
        {
          id: "D6-1",
          occupants: 4,
          status: {
            type: "Occupied",
            date: "Since Nov 2023",
          },
          incidents: [],
        },
        {
          id: "D6-2",
          occupants: 3,
          status: {
            type: "Occupied",
            date: "Since Dec 2023",
          },
          incidents: [],
        },
      ],
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

// Helper function to get badge variant based on status
const getStatusVariant = (status: StatusType): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Occupied":
      return "default"
    case "Under Renovation":
    case "Under Construction":
      return "destructive"
    case "Upcoming Renovation":
    case "Upcoming Construction":
      return "secondary"
    default:
      return "outline"
  }
}

// Helper function to get status icon
const getStatusIcon = (status: StatusType): React.ReactNode => {
  switch (status) {
    case "Occupied":
      return <Home className="h-4 w-4 text-primary" />
    case "Under Renovation":
    case "Under Construction":
      return <Building2 className="h-4 w-4 text-destructive" />
    case "Upcoming Renovation":
    case "Upcoming Construction":
      return <Calendar className="h-4 w-4 text-secondary" />
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

// House card component with animation
const HouseCard = ({
  house,
  onClick,
}: {
  house: HouseProperties
  onClick: () => void
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
          <h3 className="font-medium text-primary">House ID: {house.id}</h3>
        </div>
        <Badge variant="default" className="bg-black text-white hover:bg-black">
          {house.occupants} {house.occupants === 1 ? "Occupant" : "Occupants"}
        </Badge>
      </div>
      <div className="mt-3 text-sm">
        <div className="flex items-center gap-1 mb-2">
          <Badge variant={getStatusVariant(house.status.type)}>{house.status.type}</Badge>
          <span className="text-xs text-muted-foreground ml-2">{house.status.date}</span>
        </div>
        {house.incidents.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium mb-1">Recent Incident:</p>
            <div className="bg-muted/50 p-2 rounded-md">
              <div className="flex justify-between">
                <Badge variant="outline">{house.incidents[0].type}</Badge>
                <span className="text-xs text-muted-foreground">{house.incidents[0].date}</span>
              </div>
              <p className="text-xs mt-1">{house.incidents[0].description}</p>
            </div>
          </div>
        )}
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

export default function MapViewer() {
  const [polygons] = useState(polygonData)
  const [circles] = useState<
    { id: string; center: [number, number]; radius: number; name: string; type: string }[]
  >([])

  const [selectedPin, setSelectedPin] = useState<PinProperties | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<HouseProperties | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<(typeof polygonData)[0] | null>(null)
  const [selectedCircle, setSelectedCircle] = useState<(typeof circles)[0] | null>(null)

  const [activeTab, setActiveTab] = useState("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setIsMobile] = useState<boolean>(false)

  // Update the showLayers state to remove pins
  const [showLayers,] = useState({
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

  // Handle house click
  const handleHouseClick = (house: HouseProperties) => {
    setSelectedHouse(house)
  }

  // Handle polygon click
  const handlePolygonClick = (polygon: (typeof polygonData)[0]) => {
    setSelectedPolygon(polygon)
    setSelectedHouse(null)
    setActiveTab("overview")
    setIsModalOpen(true)
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
    useMapEvents({
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

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Update the header to not have blur when modal is present */}
      <header className="p-4 border-b bg-background sticky top-0 z-[2001]">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Deca Homes Tunghaan Subdivision Map</h1>
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
            <MapEventHandler />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render polygons */}
            {showLayers.polygons &&
              polygons.map((polygon) => (
                <Polygon
                  key={polygon.id}
                  positions={polygon.positions as unknown as L.LatLngExpression[][]}
                  pathOptions={{
                    color: polygon.color || "purple",
                    fillOpacity: 0.2,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: (e) => {
                      // Get center of polygon for popup positioning
                      const bounds = L.polygon(polygon.positions as unknown as L.LatLngExpression[][]).getBounds()
                      const center = bounds.getCenter()

                      // Create a popup at the center of the polygon
                      L.popup()
                        .setLatLng(center)
                        .setContent(`
                          <div class="p-2">
                            <h3 class="font-bold text-primary">${polygon.name}</h3>
                            <div class="flex items-center gap-2 mt-1">
                              <span class="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                Block ${polygon.properties.blockNumber}
                              </span>
                              <span class="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                ${polygon.type}
                              </span>
                            </div>
                            <p class="mt-2 text-sm">
                              <span class="font-medium">Households:</span> ${polygon.properties.numberOfHouseholds}
                            </p>
                            <div class="flex gap-2 mt-2">
                              <button 
                                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                                onclick="document.getElementById('view-details-${polygon.id}').click()"
                              >
                                View Details
                              </button>
                              <button id="view-details-${polygon.id}" style="display:none;"></button>
                            </div>
                          </div>
                        `)
                        .openOn(e.target._map)

                      // Add event listener to the hidden button
                      setTimeout(() => {
                        const button = document.getElementById(`view-details-${polygon.id}`)
                        if (button) {
                          button.addEventListener("click", () => {
                            handlePolygonClick(polygon)
                          })
                        }
                      }, 0)
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
                      setSelectedCircle(circle)
                      setIsModalOpen(true)
                    },
                  }}
                />
              ))}
          </MapContainer>
        )}
      </div>

      {/* Pin/House Details Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-hidden z-[2002]">
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
                    {selectedHouse ? `House ID: ${selectedHouse.id}` : selectedPin.name}
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
                          icon={getStatusIcon(selectedHouse.status.type)}
                          label="Status"
                          value={selectedHouse.status.type}
                        />
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Status Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span>Current Status</span>
                              </div>
                              <Badge variant={getStatusVariant(selectedHouse.status.type)}>
                                {selectedHouse.status.type}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span>Status Date</span>
                              </div>
                              <span className="text-sm">{selectedHouse.status.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Incident History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedHouse.incidents.length > 0 ? (
                            <div className="space-y-3">
                              {selectedHouse.incidents.map((incident, index) => (
                                <div key={index} className="bg-muted/50 p-3 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <Badge variant="outline">{incident.type}</Badge>
                                    <span className="text-xs text-muted-foreground">{incident.date}</span>
                                  </div>
                                  <p className="text-sm mt-2">{incident.description}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No incidents reported.</p>
                          )}
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
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium">Houses in this block</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPin.houses.map((house) => (
                            <HouseCard
                              key={house.id}
                              house={{
                                ...house,
                                status: {
                                  ...house.status,
                                  type: house.status.type as StatusType,
                                },
                                incidents: house.incidents.map((incident) => ({
                                  ...incident,
                                  type: incident.type as IncidentType,
                                })),
                              }}
                              onClick={() =>
                                handleHouseClick({
                                  ...house,
                                  status: {
                                    ...house.status,
                                    type: house.status.type as StatusType,
                                  },
                                  incidents: house.incidents.map((incident) => ({
                                    ...incident,
                                    type: incident.type as IncidentType,
                                  })),
                                })
                              }
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
                  {selectedHouse ? (
                    <Button variant="ghost" size="sm" className="absolute left-4 top-4" onClick={goBackToPin}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  ) : null}
                  <DialogTitle className="text-xl">
                    {selectedHouse ? `House ID: ${selectedHouse.id}` : selectedPolygon.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedHouse
                      ? `House details for ${selectedHouse.id}`
                      : `${selectedPolygon.properties.blockNumber} - ${selectedPolygon.type}`}
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
                          icon={getStatusIcon(selectedHouse.status.type)}
                          label="Status"
                          value={selectedHouse.status.type}
                        />
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Status Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span>Current Status</span>
                              </div>
                              <Badge variant={getStatusVariant(selectedHouse.status.type)}>
                                {selectedHouse.status.type}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span>Status Date</span>
                              </div>
                              <span className="text-sm">{selectedHouse.status.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Incident History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedHouse.incidents.length > 0 ? (
                            <div className="space-y-3">
                              {selectedHouse.incidents.map((incident, index) => (
                                <div key={index} className="bg-muted/50 p-3 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <Badge variant="outline">{incident.type}</Badge>
                                    <span className="text-xs text-muted-foreground">{incident.date}</span>
                                  </div>
                                  <p className="text-sm mt-2">{incident.description}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No incidents reported.</p>
                          )}
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
                          Houses ({selectedPolygon.properties.houses.length})
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4 mt-0">
                        <div className="grid grid-cols-2 gap-3">
                          <StatCard
                            icon={<Home className="h-4 w-4 text-primary" />}
                            label="Households"
                            value={selectedPolygon.properties.numberOfHouseholds}
                          />
                          <StatCard
                            icon={<Users className="h-4 w-4 text-primary" />}
                            label="Residents"
                            value={selectedPolygon.properties.totalResidents}
                          />
                          <StatCard
                            icon={<Calendar className="h-4 w-4 text-primary" />}
                            label="Established"
                            value={selectedPolygon.properties.yearEstablished}
                          />
                          <StatCard
                            icon={<Building2 className="h-4 w-4 text-primary" />}
                            label="Type"
                            value={selectedPolygon.properties.type}
                          />
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Zone Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {selectedPolygon.name} is located in the Deca Homes Tunghaan Subdivision. This{" "}
                              {selectedPolygon.type.toLowerCase()} was established in{" "}
                              {selectedPolygon.properties.yearEstablished}
                              and currently houses {selectedPolygon.properties.totalResidents} residents across{" "}
                              {selectedPolygon.properties.numberOfHouseholds} households.
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="houses" className="mt-0">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium">Houses in this zone</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPolygon.properties.houses.map((house) => (
                            <HouseCard
                              key={house.id}
                              house={{
                                ...house,
                                status: {
                                  ...house.status,
                                  type: house.status.type as StatusType,
                                },
                                incidents: house.incidents.map((incident) => ({
                                  ...incident,
                                  type: incident.type as IncidentType,
                                })),
                              }}
                              onClick={() =>
                                handleHouseClick({
                                  ...house,
                                  status: {
                                    ...house.status,
                                    type: house.status.type as StatusType,
                                  },
                                  incidents: house.incidents.map((incident) => ({
                                    ...incident,
                                    type: incident.type as IncidentType,
                                  })),
                                })
                              }
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