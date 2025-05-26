import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import profile from "../../../profile.json"; // Assure-toi du bon chemin d'importation
import { useAuth } from "../../context/AuthContext";

const API_URL = "process.env.EXPO_PUBLIC_API_URL";

const ProfileContent = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_URL}/users/${user.id}`)
        .then((response) => response.json())
        .then((data) => setProfile(data))
        .catch((error) =>
          console.error("Error while charging profile:", error)
        );
    }
  }, [user]);

  if (!profile) return <Text>Charging...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Alias:</Text>
      <View style={styles.block}>
        <Text style={styles.value}>{profile.alias}</Text>
      </View>

      <Text style={styles.label}>Email:</Text>
      <View style={styles.block}>
        <Text style={styles.value}>{profile.email}</Text>
      </View>

      <Text style={styles.label}>Password:</Text>
      <View style={styles.block}>
        <Text style={styles.value}>********</Text>
        {/* Remplace le texte par des étoiles */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Ajoute de l'espace sous les titres
    color: "#333",
  },
  block: {
    backgroundColor: "#F2EFE7", // Couleur légèrement plus claire pour un effet visible
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000", // Ombre légère
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Effet d'ombre sur Android
  },
  value: {
    fontSize: 15,
    color: "#444",
  },
});

export default ProfileContent;
