import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Spot } from '../types/Spot';
import DetailsSpotImage from '../components/detailsScreen/DetailsSpotImage';
import DetailsSpotContent from '../components/detailsScreen/DetailsSpotContent';
import DetailsSpotMaps from '../components/detailsScreen/DetailsSpotMaps';
import style from '@/styles/global';

// Remplacez par votre URL d'API
const API_URL = "http://192.168.13.5:8000";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [spot, setSpot] = useState<Spot | null>(null);
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
        
        // Récupérer les détails du spot depuis votre API Symfony
        const response = await fetch(`${API_URL}/spots/${id}`);
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const spotData = await response.json();
        
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
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  if (error || !spot) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || "Spot non disponible"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Section image */}
        <DetailsSpotImage spot={spot} />
        
        {/* Section contenu */}
        <DetailsSpotContent spot={spot} />
        
        {/* Section carte */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Localisation</Text>
          <DetailsSpotMaps spot={spot} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.color.background,
  },
  content: {
    padding: 15,
    paddingBottom: 80, // Pour éviter que le contenu soit caché par la navigation
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: style.color.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: style.color.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: style.color.background,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
  },
  mapSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: style.color.text,
    marginBottom: 10,
    textAlign: 'center',
  },
});