import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';
import SpotCardImage from './SpotCardImage';
import SpotCardDetails from './SpotCardDetails';

interface SpotCardProps {
  spot: AirtableRecord;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/screens/DetailsScreen',
      params: { id: spot.id }
    });
  };
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.card}>
        <SpotCardImage item={spot} />
        <SpotCardDetails item={spot} />
      </View>
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: style.color?.primary || '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // pour Android
  },
});

export default SpotCard;