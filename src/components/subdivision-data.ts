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

// Add the ResidenceData interface after the SecurityEntrance interface
export interface ResidenceData {
  id: string
  position: [number, number]
  name: string
  description: string
  occupants: number
  color?: string
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

// Add the customPins array after the securityEntrances array
export const customPins: ResidenceData[] = [
  {
    id: "res001",
    position: [10.2492, 123.787546],
    name: "Johnson Residence",
    description:
      "A family of 4 that moved in early 2023. They're known for their beautiful garden and community involvement.",
    occupants: 4,
  },
  {
    id: "res002",
    position: [10.24949, 123.787481],
    name: "Williams Residence",
    description:
      "A wealthy family of 5 that relocated from the city center in 2022. They host regular neighborhood gatherings.",
    occupants: 5,
  },
  {
    id: "res003",
    position: [10.249738, 123.787411],
    name: "Chen Residence",
    description:
      "A young professional couple with their child who moved in mid-2024. They both work in tech and often work from home.",
    occupants: 3,
  },
  {
    id: "res004",
    position: [10.249997, 123.787336],
    name: "Garcia Residence",
    description:
      "A retired couple who moved in 2021. They spend most of their time tending to their award-winning flower garden.",
    occupants: 2,
  },
  {
    id: "res005",
    position: [10.24977, 123.787621],
    name: "Thompson Residence",
    description:
      "A well-established family of 6 that has lived here since 2019. Mr. Thompson is a local business owner.",
    occupants: 6,
  },
  {
    id: "res006",
    position: [10.249263, 123.787749],
    name: "Patel Residence",
    description:
      "A family of 4 that moved in 2022. Dr. Patel works at the local hospital and is known for hosting cultural events.",
    occupants: 4,
  },
  {
    id: "res007",
    position: [10.249516, 123.787685],
    name: "Rodriguez Residence",
    description:
      "A family of 3 that relocated here in 2023. They run a popular catering business from their custom-built kitchen.",
    occupants: 3,
  },
  {
    id: "res008",
    position: [10.250023, 123.787551],
    name: "Kim Residence",
    description:
      "A family of 5 that moved in 2020. They're known for their beautiful landscaping and annual holiday decorations.",
    occupants: 5,
  },
  {
    id: "res009",
    position: [10.249997, 123.788329],
    name: "Taylor Residence",
    description:
      "A family of 4 that built this custom home in 2021. Mr. Taylor is a local architect who designed several homes in the area.",
    occupants: 4,
  },
  {
    id: "res010",
    position: [10.250048, 123.788477],
    name: "Nguyen Residence",
    description:
      "A young couple who moved in 2023. They're both environmental scientists and have implemented many eco-friendly features.",
    occupants: 2,
  },
  {
    id: "res011",
    position: [10.250086, 123.788618],
    name: "Wilson Residence",
    description:
      "A family of 3 that moved in 2022. They relocated from overseas and have brought unique cultural elements to their home.",
    occupants: 3,
  },
  {
    id: "res012",
    position: [10.250138, 123.788756],
    name: "Martinez Residence",
    description:
      "A large family of 5 that has lived here since 2020. They're active in the community and organize the annual block party.",
    occupants: 5,
  },
  {
    id: "res013",
    position: [10.250176, 123.788881],
    name: "Anderson Residence",
    description:
      "A wealthy family of 6 that built this luxury home in 2021. Mr. Anderson is a retired executive who collects vintage cars.",
    occupants: 6,
  },
  {
    id: "res014",
    position: [10.249807, 123.788447],
    name: "Singh Residence",
    description:
      "A family of 4 that moved in 2022. They maintain a beautiful tropical garden and often share produce with neighbors.",
    occupants: 4,
  },
  {
    id: "res015",
    position: [10.249701, 123.788549],
    name: "Brown Residence",
    description:
      "A family of 3 that relocated here in 2023. They're known for their artistic talents and host community art workshops.",
    occupants: 3,
  },
  {
    id: "res016",
    position: [10.24959, 123.78864],
    name: "Lee Residence",
    description:
      "A retired couple who moved in 2021. They've transformed their garden into a peaceful retreat that neighbors admire.",
    occupants: 2,
  },
  {
    id: "res017",
    position: [10.249458, 123.788747],
    name: "Davis Residence",
    description:
      "A family of 4 that built this modern home in 2022. Both parents work in finance and commute to the city center.",
    occupants: 4,
  },
  {
    id: "res018",
    position: [10.249353, 123.788854],
    name: "Gonzalez Residence",
    description:
      "A large family of 5 that moved in 2020. They're known for their weekend barbecues and welcoming nature.",
    occupants: 5,
  },
  {
    id: "res019",
    position: [10.249896, 123.788731],
    name: "Miller Residence",
    description:
      "A family of 4 that relocated here in 2021. Dr. Miller works at the university and often hosts student gatherings.",
    occupants: 4,
  },
  {
    id: "res020",
    position: [10.249796, 123.788828],
    name: "Wong Residence",
    description:
      "A family of 3 that moved in 2022. They run a successful online business and have a state-of-the-art home office.",
    occupants: 3,
  },
  {
    id: "res021",
    position: [10.24969, 123.788924],
    name: "Jackson Residence",
    description:
      "A family of 5 that has lived here since 2019. They're active in local sports and have a backyard basketball court.",
    occupants: 5,
  },
  {
    id: "res022",
    position: [10.249595, 123.789021],
    name: "White Residence",
    description:
      "A family of 4 that built this home in 2021. They're known for their beautiful water features and koi pond.",
    occupants: 4,
  },
  {
    id: "res023",
    position: [10.24949, 123.789107],
    name: "Lopez Residence",
    description:
      "A family of 3 that moved in 2022. They're passionate about cooking and often share their culinary creations with neighbors.",
    occupants: 3,
  },
  {
    id: "res024",
    position: [10.249933, 123.78901],
    name: "Harris Residence",
    description:
      "A wealthy family of 6 that renovated this historic property in 2020. They've maintained its original charm while adding modern amenities.",
    occupants: 6,
  },
  {
    id: "res025",
    position: [10.249844, 123.789117],
    name: "Clark Residence",
    description:
      "A family of 4 that moved in 2021. They're known for their beautiful holiday decorations that attract visitors from other neighborhoods.",
    occupants: 4,
  },
  {
    id: "res026",
    position: [10.249738, 123.789209],
    name: "Lewis Residence",
    description:
      "A family of 3 that relocated here in 2022. They've created a nature sanctuary in their backyard that attracts local wildlife.",
    occupants: 3,
  },
  {
    id: "res027",
    position: [10.248471, 123.789262],
    name: "Walker Residence",
    description:
      "A family of 4 that built this modern home in 2021. They're known for their minimalist design and clean aesthetic.",
    occupants: 4,
  },
  {
    id: "res028",
    position: [10.248783, 123.789257],
    name: "Hall Residence",
    description:
      "A wealthy family of 7 that moved in 2020. Mr. Hall is a successful entrepreneur who works from his custom home office.",
    occupants: 7,
  },
  {
    id: "res029",
    position: [10.249036, 123.789268],
    name: "Young Residence",
    description:
      "A family of 5 that relocated here in 2021. They're known for their beautiful rose garden that blooms year-round.",
    occupants: 5,
  },
  {
    id: "res030",
    position: [10.2493, 123.789343],
    name: "Allen Residence",
    description:
      "A large family of 6 that built this estate in 2019. They host an annual charity event in their spacious backyard.",
    occupants: 6,
  },
  {
    id: "res031",
    position: [10.249537, 123.789439],
    name: "Scott Residence",
    description:
      "A family of 4 that moved in 2022. Their home features a beautiful creek-side patio where they often entertain guests.",
    occupants: 4,
  },
  {
    id: "res032",
    position: [10.248592, 123.788881],
    name: "Green Residence",
    description:
      "A family of 3 that relocated here in 2021. They've incorporated many Asian-inspired elements in their home design.",
    occupants: 3,
  },
  {
    id: "res033",
    position: [10.248577, 123.789015],
    name: "Adams Residence",
    description:
      "A young professional couple who moved in 2023. They both work in tech and have transformed their apartment into a smart home.",
    occupants: 2,
  },
  {
    id: "res034",
    position: [10.248408, 123.788865],
    name: "Baker Residence",
    description:
      "A family of 5 that converted this historic building in 2020. They've preserved many original features while adding modern comforts.",
    occupants: 5,
  },
  {
    id: "res035",
    position: [10.248418, 123.789021],
    name: "Nelson Residence",
    description:
      "A family of 4 that moved in 2021. They're avid gardeners who have won several local landscaping awards.",
    occupants: 4,
  },
  {
    id: "res036",
    position: [10.248487, 123.78953],
    name: "Carter Residence",
    description:
      "A family of 3 that built this charming home in 2022. Mrs. Carter is an interior designer who often showcases her home in magazines.",
    occupants: 3,
  },
  {
    id: "res037",
    position: [10.248809, 123.789514],
    name: "Mitchell Residence",
    description:
      "A family of 4 that relocated here in 2021. They've created a tropical oasis with plants from their travels around the world.",
    occupants: 4,
  },
  {
    id: "res038",
    position: [10.249073, 123.789563],
    name: "Perez Residence",
    description:
      "A family of 5 that moved in 2020. Their secluded property features beautiful walking paths and a meditation garden.",
    occupants: 5,
  },
  {
    id: "res039",
    position: [10.249258, 123.789632],
    name: "Roberts Residence",
    description:
      "A family of 4 that built this modern farmhouse in 2022. They grow much of their own produce in their extensive vegetable garden.",
    occupants: 4,
  },
  {
    id: "res040",
    position: [10.249437, 123.789691],
    name: "Turner Residence",
    description:
      "A family of 3 that moved in 2021. Their property is known for its extensive gardens featuring plants from around the world.",
    occupants: 3,
  },
  {
    id: "res041",
    position: [10.248207, 123.788887],
    name: "Phillips Residence",
    description:
      "A family of 4 that relocated here in 2022. They maintain a traditional home with many heirloom furnishings.",
    occupants: 4,
  },
  {
    id: "res042",
    position: [10.248218, 123.789053],
    name: "Campbell Residence",
    description:
      "A family of 5 that built this lodge-style home in 2020. They're outdoor enthusiasts who lead the local hiking club.",
    occupants: 5,
  },
  {
    id: "res043",
    position: [10.248228, 123.789214],
    name: "Parker Residence",
    description:
      "A wealthy family of 6 that renovated this manor in 2021. They host an annual garden tour that raises funds for local charities.",
    occupants: 6,
  },
  {
    id: "res044",
    position: [10.248223, 123.789391],
    name: "Evans Residence",
    description:
      "A family of 4 that moved in 2022. They've created a Mediterranean-inspired retreat with an olive grove and herb garden.",
    occupants: 4,
  },
  {
    id: "res045",
    position: [10.248228, 123.789541],
    name: "Edwards Residence",
    description:
      "A family of 3 that built this modern home in 2021. The pavilion-style design maximizes indoor-outdoor living.",
    occupants: 3,
  },
  {
    id: "res046",
    position: [10.248234, 123.789697],
    name: "Collins Residence",
    description:
      "A family of 5 that relocated here in 2020. Their courtyard home features a central fountain and extensive seating areas.",
    occupants: 5,
  },
  {
    id: "res047",
    position: [10.24949, 123.78802],
    name: "Basketball Court",
    description:
      "A community basketball court that serves as a gathering place for residents. It's well-maintained and often busy.",
    occupants: 4,
  },
  {
    id: "res048",
    position: [10.248904, 123.788951],
    name: "Basketball Court",
    description:
      "A community basketball court that serves as a gathering place for residents. It's well-maintained and often busy.",
    occupants: 5,
  },
  {
    id: "res049",
    position: [10.248492, 123.790416],
    name: "Clinic",
    description:
      "A small community clinic that provides basic healthcare services. It's staffed by a friendly team of local doctors and nurses.",
    occupants: 2,
  },
  {
    id: "res050",
    position: [10.248218, 123.790367],
    name: "Summit Hall",
    description:
      "A community center that hosts events and activities for residents. It's a hub for social gatherings and local clubs.",
    occupants: 3,
  },
  {
    id: "res051",
    position: [10.250218, 123.788093],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res052",
    position: [10.250271, 123.788307],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res053",
    position: [10.250329, 123.788506],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res054",
    position: [10.250424, 123.788699],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res055",
    position: [10.250408, 123.789305],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res056",
    position: [10.250118, 123.789364],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res057",
    position: [10.247917, 123.789198],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res058",
    position: [10.250155, 123.787894],
    name: "Parking Lot",
    description:
      "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
]

// Add a default pin colors array
export const defaultPinColors = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
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