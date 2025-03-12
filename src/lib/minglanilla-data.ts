// GeoJSON data representing Minglanilla's different zones and areas
export const minglanillaData = {
    type: "FeatureCollection",
    features: [
      // Poblacion Ward
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [123.791, 10.245],
              [123.793, 10.246],
              [123.794, 10.245],
              [123.793, 10.244],
              [123.791, 10.245],
            ],
          ],
        },
        properties: {
          zoneId: "POB",
          zoneName: "Poblacion Ward",
          population: 15000,
          landArea: "2.5 sq km",
          type: "Commercial/Residential",
          landmarks: ["Municipal Hall", "Public Market", "St. Mary's Church"],
          establishments: 120,
          yearEstablished: 1858,
          barangayHall: "Poblacion Ward Hall",
          healthCenters: 2,
          schools: ["Minglanilla Central School", "St. Catherine's College"],
        },
      },
      // Tungkil
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [123.792, 10.267],
              [123.794, 10.268],
              [123.795, 10.267],
              [123.794, 10.266],
              [123.792, 10.267],
            ],
          ],
        },
        properties: {
          zoneId: "TUN",
          zoneName: "Tungkil",
          population: 12000,
          landArea: "3.2 sq km",
          type: "Residential",
          landmarks: ["Deca Homes", "Tungkil Elementary School", "Tungkil Chapel"],
          establishments: 45,
          yearEstablished: 1902,
          barangayHall: "Tungkil Barangay Hall",
          healthCenters: 1,
          schools: ["Tungkil Elementary School", "Tungkil National High School"],
        },
      },
      // Calajoan
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [123.793, 10.248],
              [123.795, 10.249],
              [123.796, 10.248],
              [123.795, 10.247],
              [123.793, 10.248],
            ],
          ],
        },
        properties: {
          zoneId: "CAL",
          zoneName: "Calajoan",
          population: 8500,
          landArea: "2.8 sq km",
          type: "Industrial/Residential",
          landmarks: ["Calajoan Industrial Park", "Calajoan Sports Complex"],
          establishments: 85,
          yearEstablished: 1920,
          barangayHall: "Calajoan Barangay Complex",
          healthCenters: 1,
          schools: ["Calajoan Elementary School"],
        },
      },
      // Add more zones as needed...
    ],
  }
  
  