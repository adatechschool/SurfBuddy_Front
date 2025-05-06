import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import SpotCard from "./components/homeScreen/SpotCard";
import SearchBar from "./components/homeScreen/SearchBar";
import style from "@/styles/global";
import airtableService from "@/airtableService";
import type { AirtableRecord } from "@/airtableService";

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [spots, setSpots] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fieldsDebug, setFieldsDebug] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simple appel à getSpots qui gère déjà le cas d'une recherche vide
        const results = await airtableService.getSpots(search);
        console.log(`Recherche pour "${search}" - Résultats: ${results.length}`);
        
        // Enregistrons les champs disponibles pour le débogage
        if (results.length > 0) {
          setFieldsDebug(Object.keys(results[0].fields));
        }
        
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
      <SearchBar 
        value={search} 
        onChangeText={setSearch} 
      />
      
      {/* Afficher les champs disponibles pour aider au débogage
      {fieldsDebug.length > 0 && __DEV__ && (
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Champs disponibles dans votre base Airtable:</Text>
          <Text style={styles.debugText}>{fieldsDebug.join(", ")}</Text>
        </View>
      )} */}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={style.color.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {spots.length > 0 ? (
            spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))
          ) : (
            <Text style={styles.noResults}>
              {search.trim() ? "Aucun spot trouvé pour cette recherche" : "Aucun spot disponible"}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  debugContainer: {
    padding: 10,
    backgroundColor: '#ffeeee',
    margin: 10,
    borderRadius: 5,
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugText: {
    fontSize: 12,
  }
});