import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';
import SpotCardImage from './SpotCardImage';
import SpotCardDetails from './SpotCardDetails';

const { width } = Dimensions.get('window');

interface SpotCardProps {
  spot: AirtableRecord;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  return (
    <Link href={`/details/${spot.id}`} asChild>
  <View style={styles.card}>
    <SpotCardImage item={spot} />
    <SpotCardDetails item={spot} />
  </View>
</Link>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    marginVertical: 30,
    padding: 20,
    backgroundColor: style.color?.primary || '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // pour Android
  },
});

export default SpotCard;
