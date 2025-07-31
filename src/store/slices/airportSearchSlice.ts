import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Airport {
  skyId: string;
  name: string;
  type: 'AIRPORT' | 'CITY' | 'COUNTRY';
  country: string;
  fullLabel: string;
  entityId: string;
}

interface AirportSearchState {
  loading: boolean;
  results: Airport[];
  error: string | null;
}

const initialState: AirportSearchState = {
  loading: false,
  results: [],
  error: null,
};

export const fetchAirportSuggestions = createAsyncThunk(
  'airportSearch/fetchAirportSuggestions',
  async (query: string) => {
    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      params: { query },
      headers: {
        'X-RapidAPI-Key': 'bf10ffcb82msh36d22f455d2f17cp1a1a11jsnc6d30fee0e06',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    };
    
    const response = await axios.request(options);
    const rawData = response.data.data;
    // Normalize into Airport[]
    const parsed: Airport[] = rawData.map((item: any) => ({
      skyId: item.skyId,
      name: item.presentation.title,
      type: item.navigation.relevantFlightParams.flightPlaceType,
      country: item.presentation.subtitle,
      fullLabel: item.presentation.suggestionTitle,
      entityId: item.entityId,
    }));

    return parsed;
  }
);

const airportSearchSlice = createSlice({
  name: 'airportSearch',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirportSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAirportSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchAirportSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching results';
      });
  },
});

export const { clearResults } = airportSearchSlice.actions;
export default airportSearchSlice.reducer;
