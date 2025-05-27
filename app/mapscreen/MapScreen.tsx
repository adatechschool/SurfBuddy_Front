import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Spot } from "../types/Spot";
import style from "@/styles/global";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

// URL de l'API backend
const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("URL de l'API utilisée:", API_URL);

export default function MapScreen() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotsWithCoordinates, setSpotsWithCoordinates] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: 46.227638,
    longitude: 2.213749,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  // Coordonnées initiales centrées sur l'Europe
  const initialRegion = {
    latitude: 46.227638,
    longitude: 2.213749,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  // Fonction pour zoomer
  const zoomIn = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * 0.5,
      longitudeDelta: currentRegion.longitudeDelta * 0.5,
    };
    setCurrentRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // Fonction pour dézoomer
  const zoomOut = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: Math.min(currentRegion.latitudeDelta * 2, 180),
      longitudeDelta: Math.min(currentRegion.longitudeDelta * 2, 180),
    };
    setCurrentRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // Fonction pour centrer sur la position actuelle
  const centerOnUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission de localisation refusée");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setCurrentRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };

  // Fonction appelée quand la région change
  const onRegionChangeComplete = (region: Region) => {
    setCurrentRegion(region);
  };

  useEffect(() => {
    async function fetchAllSpots() {
      try {
        setLoading(true);
        console.log(
          "Tentative de récupération des spots depuis:",
          `${API_URL}/spots`
        );

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
        if (status !== "granted") {
          console.log("Permission de localisation refusée");
          setLoading(false);
          return;
        }

        // Traiter les spots pour ajouter des coordonnées si nécessaire
        const processedSpots = await Promise.all(
          data.map(async (spot: Spot) => {
            // Vérifier si le spot a déjà des coordonnées valides
            const existingCoordinates = getSpotCoordinates(spot);
            if (existingCoordinates) {
              console.log(
                `Spot ${spot.id} (${spot.spot_name}) a déjà des coordonnées:`,
                existingCoordinates
              );
              return {
                ...spot,
                processedLatitude: existingCoordinates.latitude,
                processedLongitude: existingCoordinates.longitude,
              };
            }

            // Si pas de coordonnées, essayer de géocoder à partir de la ville et du pays
            if (spot.city && spot.country) {
              try {
                const address = `${spot.city}, ${spot.country}`;
                console.log(
                  `Géocodage de l'adresse pour ${spot.id} (${spot.spot_name}):`,
                  address
                );

                const geocode = await Location.geocodeAsync(address);

                if (geocode.length > 0) {
                  const { latitude, longitude } = geocode[0];
                  console.log(
                    `Coordonnées trouvées pour ${spot.id} (${spot.spot_name}):`,
                    { latitude, longitude }
                  );

                  return {
                    ...spot,
                    processedLatitude: latitude,
                    processedLongitude: longitude,
                  };
                } else {
                  console.log(
                    `No coordinate found for ${spot.id} (${spot.spot_name})`
                  );
                  return spot;
                }
              } catch (err) {
                console.error(
                  `Error while geocoding ${spot.id} (${spot.spot_name}):`,
                  err
                );
                return spot;
              }
            }

            return spot;
          })
        );

        // Filtrer les spots qui ont des coordonnées valides
        const validSpots = processedSpots.filter(
          (spot) => spot.processedLatitude && spot.processedLongitude
        );

        console.log("Spots with validated coodinates:", validSpots.length);
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
      pathname: "/screens/DetailsScreen",
      params: { id: spotId },
    });
  };

  // Fonction pour extraire les coordonnées d'un spot
  const getSpotCoordinates = (spot: Spot) => {
    if (!spot) return null;

    // Vérifier d'abord les coordonnées traitées
    if (spot.latitude && spot.longitude) {
      return {
        latitude: spot.latitude,
        longitude: spot.longitude,
      };
    }

    // Ensuite vérifier les coordonnées originales
    let latitude = null;
    let longitude = null;

    if (spot.latitude && spot.longitude) {
      latitude =
        typeof spot.latitude === "string"
          ? parseFloat(spot.latitude)
          : spot.latitude;
      longitude =
        typeof spot.longitude === "string"
          ? parseFloat(spot.longitude)
          : spot.longitude;
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
        <Text style={styles.loadingText}>Charging the spots...</Text>
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
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={false} // On désactive le bouton par défaut
      >
        {/* Marqueur de test */}
        <Marker
          coordinate={{
            latitude: 43.4832,
            longitude: -1.5586,
          }}
          title="Test Marker"
          description="This is a test marker"
        />

        {spotsWithCoordinates.map((spot) => {
          const coordinates = getSpotCoordinates(spot);
          if (!coordinates) return null;

          console.log(
            `Showing the spot on the map: ${spot.id} ${spot.spot_name} ${coordinates.latitude} ${coordinates.longitude}`
          );

          return (
            <Marker
              key={spot.id}
              coordinate={coordinates}
              title={spot.spot_name || "Surf spot"}
              description={`${spot.city}, ${spot.country}`}
              onCalloutPress={() => handleMarkerPress(spot.id)}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  {spot.spot_picture && (
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${spot.spot_picture}` }}
                      style={styles.calloutImage}
                    />
                  )}
                  <Text style={styles.calloutTitle}>
                    {spot.spot_name || "Surf spot"}
                  </Text>
                  <Text style={styles.calloutDescription}>
                    {spot.city}, {spot.country}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* Contrôles de zoom */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Icon name="plus" size={20} color={style.color.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Icon name="minus" size={20} color={style.color.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.locationButton} onPress={centerOnUserLocation}>
          <Icon name="location-arrow" size={20} color={style.color.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: style.color.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: style.color.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: style.color.background,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff6b6b",
    textAlign: "center",
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: style.color.text,
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: style.color.text,
    opacity: 0.7,
  },
  // Nouveaux styles pour les contrôles de zoom
  zoomControls: {
    position: "absolute",
    right: 20,
    top: 100,
    flexDirection: "column",
    alignItems: "center",
  },
  zoomButton: {
    backgroundColor: style.color.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  locationButton: {
    backgroundColor: style.color.secondary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
