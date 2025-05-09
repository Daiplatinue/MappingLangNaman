import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap, useMapEvents, Polygon, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Home, Calendar, Info, LayoutGrid, ChevronLeft, Shield, Clock, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  CENTER_POSITION,
  INITIAL_ZOOM,
  securityEntrances,
  polygonData,
  customPins,
  defaultPinColors,
  type StatusType,
  type HouseProperties,
  type PinProperties,
  type SecurityEntrance,
  type PolygonData,
  type ResidenceData,
  getStatusColor,
} from "./subdivision-data"

const MapInitializer = () => {
  const map = useMap()

  useEffect(() => {
    if (map) {
      map.setView(CENTER_POSITION, INITIAL_ZOOM)
    }
  }, [map])

  return null
}

const GIDDisplay = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-[1000] bg-background/80 backdrop-blur-sm text-xs p-2 flex justify-center">
      GID - 1001
    </div>
  )
}

// Helper function to get badge variant based on status
const getStatusVariant = (status: StatusType): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Occupied":
      return "default"
    case "Unoccupied":
      return "default" // Same as Occupied (green)
    case "Under Renovation":
      return "destructive"
    case "Under Construction":
      return "destructive"
    case "Upcoming Renovation":
      return "secondary"
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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getStatusColor(house.status.type) }}></div>
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

// Custom marker icon for security entrances
const createSecurityIcon = () => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 bg-sky-500 text-white rounded-full border-2 border-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          </div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

// Update the createPinIcon function to accept a color parameter
const createPinIcon = (color?: string) => {
  const pinColor = color || "#3B82F6" // Default to blue if no color provided

  return L.divIcon({
    html: `<div class="map-pin">
            <div class="pin-head" style="background-color: ${pinColor};"></div>
            <div class="pin-tail" style="background: linear-gradient(to bottom, ${pinColor}, transparent);"></div>
            <div class="pin-shadow"></div>
          </div>`,
    className: "custom-pin-icon",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  })
}

