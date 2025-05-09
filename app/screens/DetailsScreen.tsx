import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import airtableService from '@/airtableService';
import type { AirtableRecord } from '@/airtableService';
import DetailsSpotImage from '../components/detailsScreen/DetailsSpotImage';
import DetailsSpotContent from '../components/detailsScreen/DetailsSpotContent';
import DetailsSpotMaps from '../components/detailsScreen/DetailsSpotMaps';
import style from '@/styles/global';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [spot, setSpot] = useState<AirtableRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotDetails() {
      if (!id) {
        setError("ID du spot non fourni");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Supposons que vous avez une méthode pour obtenir un spot par ID
        const spotData = await airtableService.getSpotById(id as string);
        if (spotData) {
          setSpot(spotData);
        } else {
          setError("Spot non trouvé");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des détails du spot:", err);
        setError("Erreur lors du chargement des détails");
      } finally {
        setLoading(false);
      }
    }

    fetchSpotDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={style.color.primary} />
      </View>
    );
  }

  if (error || !spot) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Spot non disponible"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <DetailsSpotImage spot={spot} />
      <DetailsSpotContent spot={spot} />
      
      {/* Section carte */}
      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Localisation</Text>
        <DetailsSpotMaps spot={spot} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.color.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  mapSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: style.color.text,
    alignSelf: 'flex-start',
  },
});