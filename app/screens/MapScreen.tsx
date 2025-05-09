import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import airtableService from '@/airtableService';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [spots, setSpots] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Coordonnées initiales centrées sur l'Europe
  const initialRegion = {
    latitude: 46.227638,
    longitude: 2.213749,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  useEffect(() => {
    async function fetchAllSpots() {
      try {
        setLoading(true);
        // Récupérer tous les spots depuis Airtable
        const allSpots = await airtableService.getAllDestinations();
        
        // Géocoder les adresses pour obtenir les coordonnées
        const spotsWithCoordinates = await airtableService.geocodeAddresses(allSpots);
        
        setSpots(spotsWithCoordinates);
      } catch (err) {
        console.error("Erreur lors du chargement des spots:", err);
        setError("Erreur lors du chargement des spots");
      } finally {
        setLoading(false);
      }
    }

    fetchAllSpots();
  }, []);

  const handleMarkerPress = (spotId: string) => {
    router.push({
      pathname: '/screens/DetailsScreen',
      params: { id: spotId }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={style.color.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {spots.map((spot) => {
          // Vérifier si le spot a des coordonnées
          if (!spot.fields.Latitude || !spot.fields.Longitude) return null;

          const latitude = parseFloat(spot.fields.Latitude);
          const longitude = parseFloat(spot.fields.Longitude);

          // Vérifier que les coordonnées sont valides
          if (isNaN(latitude) || isNaN(longitude)) return null;

          return (
            <Marker
              key={spot.id}
              coordinate={{
                latitude,
                longitude
              }}
              title={spot.fields["Surf Break"]?.[0] || "Spot de surf"}
              description={spot.fields.Country || ""}
              onCalloutPress={() => handleMarkerPress(spot.id)}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  {spot.fields.Photos && spot.fields.Photos.length > 0 && (
                    <Image
                      source={{ uri: spot.fields.Photos[0].url }}
                      style={styles.calloutImage}
                    />
                  )}
                  <Text style={styles.calloutTitle}>{spot.fields["Surf Break"]?.[0] || "Spot de surf"}</Text>
                  <Text style={styles.calloutSubtitle}>{spot.fields.Country || ""}</Text>
                  <Text style={styles.calloutDescription}>
                    {spot.fields.DifficultyLevel ? `Difficulté: ${spot.fields.DifficultyLevel}` : ""}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
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
  calloutContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#888',
  },
});