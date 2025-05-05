import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView  } from "react-native";
import SpotCard from "./components/homeScreen/SpotCard";
import SearchBar from "./components/homeScreen/SearchBar";
import style from "@/styles/global";
import { getSpots } from './library/api/getSpot';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [spots, setSpots] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const results = await getSpots(search);
      setSpots(results);
    };

    // Lancer la recherche après que l’utilisateur ait tapé
    const timeout = setTimeout(() => {
      fetchData();
    }, 500); // debounce : 0.5s après le dernier caractère tapé

    return () => clearTimeout(timeout);
  }, [search]);
    
  return (
    <View style={{ backgroundColor: style.color.background }}>
            <SearchBar value={search} onChangeText={setSearch}/>
            <ScrollView contentContainerStyle={styles.content}/>
            <SpotCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.color.background,
  },
  content: {
    paddingBottom: 16,
  },
});