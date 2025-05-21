import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Spot } from '../types/Spot';
import style from '@/styles/global';

const { width, height } = Dimensions.get('window');

// URL de l'API backend
const API_URL = "http://192.168.13.5:8000";
console.log("URL de l'API utilisée:", API_URL);

export default function MapScreen() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotsWithCoordinates, setSpotsWithCoordinates] = useState<Spot[]>([]);
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
        console.log("Tentative de récupération des spots depuis:", `${API_URL}/spots`);
        
        // Récupérer tous les spots depuis votre API backend
        const response = await fetch(`${API_URL}/spots`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Spots reçus de l'API:", data);
        console.log("Nombre de spots:", data.length);
        
        setSpots(data);
        
        // Demander la permission de géolocalisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Permission de localisation refusée");
          setLoading(false);
          return;
        }
        
        // Traiter les spots pour ajouter des coordonnées si nécessaire
        const processedSpots = await Promise.all(data.map(async (spot) => {
          // Vérifier si le spot a déjà des coordonnées valides
          const existingCoordinates = getSpotCoordinates(spot);
          if (existingCoordinates) {
            console.log(`Spot ${spot.id} (${spot.spot_name}) a déjà des coordonnées:`, existingCoordinates);
            return {
              ...spot,
              processedLatitude: existingCoordinates.latitude,
              processedLongitude: existingCoordinates.longitude
            };
          }
          
          // Si pas de coordonnées, essayer de géocoder à partir de la ville et du pays
          if (spot.city && spot.country) {
            try {
              const address = `${spot.city}, ${spot.country}`;
              console.log(`Géocodage de l'adresse pour ${spot.id} (${spot.spot_name}):`, address);
              
              const geocode = await Location.geocodeAsync(address);
              
              if (geocode.length > 0) {
                const { latitude, longitude } = geocode[0];
                console.log(`Coordonnées trouvées pour ${spot.id} (${spot.spot_name}):`, { latitude, longitude });
                
                return {
                  ...spot,
                  processedLatitude: latitude,
                  processedLongitude: longitude
                };
              } else {
                console.log(`Aucune coordonnée trouvée pour ${spot.id} (${spot.spot_name})`);
                return spot;
              }
            } catch (err) {
              console.error(`Erreur lors du géocodage pour ${spot.id} (${spot.spot_name}):`, err);
              return spot;
            }
          }
          
          return spot;
        }));
        
        // Filtrer les spots qui ont des coordonnées valides
        const validSpots = processedSpots.filter(spot => 
          spot.processedLatitude && spot.processedLongitude
        );
        
        console.log("Spots avec coordonnées valides après traitement:", validSpots.length);
        setSpotsWithCoordinates(validSpots);
      } catch (err) {
        console.error("Error while loading spots:", err);
        setError("Error while loading spots");
      } finally {
        setLoading(false);
      }
    }

    fetchAllSpots();
  }, []);

  const handleMarkerPress = (spotId: number) => {
    router.push({
      pathname: '/screens/DetailsScreen',
      params: { id: spotId }
    });
  };

  // Fonction pour extraire les coordonnées d'un spot
  const getSpotCoordinates = (spot: Spot) => {
    if (!spot) return null;
    
    // Vérifier d'abord les coordonnées traitées
    if (spot.processedLatitude && spot.processedLongitude) {
      return {
        latitude: spot.processedLatitude,
        longitude: spot.processedLongitude
      };
    }
    
    // Ensuite vérifier les coordonnées originales
    let latitude = null;
    let longitude = null;
    
    if (spot.latitude && spot.longitude) {
      latitude = typeof spot.latitude === 'string' ? parseFloat(spot.latitude) : spot.latitude;
      longitude = typeof spot.longitude === 'string' ? parseFloat(spot.longitude) : spot.longitude;
    }
    
    if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
      return { latitude, longitude };
    }
    
    return null;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={style.color.primary} />
        <Text style={styles.loadingText}>Chargement des spots...</Text>
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
        {/* Marqueur de test */}
        <Marker
          coordinate={{
            latitude: 43.4832,  // Coordonnées de Biarritz
            longitude: -1.5586
          }}
          title="Test Marker"
          description="This is a test marker"
        />
        
        {spotsWithCoordinates.map((spot) => {
          const coordinates = getSpotCoordinates(spot);
          if (!coordinates) return null;
          
          console.log("Affichage du spot sur la carte:", spot.id, spot.spot_name, coordinates.latitude, coordinates.longitude);
          
          return (
            <Marker
              key={spot.id}
              coordinate={coordinates}
              title={spot.spot_name || "Surf spot"}
              description={`${spot.city}, ${spot.country}`}
              onCalloutPress={() => handleMarkerPress(spot.id)}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  {spot.spot_picture && (
                    <Image
                      source={{ 
                        uri: spot.spot_picture.startsWith('data:image') 
                          ? spot.spot_picture 
                          : `data:image/jpeg;base64,${spot.spot_picture}` 
                      }}
                      style={styles.calloutImage}
                    />
                  )}
                  <Text style={styles.calloutTitle}>{spot.spot_name || "Surf spot"}</Text>
                  <Text style={styles.calloutSubtitle}>{`${spot.city}, ${spot.country}`}</Text>
                  <Text style={styles.calloutDescription}>
                    {spot.difficulty ? `Difficulty: ${spot.difficulty}` : ""}
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
    backgroundColor: style.color.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: style.color.background,
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: style.color.text,
  },
});