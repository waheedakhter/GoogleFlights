import { StyleSheet, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTripType } from '../store/slices/flightSearchSlice';

const tripTypes = ['One Way', 'Round Trip'] as const;
const tripTypesObj = { oneway: 'One Way', round: 'Round Trip'}
export const TripTypeSelector = () => {

  const { tripType } = useAppSelector((state) => state.flightSearch);  
  const dispatch = useAppDispatch();
  return <Menu>
    <MenuTrigger>
      <Text style={styles.triggerText}>{tripTypesObj[tripType]}</Text>
    </MenuTrigger>
    <MenuOptions optionsContainerStyle={styles.optionsContainer}>
      {tripTypes.map((type) => (
        <MenuOption
          key={type}
          onSelect={() => {
            dispatch(setTripType(type === "One Way" ? 'oneway' : 'round'))
          }}
          text={type}
        />
      ))}
    </MenuOptions>
  </Menu>
}

const styles = StyleSheet.create({
  triggerText: {
    margin:10,
    marginTop:20,
    borderWidth:1,
    padding:10,
    width:100,
    borderColor:'#999'
  },
  optionsContainer:{
    marginTop:60,
    marginLeft:10,
    width:100
}
});

