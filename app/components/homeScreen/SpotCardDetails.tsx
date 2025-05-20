import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Spot} from '../../types/Spot';

export default function SpotCardDetails({ item }: { item: Spot }) {
  const surfBreak = item.spot_name ?? 'Inconnu';
  const city = item.city ?? 'Inconnu';
  const country = item.country ?? 'Inconnu';
  const difficulty = item.difficulty ?? 'Inconnu';
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surfBreak}</Text>
      <Text style={styles.city}>{city}, {country}</Text>
      <Text style={styles.city}>{difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});