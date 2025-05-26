import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

const ProfileImage = () => {
  const { user } = useAuth();

  // Utiliser directement les données du contexte d'authentification
  const imageUri = user?.user_picture 
    ? `data:image/jpeg;base64,${user.user_picture}` 
    : null;
  
  const alias = user?.alias || "User";

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {alias.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#006A71",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileImage;
