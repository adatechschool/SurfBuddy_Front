import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import globalStyle from "../../../styles/global";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileContent = () => {
  const { user } = useAuth();

  // Utiliser directement les données du contexte d'authentification
  const alias = user?.alias || "Utilisateur";
  const email = user?.email || "email@example.com";

  return (
    <View style={styles.container}>
      {/* Carte Nom d'utilisateur */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="user" size={20} color={globalStyle.color.secondary} />
          <Text style={styles.cardTitle}>Username</Text>
          <Text style={styles.cardValue}>{alias}</Text>
        </View>
      </View>

      {/* Carte Email */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="envelope" size={20} color={globalStyle.color.secondary} />
          <Text style={styles.cardTitle}>Email</Text>
        </View>
        <Text style={styles.cardValue}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  card: {
    backgroundColor: globalStyle.color.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: globalStyle.color.secondary,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: globalStyle.color.secondary,
    marginLeft: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 16,
    color: globalStyle.color.text,
    fontFamily: globalStyle.fonts.regular,
    fontWeight: "500",
    marginLeft: 30, // Aligné avec le titre
  },
});

export default ProfileContent;
