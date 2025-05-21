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
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficulty}>{difficulty}</Text>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006A71',
    textAlign: 'center',
    marginBottom: 5,
  },
  city: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
    difficultyContainer: {
    borderWidth: 1,
    borderColor: '#006A71',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 5,
  },
  difficulty: {
    fontSize: 14,
    color: '#006A71',
    textAlign: 'center',
  },
});