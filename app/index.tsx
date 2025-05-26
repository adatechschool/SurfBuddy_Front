import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import SpotCard from "./components/homeScreen/SpotCard";
import SearchBar from "./components/homeScreen/SearchBar";
import style from "@/styles/global";
import { useRouter, usePathname, Link } from "expo-router";
import { Spot } from "./types/Spot";

// Adresse IP de l'API local (PC de Molid)
const API_URL = "http://localhost:8000";   // Remplacez X par votre adresse IP locale

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    // Charger les données de l'API locale au montage du composant
    fetch(`${API_URL}/spots`)
      .then((response) => response.json())
      .then((data: any[]) => {
        // Transformer les données pour gérer les images base64
        const processedData = data.map((spot: any) => ({
          ...spot,
          // Créer une URL utilisable pour l'image si elle existe
          spotPictureUrl: spot.spot_picture
            ? `data:image/jpeg;base64,${spot.spot_picture}`
            : null,
        }));

        setSpots(processedData);
        setFilteredSpots(processedData);
        setLoading(false);
        console.log("Number of spots charged:", processedData.length);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du JSON:", error);
        setLoading(false);
      });
  }, []);

  // Filtrer les spots quand la recherche change
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredSpots(spots);
    } else {
      const searchLower = search.toLowerCase();
      const filtered = spots.filter(
        (spot) =>
          spot.spot_name?.toLowerCase().includes(searchLower) ||
          spot.city?.toLowerCase().includes(searchLower) ||
          spot.country?.toLowerCase().includes(searchLower)
      );
      setFilteredSpots(filtered);
    }
  }, [search, spots]);

  // Détermine le nombre de colonnes basé sur la largeur de l'écran
  const getColumnCount = () => {
    /*
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    */
    return 1;
  };

  const columnCount = getColumnCount();

  // Organise les spots en colonnes
  const organizeSpotsByColumns = () => {
    if (columnCount === 1) {
      // Retourne un layout vertical pour les mobiles
      return (
        <View style={styles.singleColumnContainer}>
          {filteredSpots.map((spot) => (
            <View key={spot.id} style={styles.gridItem}>
              <SpotCard spot={spot} />
            </View>
          ))}
        </View>
      );
    } else {
      // Retourne un layout multi-colonnes pour les tablettes/desktop
      /*
      const columns = Array.from({ length: columnCount }, () => []);

      filteredSpots.forEach((spot, index) => {
        const columnIndex = index % columnCount;
        columns[columnIndex].push(spot);
      });

      return (
        <View style={styles.multiColumnContainer}>
          {columns.map((columnSpots, colIndex) => (
            <View key={`column-${colIndex}`} style={styles.column}>
              {columnSpots.map((spot) => (
                <View key={spot.id} style={styles.gridItem}>
                  <SpotCard spot={spot} />
                </View>
              ))}
            </View>
          ))}
        </View>
      );
      */
      return null; // Cette ligne est juste pour éviter une erreur de syntaxe
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: style.color.background }}>
      <SearchBar value={search} onChangeText={setSearch} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={style.color.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            {filteredSpots.length > 0 ? (
              organizeSpotsByColumns()
            ) : (
              <Text style={styles.noResults}>
                {search.trim() ? "No spot found" : "No spot available"}
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 8,
    paddingBottom: 80,
    alignItems: "center",
    margin: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 1200, // Limite la largeur sur très grands écrans
    alignItems: "center",
  },
  singleColumnContainer: {
    width: "100%",
    alignItems: "center",
  },
  /*
  multiColumnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  */
  gridItem: {
    width: "100%",
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
