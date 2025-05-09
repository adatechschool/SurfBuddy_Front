import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import type { AirtableRecord } from '@/airtableService';

const { width, height } = Dimensions.get('window');

interface DetailsSpotMapsProps {
  spot: AirtableRecord;
}

export default function DetailsSpotMaps({ spot }: DetailsSpotMapsProps) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocationFromAddress() {
      try {
        setLoading(true);
        
        // Vérifier si l'adresse est disponible
        const address = spot.fields.Address;
        if (!address) {
          setError("Adresse non disponible pour ce spot");
          setLoading(false);
          return;
        }

        // Demander la permission de géolocalisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError("Permission de localisation refusée");
          setLoading(false);
          return;
        }

        // Géocoder l'adresse pour obtenir les coordonnées
        const geocode = await Location.geocodeAsync(address);
        
        if (geocode.length > 0) {
          const { latitude, longitude } = geocode[0];
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        } else {
          setError("Impossible de trouver les coordonnées pour cette adresse");
        }
      } catch (err) {
        console.error("Erreur lors de la géolocalisation:", err);
        setError("Erreur lors du chargement de la carte");
      } finally {
        setLoading(false);
      }
    }

    getLocationFromAddress();
  }, [spot]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006A71" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Localisation non disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={spot.fields["Surf Break"]?.[0] || "Spot de surf"}
          description={spot.fields.Address || ""}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.3,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
    padding: 10,
  },
});
