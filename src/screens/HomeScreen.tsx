import {  Button, View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { OriginDestination } from "../components/OriginDestination";
import { TripTypeSelector } from "../components/TripTypeSelector";
import { Calendar } from "../components/Calendar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { searchFlights } from "../store/slices/flightSearchSlice";
import FlightResults from "../components/FlightResults";


interface ScreenProps {
    navigation: StackNavigationProp<any, any>;
    route: RouteProp<any, any>;
}

export const HomeScreen: React.FC<ScreenProps> = ({}) => {

    const { origin, destination, departureDate, returnDate, tripType } = useAppSelector((state) => state.flightSearch);
    const dispatch = useAppDispatch();
    return (<View >
        <TripTypeSelector/>
        <OriginDestination/>
        <Calendar/>
        <Button 
            title="Search" 
            disabled={!origin || !destination || !departureDate || (tripType === 'round' && !returnDate)}
            onPress={()=> dispatch(searchFlights())}
        />
        <FlightResults/>
    </View>)

}