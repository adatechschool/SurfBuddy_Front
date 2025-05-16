import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Spot} from '../../types/Spot';

export default function SpotCardDetails({ item }: { item: Spot }) {
  const surfBreak = item.spot_name ?? 'Inconnu';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surfBreak}</Text>
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
  address: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});