import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import FormAddContentSpot from "../components/addSpotScreen/FormAddContentSpot";
import FormAddImageSpot from "../components/addSpotScreen/FormAddImageSpot";
import ButtonDelete from "../components/commons/buttons/ButtonDelete";
import ButtonLoadImage from "../components/commons/buttons/ButtonLoadImage";
import ButtonAddSpot from "../components/addSpotScreen/ButtonAddSpot";
import * as ImagePicker from "expo-image-picker";

type Props = {};

function AddSpotScreen({}: Props) {
  const { user } = useAuth();
  const [spotName, setSpotName] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [destination, setDestination] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Liste des niveaux de difficulté
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in"); // redirection propre
    }
  }, [user]);

  if (!user) {
    return null; // évite de rendre quoi que ce soit pendant la redirection
  }

  // Fonction pour gérer le chargement d'image
  const handleLoadImage = () => {
    // Ici vous pourrez implémenter la logique pour charger une image
    // Par exemple en utilisant expo-image-picker
    Alert.alert(
      "Load Image",
      "Image picker functionality will be implemented here"
    );
  };

  // Fonction pour gérer l'ajout d'un spot
  const handleAddSpot = () => {
    // Validation des données
    if (!spotName.trim()) {
      Alert.alert("Error", "Please enter a spot name");
      return;
    }

    if (!destination.trim()) {
      Alert.alert("Error", "Please enter a destination");
      return;
    }

    // Simuler l'ajout d'un spot
    Alert.alert("Success", `Spot "${spotName}" added successfully!`, [
      {
        text: "OK",
        onPress: () => router.back(), // Retourner à l'écran précédent après l'ajout
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Surf Spot</Text>

        {/* Section pour charger l'image */}
        <View style={styles.imageSection}>
          {imageUri ? (
            <FormAddImageSpot imageUri={imageUri} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image Selected</Text>
            </View>
          )}
          <ButtonLoadImage
            label="Load Image"
            theme="primary"
            onPress={handleLoadImage}
          />
        </View>

        {/* Mode d'édition pour le formulaire */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Enter Spot Details:</Text>

          <Text style={styles.label}>Spot Name:</Text>
          <TextInput
            style={styles.input}
            value={spotName}
            onChangeText={setSpotName}
            placeholder="Enter spot name"
          />

          <Text style={styles.label}>Difficulty Level:</Text>
          <View style={styles.pickerContainer}>
            {difficultyLevels.map((level) => (
              <Text
                key={level}
                style={[
                  styles.difficultyOption,
                  difficulty === level && styles.selectedDifficulty,
                ]}
                onPress={() => setDifficulty(level)}
              >
                {level}
              </Text>
            ))}
          </View>

          <Text style={styles.label}>Destination:</Text>
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="Enter destination"
          />
        </View>

        {/* Prévisualisation avec FormAddContentSpot */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Preview:</Text>
          <FormAddContentSpot
            spotName={spotName}
            difficultyLevel={difficulty}
            destination={destination}
          />
        </View>

        {/* Boutons d'action */}
        <View style={styles.actionButtons}>
          <ButtonDelete onPress={() => router.back()} />
          <ButtonAddSpot onPress={handleAddSpot} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#006A71",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#006A71",
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F2EFE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#888",
  },
  formSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 20,
  },
  previewSection: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FAFAFA",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#F2EFE7",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 15,
    color: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  difficultyOption: {
    padding: 10,
    backgroundColor: "#F2EFE7",
    borderRadius: 8,
    fontSize: 14,
    color: "#444",
  },
  selectedDifficulty: {
    backgroundColor: "#006A71",
    color: "#F2EFE7",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default AddSpotScreen;
