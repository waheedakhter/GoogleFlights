import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_RESPONSE } from '../mockData/mockFlights';
import axios from 'axios';
import { MOCK_ONEWAY_RESPONSE } from '../mockData/mockOneWay';

interface Airport {
 skyId: string;
  name: string;
  type: 'AIRPORT' | 'CITY' | 'COUNTRY';
  country: string;
  entityId: string
}

interface FlightSearchState {
  origin: Airport | null;
  destination: Airport | null;
  tripType: 'oneway' | 'round';
  departureDate: string | null;
  returnDate: string | null;
  loading: boolean;
  itineraries: [];
  error: string | null;
}

const initialState: FlightSearchState = {
  origin: null,
  destination: null,
  tripType: 'oneway',
  departureDate: null,
  returnDate: null,
  loading: false,
  itineraries: [],
  error: null,

};

export const searchFlights = createAsyncThunk<
  [], // Return type
  void,        // No args because we get from state
  { state: { flightSearch: FlightSearchState } }
>(
  'flightSearch/searchFlights',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().flightSearch;
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
    } = state;

    const params = new URLSearchParams({
      originSkyId: origin?.skyId || '',
      destinationSkyId: destination?.skyId || '',
      originEntityId: origin?.entityId || '',
      destinationEntityId: destination?.entityId || '',
      date: departureDate || '',
      returnDate: returnDate || '',
      cabinClass: 'economy',
      adults: '1',
      sortBy: 'best',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US',
    });

    const options = {
      method: 'GET' as const,
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
      params,
      headers: {
        'X-RapidAPI-Key': 'bf10ffcb82msh36d22f455d2f17cp1a1a11jsnc6d30fee0e06',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    };
    try {
      const { data } = await axios.request(options);

      if (data.status === false || !data.data) {
        console.warn('API failed or returned CAPTCHA. Using mock data.');
       return tripType === 'oneway'
      ? MOCK_ONEWAY_RESPONSE.data.itineraries
      : MOCK_RESPONSE.data.itineraries;
      }

      return data.data.itineraries;
    } catch (error) {
      console.warn('Axios request failed. Using mock data.');
        return tripType === 'oneway'
      ? MOCK_ONEWAY_RESPONSE.data.itineraries
      : MOCK_RESPONSE.data.itineraries;
    }
  }
);

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setOrigin(state, action: PayloadAction<Airport>) {
      state.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<Airport>) {
      state.destination = action.payload;
    },
    setTripType(state, action: PayloadAction<'oneway' | 'round'>) {
      state.tripType = action.payload;
    },
    setDepartureDate(state, action: PayloadAction<string>) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action: PayloadAction<string>) {
      state.returnDate = action.payload;
    },
    swapOriginAndDestination: (state) => {
        const temp = state.origin;
        state.origin = state.destination;
        state.destination = temp;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchFlights.pending, state => {
        state.loading = true;
        state.error = null;
        state.itineraries = [];
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch flights';
      });
  },
});

export const {
  setOrigin,
  setDestination,
  setTripType,
  setDepartureDate,
  setReturnDate,
  swapOriginAndDestination,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
