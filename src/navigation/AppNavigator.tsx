import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {  TouchableOpacity } from "react-native";
import { logout } from "../utils/authStorage";
import AirportSearchModal from "../screens/AirportSearchModal";
import CalendarScreen from "../screens/CalendarScreen";




const Stack = createStackNavigator();



export default function AppNavgator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Flights" 
                component={HomeScreen} 
                options={({navigation}) => ({
                    headerRight: () => (
                    <TouchableOpacity onPress={()=> logout().then(()=> navigation.navigate('Login'))}>
                        <AntDesign
                            color={'#000'}
                            name={'logout'}
                            size={20}
                            style={{
                                marginRight: 10
                            }}
                        />
                    </TouchableOpacity>
                )})}
            />

            <Stack.Screen
                name="AirportSearch"
                component={AirportSearchModal}
                options={{ presentation: 'modal', headerTitle: 'Search Airport' }}
            />
            <Stack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{ presentation: 'modal', headerShown: false }}
            />

        </Stack.Navigator>
    )
}