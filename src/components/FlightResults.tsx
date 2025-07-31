import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../theme/colors';

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const FlightResults = ({  }: any) => {
  
const { itineraries,loading,error } = useAppSelector((state) => state.flightSearch); 

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  const renderLeg = (leg: any, type: 'Depart' | 'Return') => (
    <View style={styles.leg}>
      <Text style={styles.legText}>
        {type}: {formatDateTime(leg.departure)} - {formatDateTime(leg.arrival)} (
        {leg.origin.displayCode} ➜ {leg.destination.displayCode})
      </Text>
      <Text style={styles.durationText}>{formatDuration(leg.durationInMinutes)}</Text>
    </View>
  );

  return (
    <FlatList
      data={itineraries}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const [departure, returnFlight] = item.legs;
        const airline = departure.carriers.marketing[0];

        return (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.price}>{item.price.formatted}</Text>
              <Image source={{ uri: airline.logoUrl }} style={styles.logo} />
            </View>
            {renderLeg(departure, 'Depart')}
            {returnFlight && renderLeg(returnFlight, 'Return')}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  leg: {
    marginTop: 8,
  },
  legText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  durationText: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
});

export default FlightResults;