// Update the CustomPinMarker component to improve the hover popup design
const CustomPinMarker = ({ pin }: { pin: ResidenceData }) => {
  const markerRef = useRef<L.Marker>(null)
  const map = useMap()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleMouseOver = (e: L.LeafletMouseEvent) => {
    const markerElement = e.target.getElement()
    if (markerElement) {
      // Create popup content dynamically with improved styling
      const popupContent = document.createElement("div")
      popupContent.className = "pin-popup"
      popupContent.innerHTML = `
        <div class="pin-popup-content">
          <h4 class="pin-popup-title">${pin.name}</h4>
          <div class="pin-popup-occupants">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="pin-popup-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>${pin.occupants} ${pin.occupants === 1 ? "Occupant" : "Occupants"}</span>
          </div>
          <p class="pin-popup-description">${pin.description.length > 80 ? pin.description.substring(0, 80) + "..." : pin.description}</p>
          <div class="pin-popup-footer">Click for more details</div>
        </div>
      `

      // Add popup to marker element
      const pinElement = markerElement.querySelector(".map-pin")
      if (pinElement && !pinElement.querySelector(".pin-popup")) {
        pinElement.appendChild(popupContent)
      }
    }
  }

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  return (
    <>
      <Marker
        ref={markerRef}
        position={pin.position}
        icon={createPinIcon(pin.color)}
        eventHandlers={{
          mouseover: handleMouseOver,
          click: handleClick,
        }}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{pin.name}</DialogTitle>
            <DialogDescription className="text-sm opacity-90 mt-1">{pin.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4 bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Occupants:</span>
              </div>
              <Badge className="ml-auto text-sm px-3 py-1">{pin.occupants}</Badge>
            </div>
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Location:</span>
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                [{pin.position[0].toFixed(6)}, {pin.position[1].toFixed(6)}]
              </span>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full">
              Close
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                toast.success(`Contacting ${pin.name}`, {
                  description: "This would connect you with the residents.",
                })
                setIsDialogOpen(false)
              }}
            >
              Contact Residents
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Add a color picker component for pin customization
const PinColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(defaultPinColors[0])

  const handleColorChange = (color: string) => {
    // Find all pins without a custom color
    const pinsToUpdate = customPins.filter((pin) => !pin.color)

    // Update their colors
    pinsToUpdate.forEach((pin) => {
      pin.color = color
    })

    setSelectedColor(color)
    setIsOpen(false)

    toast.success("Pin colors updated!", {
      description: "All default pins have been updated with the new color.",
      duration: 3000,
    })
  }

  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      <Button variant="outline" className="bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedColor }}></div>
        Customize Pins
      </Button>

      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-64 p-2">
          <CardHeader className="p-2">
            <CardTitle className="text-sm">Choose Pin Color</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid grid-cols-4 gap-2">
              {defaultPinColors.map((color, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-8 p-0"
                  onClick={() => handleColorChange(color)}
                >
                  <div className="w-full h-full rounded-sm" style={{ backgroundColor: color }}></div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Update the MapViewer component to include the PinColorPicker
export default function MapViewer() {
  const [polygons] = useState(polygonData)

  const [selectedPin, setSelectedPin] = useState<PinProperties | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<HouseProperties | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonData | null>(null)
  const [selectedEntrance, setSelectedEntrance] = useState<SecurityEntrance | null>(null)

  const [activeTab, setActiveTab] = useState("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setIsMobile] = useState<boolean>(false)

  // Add a state for expanded details view
  const [showFullDetails, setShowFullDetails] = useState(false)

  // Update the showLayers state to include security entrances
  const [showLayers] = useState({
    polygons: true,
    circles: false,
    securityEntrances: true,
    pins: true,
  })

  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    let style: HTMLStyleElement | null = null

    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)

      // Add custom CSS for the map pins
      style = document.createElement("style")
      style.textContent = `
  .custom-pin-icon {
    contain: layout;
    z-index: 500;
  }
  
  .map-pin {
    position: relative;
    transition: transform 0.3s ease, z-index 0.01s;
    z-index: 500;
  }
  
  .map-pin:hover {
    transform: scale(1.5);
    z-index: 1000;
  }
  
  .pin-head {
    width: 20px;
    height: 20px;
    background-color: #3B82F6; /* Changed to blue-500 */
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 5px;
  }
  
  .pin-tail {
    width: 2px;
    height: 20px;
    background: linear-gradient(to bottom, #3B82F6, transparent); /* Changed to blue-500 */
    position: absolute;
    top: 18px;
    left: 14px;
  }
  
  .pin-shadow {
    width: 14px;
    height: 3px;
    background: rgba(0,0,0,0.2);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    left: 8px;
    filter: blur(1px);
  }
  
  .pin-popup {
    position: absolute;
    bottom: 45px;
    left: -100px;
    width: 220px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    z-index: 1001;
    overflow: hidden;
  }
  
  .pin-popup-content {
    padding: 10px;
  }
  
  .pin-popup-title {
    font-size: 13px;
    font-weight: 600;
    margin: 0 0 5px 0;
    color: #1e293b;
  }
  
  .pin-popup-occupants {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: #64748b;
    margin-bottom: 6px;
  }
  
  .pin-popup-icon {
    opacity: 0.7;
  }
  
  .pin-popup-description {
    font-size: 11px;
    line-height: 1.4;
    margin: 0 0 6px 0;
    color: #475569;
  }
  
  .pin-popup-footer {
    font-size: 10px;
    text-align: center;
    background-color: #f1f5f9;
    padding: 4px;
    color: #64748b;
    font-weight: 500;
  }
  
  .map-pin:hover .pin-popup {
    opacity: 1;
    transform: translateY(0);
  }
`
      document.head.appendChild(style)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (style) {
          document.head.removeChild(style)
        }
      }
    }

    return () => {}
  }, [])

  // Handle house click
  const handleHouseClick = (house: HouseProperties) => {
    setSelectedHouse(house)
    setSelectedEntrance(null)
  }

  // Handle polygon click
  const handlePolygonClick = (polygon: PolygonData) => {
    setSelectedPolygon(polygon)
    setSelectedHouse(null)
    setSelectedEntrance(null)
    setActiveTab("overview")
    setIsModalOpen(true)
  }

  // Update the handleEntranceClick function to reset the expanded state
  const handleEntranceClick = (entrance: SecurityEntrance) => {
    setSelectedEntrance(entrance)
    setSelectedPolygon(null)
    setSelectedPin(null)
    setSelectedHouse(null)
    setShowFullDetails(false)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPin(null)
    setSelectedHouse(null)
    setSelectedPolygon(null)
    setSelectedEntrance(null)
    setShowFullDetails(false)
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
            <GIDDisplay />
            <MapEventHandler />
            <PinColorPicker />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render security entrance markers */}
            {showLayers.securityEntrances &&
              securityEntrances.map((entrance) => (
                <Marker
                  key={entrance.id}
                  position={entrance.position}
                  icon={createSecurityIcon()}
                  eventHandlers={{
                    click: () => {
                      handleEntranceClick(entrance)
                    },
                  }}
                />
              ))}

            {/* Render custom pins - Updated to use the imported customPins */}
            {showLayers.pins && customPins.map((pin) => <CustomPinMarker key={pin.id} pin={pin} />)}

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
          </MapContainer>
        )}
      </div>

      {/* Pin/House/Security Details Dialog */}
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

                <div className="px-6 overflow-y-auto flex-1 max-h-[calc(90vh-180px)]">
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
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getStatusColor(selectedHouse.status.type) }}
                                ></div>
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
                  <DialogTitle className="text-xl mt-8">
                    {selectedHouse ? `House ID: ${selectedHouse.id}` : selectedPolygon.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedHouse
                      ? `House details for ${selectedHouse.id}`
                      : `${selectedPolygon.properties.blockNumber} - ${selectedPolygon.type}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 overflow-y-auto flex-1 max-h-[calc(90vh-180px)]">
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
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getStatusColor(selectedHouse.status.type) }}
                                ></div>
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

            {/* Security Entrance Details - Fixed scrolling issue */}
            {selectedEntrance && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <DialogTitle className="text-xl">{selectedEntrance.name}</DialogTitle>
                      <DialogDescription>Security checkpoint</DialogDescription>
                      <p className="text-xs text-muted-foreground mt-1">
                        As of{" "}
                        {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        at {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => (window.location.href = "/")} className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-log-out"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </Button>
                  </div>
                </DialogHeader>

                {/* Added max-h-[calc(90vh-180px)] to fix scrolling issue */}
                <div className="px-6 overflow-y-auto flex-1 max-h-[calc(90vh-180px)]">
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium text-lg">Security Assignment</h3>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setShowFullDetails(!showFullDetails)}>
                        {showFullDetails ? "Hide Details" : "Show Details"}
                      </Button>
                    </div>

                    {/* Show all guards grouped by shift */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Morning Shift (6AM-2PM)
                        </h4>
                        {selectedEntrance.guards
                          .filter((guard) => guard.shift.includes("Morning"))
                          .map((guard) => (
                            <Card key={guard.id} className="p-4 mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={guard.photo || "/placeholder.svg?height=40&width=40"}
                                    alt={guard.name}
                                  />
                                  <AvatarFallback>
                                    {guard.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium">{guard.name}</h3>
                                    <Badge variant="default">On Duty</Badge>
                                  </div>
                                  {showFullDetails && (
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-muted-foreground">Contact:</span>
                                        <p>{guard.contactNumber}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Email:</span>
                                        <p className="truncate">{guard.email}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Evening Shift (2PM-10PM)
                        </h4>
                        {selectedEntrance.guards
                          .filter((guard) => guard.shift.includes("Evening"))
                          .map((guard) => (
                            <Card key={guard.id} className="p-4 mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={guard.photo || "/placeholder.svg?height=40&width=40"}
                                    alt={guard.name}
                                  />
                                  <AvatarFallback>
                                    {guard.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium">{guard.name}</h3>
                                    <Badge variant="default">On Duty</Badge>
                                  </div>
                                  {showFullDetails && (
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-muted-foreground">Contact:</span>
                                        <p>{guard.contactNumber}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Email:</span>
                                        <p className="truncate">{guard.email}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Night Shift (10PM-6AM)
                        </h4>
                        {selectedEntrance.guards
                          .filter((guard) => guard.shift.includes("Night"))
                          .map((guard) => (
                            <Card key={guard.id} className="p-4 mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={guard.photo || "/placeholder.svg?height=40&width=40"}
                                    alt={guard.name}
                                  />
                                  <AvatarFallback>
                                    {guard.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium">{guard.name}</h3>
                                    <Badge variant="default">On Duty</Badge>
                                  </div>
                                  {showFullDetails && (
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-muted-foreground">Contact:</span>
                                        <p>{guard.contactNumber}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Email:</span>
                                        <p className="truncate">{guard.email}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>

                    {showFullDetails && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Total Guards:</span>
                              <Badge variant="outline">{selectedEntrance.guards.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Security Level:</span>
                              <Badge variant="default">High</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Last Inspection:</span>
                              <span className="text-sm">April 30, 2025</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Equipment Status:</span>
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Operational
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Emergency Protocol:</span>
                              <span className="text-sm">Protocol B-7</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <CardFooter className="border-t p-4 mt-auto flex-shrink-0">
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