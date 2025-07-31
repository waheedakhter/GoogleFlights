import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAirportSuggestions, clearResults } from '../store/slices/airportSearchSlice';
import { setOrigin, setDestination } from '../store/slices/flightSearchSlice';
import { useDebounce } from '../utils/useDebounce';
import { Colors } from '../theme/colors';

type Props = {};

const AirportSearchModal = ({ navigation, route }: Props) => {
  const { type } = route.params; // 'origin' or 'destination'
  const dispatch = useAppDispatch();
  const { results, loading } = useAppSelector((state) => state.airportSearch);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      dispatch(fetchAirportSuggestions(debouncedQuery));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedQuery]);

  const handleSelect = (airport: any) => {
    if (type === 'origin') dispatch(setOrigin(airport));
    else dispatch(setDestination(airport));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Search ${type} airport`}
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.skyId}
          renderItem={({ item }) => (<TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
                <Text style={styles.itemText}>{item.fullLabel || item.name} </Text>
                <Text style={styles.itemSub} >
                {item.country}
                </Text>
            </TouchableOpacity>)}
        />
      )}
    </View>
  );
};

export default AirportSearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  input: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 14,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemSub: {
    fontSize: 12,
    color:Colors.textLight
  },
});
