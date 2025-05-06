// Types
export type StatusType =
  | "Occupied"
  | "Under Renovation"
  | "Upcoming Renovation"
  | "Under Construction"
  | "Upcoming Construction"

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
    color: "#F59E0B",
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
    color: "#F59E0B",
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

// Circle data
export interface CircleData {
  id: string
  center: [number, number]
  radius: number
  name: string
  type: string
}

export const circleData: CircleData[] = [
  {
    id: "circle1",
    center: [10.2495, 123.7885],
    radius: 50,
    name: "Community Center",
    type: "Public Facility",
  },
  {
    id: "circle2",
    center: [10.2488, 123.7892],
    radius: 30,
    name: "Playground",
    type: "Recreation Area",
  },
]

// Map constants
export const CENTER_POSITION: [number, number] = [10.249231, 123.78923]
export const INITIAL_ZOOM = 18