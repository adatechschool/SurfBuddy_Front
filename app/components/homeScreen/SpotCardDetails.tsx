import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import airtableService from '@/airtableService';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global'; 


export default function SpotCarddetails({ item }: { item: AirtableRecord }) {
  const surfBreak = item.fields["Surf Break"]?.[0] ?? 'Inconnu';
  const address = item.fields.Address ?? 'Adresse non disponible';

  return (
    <View>
      <Text style={styles.title}>{surfBreak}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
