import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';

export default function SpotCardDetails({ item }: { item: AirtableRecord }) {
  const surfBreak = item.fields["Surf Break"]?.[0] ?? 'Inconnu';
  const address = item.fields.Address ?? 'Adresse non disponible';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surfBreak}</Text>
      <Text style={styles.address}>{address}</Text>
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