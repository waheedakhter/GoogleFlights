import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import {  useAppSelector } from "../store/hooks";
import { Colors } from "../theme/colors";

interface ScreenProps {
    
}

export const Calendar: React.FC<ScreenProps> = ({}) => {

    const { departureDate,returnDate, tripType } = useAppSelector((state) => state.flightSearch);
    const navigation = useNavigation();
    return (<View style={styles.container} >
            <TouchableOpacity style={styles.inputStyle} onPress={()=> navigation.navigate('Calendar')}>
                <Entypo
                    color={Colors.border}
                    name={'calendar'}
                    size={14}
                    style={{
                        marginRight: 10
                    }}
                />
                <Text style={styles.label}>{departureDate ?? 'Departure'}</Text>
            </TouchableOpacity>
            {tripType === 'round' ? <TouchableOpacity style={styles.inputStyle} onPress={()=> navigation.navigate('Calendar')}>
                <Text style={styles.label}>{returnDate ?? "Return"}</Text> 
            </TouchableOpacity> : null}
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