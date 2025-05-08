// Types
export type StatusType =
  | "Occupied"
  | "Unoccupied"
  | "Under Renovation"
  | "Upcoming Renovation"
  | "Under Construction"
  | "Upcoming Construction"

// Helper function to get color based on status
export function getStatusColor(status: StatusType): string {
  switch (status) {
    case "Occupied":
      return "#10B981" // green
    case "Unoccupied":
      return "#10B981" // green (same as Occupied)
    case "Under Renovation":
      return "#F59E0B" // amber
    case "Upcoming Renovation":
      return "#3B82F6" // blue
    case "Under Construction":
      return "#EF4444" // red
    case "Upcoming Construction":
      return "#8B5CF6" // purple
    default:
      return "#10B981" // default green
  }
}

export type IncidentType = "Maintenance" | "Noise" | "Construction" | "Other"

export interface HouseProperties {
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

export interface PinProperties {
  id: string
  name: string
  blockNumber: string
  numberOfHouseholds: number
  totalResidents: number
  yearEstablished: number
  type: string
  houses: HouseProperties[]
}

// Security guard assignment data
export interface GuardAssignment {
  id: number
  name: string
  shift: string
  status: "On Duty" | "Off Duty"
  contactNumber: string
  email: string
  photo?: string
}

export interface SecurityEntrance {
  id: string
  name: string
  position: [number, number]
  guards: GuardAssignment[]
}

// Security entrance points data
export const securityEntrances: SecurityEntrance[] = [
  {
    id: "exit1",
    name: "Exit 1",
    position: [10.250794, 123.787508],
    guards: [
      {
        id: 1,
        name: "John Smith",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-1234",
        email: "john.smith@example.com",
      },
      {
        id: 2,
        name: "Maria Garcia",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-2345",
        email: "maria.garcia@example.com",
      },
      {
        id: 3,
        name: "Robert Chen",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-3456",
        email: "robert.chen@example.com",
      },
    ],
  },
  {
    id: "exit2",
    name: "Exit 2",
    position: [10.250815, 123.787685],
    guards: [
      {
        id: 4,
        name: "Sarah Johnson",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-4567",
        email: "sarah.johnson@example.com",
      },
      {
        id: 5,
        name: "Michael Brown",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-5678",
        email: "michael.brown@example.com",
      },
      {
        id: 6,
        name: "Lisa Wong",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-6789",
        email: "lisa.wong@example.com",
      },
    ],
  },
  {
    id: "main-entrance",
    name: "Main Entrance",
    position: [10.248381, 123.791606],
    guards: [
      {
        id: 7,
        name: "David Martinez",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-7890",
        email: "david.martinez@example.com",
      },
      {
        id: 8,
        name: "Emily Taylor",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-8901",
        email: "emily.taylor@example.com",
      },
      {
        id: 9,
        name: "James Wilson",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-9012",
        email: "james.wilson@example.com",
      },
    ],
  },
]

export interface PolygonData {
  id: string
  positions: [number, number][]
  name: string
  type: string
  color: string
  properties: PinProperties
}

// Update the polygonData array to include more detailed properties and colors
export const polygonData: PolygonData[] = [
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
      houses: Array.from({ length: 25 }, (_, i) => {
        const houseId = `A1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 22 }, (_, i) => {
        const houseId = `A2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 18 }, (_, i) => {
        const houseId = `B1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 20 }, (_, i) => {
        const houseId = `B2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 15 }, (_, i) => {
        const houseId = `B3-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },

  // Middle zones
  {
    id: "zone6",
    positions: [
      [10.249991, 123.788913],
      [10.249999, 123.789026],
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
      houses: Array.from({ length: 16 }, (_, i) => {
        const houseId = `C1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 17 }, (_, i) => {
        const houseId = `C2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 14 }, (_, i) => {
        const houseId = `D1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 12 }, (_, i) => {
        const houseId = `D2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
    color: "#F59E0B",
    properties: {
      id: "Zone10",
      name: "Zone D3",
      blockNumber: "D3",
      numberOfHouseholds: 10,
      totalResidents: 40,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 10 }, (_, i) => {
        const houseId = `D3-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
    color: "#F59E0B",
    properties: {
      id: "Zone11",
      name: "Zone D4",
      blockNumber: "D4",
      numberOfHouseholds: 11,
      totalResidents: 44,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 11 }, (_, i) => {
        const houseId = `D4-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 13 }, (_, i) => {
        const houseId = `D5-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
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
      houses: Array.from({ length: 9 }, (_, i) => {
        const houseId = `D6-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
]

// Map constants
export const CENTER_POSITION: [number, number] = [10.249231, 123.78923]
export const INITIAL_ZOOM = 18
