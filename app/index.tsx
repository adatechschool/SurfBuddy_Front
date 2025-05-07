import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
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
        <ScrollView contentContainerStyle={styles.content}>
          {spots.length > 0 ? (
            spots.map((spot) => <SpotCard key={spot.id} spot={spot} />)
          ) : (
            <Text style={styles.noResults}>
              {search.trim()
                ? "Aucun spot trouvé pour cette recherche"
                : "Aucun spot disponible"}
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 80,
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