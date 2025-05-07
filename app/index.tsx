import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import SpotCard from "./components/homeScreen/SpotCard";
import SearchBar from "./components/homeScreen/SearchBar";
import style from "@/styles/global";
import airtableService from "@/airtableService";
import type { AirtableRecord } from "@/airtableService";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [spots, setSpots] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  // Détermine le nombre de colonnes basé sur la largeur de l'écran
  const getColumnCount = () => {
    if (width >= 1024) return 3; // Grand écran: 3 colonnes
    if (width >= 768) return 2;  // Écran moyen: 2 colonnes
    return 1; // Petit écran: 1 colonne
  };

  const columnCount = getColumnCount();
  
  // Organise les spots en colonnes
  const organizeSpotsByColumns = () => {
    if (columnCount === 1) {
      // Retourne un layout vertical pour les mobiles
      return (
        <View style={styles.singleColumnContainer}>
          {spots.map((spot) => (
            <View key={spot.id} style={styles.gridItem}>
              <SpotCard spot={spot} />
            </View>
          ))}
        </View>
      );
    } else {
      // Retourne un layout multi-colonnes pour les tablettes/desktop
      const columns = Array.from({ length: columnCount }, () => []);
      
      spots.forEach((spot, index) => {
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await airtableService.getSpots(search);
        setSpots(results);
      } catch (error) {
        console.error("Erreur lors du chargement des spots:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

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
            {spots.length > 0 ? (
              organizeSpotsByColumns()
            ) : (
              <Text style={styles.noResults}>
                {search.trim()
                  ? "Aucun spot trouvé pour cette recherche"
                  : "Aucun spot disponible"}
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
    paddingVertical: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 1200, // Limite la largeur sur très grands écrans
    alignItems: 'center',
  },
  singleColumnContainer: {
    width: '100%',
    alignItems: 'center',
  },
  multiColumnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  gridItem: {
    width: '100%',
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