import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from './slices/flightSearchSlice';
import airportSearchReducer from './slices/airportSearchSlice';


const store = configureStore({
    reducer: {
        flightSearch: flightSearchReducer,
        airportSearch: airportSearchReducer
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;