// mockFlights.ts
export const MOCK_RESPONSE = {
  status: true,
  data: {
    itineraries: [
      {
        id: "sample-id",
        price: { raw: 419.18, formatted: "$420" },
        legs: [
          {
            id: "leg1",
            origin: { displayCode: "LGW", name: "London Gatwick" },
            destination: { displayCode: "JFK", name: "New York JFK" },
            departure: "2024-02-20T12:35:00",
            arrival: "2024-02-20T15:50:00",
            durationInMinutes: 495,
            stopCount: 0,
            carriers: {
              marketing: [
                {
                  name: "Norse Atlantic Airways (UK)",
                  logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                },
              ],
            },
          },
          {
            id: "leg2",
            origin: { displayCode: "JFK", name: "New York JFK" },
            destination: { displayCode: "LGW", name: "London Gatwick" },
            departure: "2024-02-22T18:10:00",
            arrival: "2024-02-23T06:00:00",
            durationInMinutes: 410,
            stopCount: 0,
            carriers: {
              marketing: [
                {
                  name: "Norse Atlantic Airways (UK)",
                  logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
