import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import airtableService from '@/airtableService';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';
import SpotCardImage from '../components/homeScreen/SpotCardImage';
import SpotCarddetails from '../components/homeScreen/SpotCardDetails';

export default function SpotDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [spot, setSpot] = useState<AirtableRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const record = await airtableService.getSpotById(id);
        setSpot(record);
      } catch (error) {
        console.error('Erreur chargement du spot:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={style.color.primary} />
      </View>
    );
  }

  if (!spot) {
    return (
      <View style={styles.center}>
        <Text>Spot introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SpotCardImage item={spot} />
      <SpotCardDetails item={spot} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: style.color.background,
  },
});
