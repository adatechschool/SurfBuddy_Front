import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Spot } from '../../types/Spot';

const { width, height } = Dimensions.get('window');

interface DetailsSpotMapsProps {
  spot: Spot;
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
    async function setupLocation() {
      try {
        setLoading(true);

        // Option 1: Si vous avez déjà les coordonnées dans votre BDD
        if (spot.latitude && spot.longitude) {
          setLocation({
            latitude: parseFloat(spot.latitude.toString()),
            longitude: parseFloat(spot.longitude.toString()),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setLoading(false);
          return;
        }

        // Option 2: Géocoder à partir de la ville et du pays
        if (spot.city && spot.country) {
          // Demander la permission de géolocalisation
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setError("Permission de localisation refusée");
            setLoading(false);
            return;
          }

          // Créer l'adresse à partir des données disponibles
          const address = `${spot.city}, ${spot.country}`;
          
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
            setError(`Impossible de trouver les coordonnées pour ${address}`);
          }
        } else {
          setError("Informations de localisation insuffisantes");
        }
      } catch (err) {
        console.error("Erreur lors de la géolocalisation:", err);
        setError("Erreur lors du chargement de la carte");
      } finally {
        setLoading(false);
      }
    }

    setupLocation();
  }, [spot]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006A71" />
        <Text style={styles.loadingText}>Chargement de la carte...</Text>
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
        pointerEvents="none"
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}

        // SOLUTION 1: Désactiver toutes les interactions
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        
        // // SOLUTION 2: Alternative - Garder zoom mais désactiver scroll
        // scrollEnabled={false}
        // zoomEnabled={true}
        // rotateEnabled={false}
        // pitchEnabled={false}
        
        // Désactiver les contrôles par défaut pour une vue plus propre
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={true}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        
        // Style de carte (optionnel)
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={spot.spot_name || "Surf spot"}
          description={`${spot.city || ''}, ${spot.country || ''}`}
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
    backgroundColor: '#f5f5f5',
    // Ajouter une bordure pour mieux délimiter la carte
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
});