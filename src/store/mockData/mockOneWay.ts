export const MOCK_ONEWAY_RESPONSE = {
  status: true,
  timestamp: 1753958151000,
  sessionId: 'mock-session-oneway-1234',
  data: {
    context: {
      status: 'complete',
      totalResults: 1,
    },
    itineraries: [
      {
        id: '13542-2402201235--30598-0-12712-2402201550',
        price: {
          raw: 199.99,
          formatted: '$200',
        },
        legs: [
          {
            id: '13542-2402201235--30598-0-12712-2402201550',
            origin: {
              id: 'LGW',
              name: 'London Gatwick',
              displayCode: 'LGW',
              city: 'London',
              isHighlighted: false,
            },
            destination: {
              id: 'JFK',
              name: 'New York John F. Kennedy',
              displayCode: 'JFK',
              city: 'New York',
              isHighlighted: false,
            },
            durationInMinutes: 495,
            stopCount: 0,
            isSmallestStops: false,
            departure: '2024-02-20T12:35:00',
            arrival: '2024-02-20T15:50:00',
            timeDeltaInDays: 0,
            carriers: {
              marketing: [
                {
                  id: -30598,
                  logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/I%29.png',
                  name: 'Norse Atlantic Airways (UK)',
                },
              ],
              operationType: 'fully_operated',
            },
            segments: [
              {
                id: '13542-12712-2402201235-2402201550--30598',
                origin: {
                  flightPlaceId: 'LGW',
                  displayCode: 'LGW',
                  parent: {
                    flightPlaceId: 'LOND',
                    displayCode: 'LON',
                    name: 'London',
                    type: 'City',
                  },
                  name: 'London Gatwick',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'JFK',
                  displayCode: 'JFK',
                  parent: {
                    flightPlaceId: 'NYCA',
                    displayCode: 'NYC',
                    name: 'New York',
                    type: 'City',
                  },
                  name: 'New York John F. Kennedy',
                  type: 'Airport',
                },
                departure: '2024-02-20T12:35:00',
                arrival: '2024-02-20T15:50:00',
                durationInMinutes: 495,
                flightNumber: '701',
                marketingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
              },
            ],
          },
        ],
        isSelfTransfer: false,
        isProtectedSelfTransfer: false,
        farePolicy: {
          isChangeAllowed: false,
          isPartiallyChangeable: false,
          isCancellationAllowed: false,
          isPartiallyRefundable: false,
        },
        eco: {
          ecoContenderDelta: 12.54,
        },
        tags: ['cheapest'],
        isMashUp: false,
        hasFlexibleOptions: false,
        score: 0.982,
      },
    ],
    messages: [],
    filterStats: {
      duration: {
        min: 495,
        max: 495,
      },
      airports: [],
      carriers: [],
      stopPrices: {},
    },
  },
};
