import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {Spot} from '../../types/Spot';
import style from '@/styles/global';
import SpotCardDetails from './SpotCardDetails';

interface SpotCardProps {
  spot: Spot;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/screens/DetailsScreen',
      params: { id: spot.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.card}>
        <SpotCardDetails item={spot} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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