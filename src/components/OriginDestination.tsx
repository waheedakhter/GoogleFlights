import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { swapOriginAndDestination } from '../store/slices/flightSearchSlice';
import { Colors } from "../theme/colors";

interface ScreenProps {
    
}

export const OriginDestination: React.FC<ScreenProps> = ({}) => {

    const dispatch = useAppDispatch();
    const { origin, destination } = useAppSelector((state) => state.flightSearch);
    const navigation = useNavigation();
    return (<View style={styles.container} >
            <TouchableOpacity style={styles.inputStyle} onPress={()=> navigation.navigate('AirportSearch', { type: 'origin' })}>
                <Entypo
                    color={Colors.textLight}
                    name={'circle'}
                    size={14}
                    style={{
                        marginRight: 10
                    }}
                />
                <Text style={styles.label}>{origin?.name ?? 'From'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.swapButton}onPress={()=> {
                    if(origin?.name && destination?.name){
                        dispatch(swapOriginAndDestination())
                    }                
                }}>
                <MaterialIcons
                    name={'swap-horizontal-circle'}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputStyle} onPress={()=> navigation.navigate('AirportSearch', { type: 'destination' })}>
                <EvilIcons
                    color={Colors.border}
                    name={'location'}
                    size={20}
                    style={{
                        marginRight: 10
                    }}
                />
                <Text style={styles.label}>{destination?.name ?? "Where to"}</Text>
            </TouchableOpacity>
    </View>)

}

const styles = StyleSheet.create({
  container: {
    margin:10,
    flexDirection:'row'
  },
  inputStyle:{
    flexDirection:'row', 
    padding:10,
    flex:1, 
    borderWidth:1,
    borderColor:Colors.border
  },
  label: {
    marginRight:20
  },
  swapButton: { justifyContent:"center"}
});