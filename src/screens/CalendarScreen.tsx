import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setDepartureDate,
  setReturnDate,
} from '../store/slices/flightSearchSlice';
import { Colors } from '../theme/colors';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const tripType = useAppSelector((state) => state.flightSearch.tripType);
  const departureDate = useAppSelector((state) => state.flightSearch.departureDate);
  const returnDate = useAppSelector((state) => state.flightSearch.returnDate);

  const [start, setStart] = useState(departureDate);
  const [end, setEnd] = useState(returnDate);

  

  const handleDone = () => {
    if (start) dispatch(setDepartureDate(start));
    tripType === 'round' && end ? dispatch(setReturnDate(end)) : dispatch(setReturnDate(null));
    navigation.goBack();
  };

    const handleSelect = (dateString: string) => {
        if (tripType === 'oneway') {
            setStart(dateString);
            setEnd(null); // optional reset
        } else if (tripType === 'round') {
            if (!start || (start && end)) {
            // New selection or restart
            setStart(dateString);
            setEnd(null);
            } else if (start && !end) {
            // Selecting end date
            if (new Date(dateString) < new Date(start)) {
                // If selected date is before start, restart
                setStart(dateString);
            } else {
                setEnd(dateString);
            }
            }
        }
    } 
  const getMarkedDates = () => {
  if (tripType === 'oneway') {
    return start
      ? {
          [start]: {
            selected: true,
            marked: true,
            selectedColor: '#007aff',
            price: 100, // example
          },
        }
      : {};
  } else if (start && end) {
    const range: Record<string, any> = {};
    let current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      range[dateStr] = {
        selected: true,
        selectedColor: Colors.selected,
        price: 80 + Math.floor(Math.random() * 40), // sample price logic
      };
      current.setDate(current.getDate() + 1);
    }
    return range;
  } else if (start) {
    return {
      [start]: {
        selected: true,
        marked: true,
        selectedColor: Colors.selected,
        price: 90,
      },
    };
  }
  return {};
};

const today = new Date().toISOString().slice(0, 10); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {tripType === 'oneway' ? 'Select Departure Date' : 'Select Dates'}
      </Text>
      <Calendar 
        minDate={today}
        markedDates={getMarkedDates()} 
        onDayPress={(day) => handleSelect(day.dateString)}
    />
      <View style={styles.footer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.cancelBtn}>
          <Text>Cancel</Text>
        </Pressable>
        {((tripType === 'oneway' && start) || (tripType === 'round' && end)) && (
          <Pressable onPress={handleDone} style={styles.doneBtn}>
            <Text style={{ color: Colors.white }}>Done</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  doneBtn: {
    padding: 10,
    backgroundColor: Colors.selected,
    borderRadius: 6,
  },
});
