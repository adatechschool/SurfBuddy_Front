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
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import FormAddContentSpot from "../components/addSpotScreen/FormAddContentSpot";
import FormAddImageSpot from "../components/addSpotScreen/FormAddImageSpot";
import ButtonDelete from "../components/commons/buttons/ButtonDelete";
import ButtonLoadImage from "../components/commons/buttons/ButtonLoadImage";
import ButtonAddSpot from "../components/addSpotScreen/ButtonAddSpot";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import globalStyle from "@/styles/global";

// Définition des types avec une syntaxe plus claire
type Country =
  | "France"
  | "Spain"
  | "Portugal"
  | "Italy"
  | "Morocco"
  | "United States"
  | "Australia"
  | "Indonesia"
  | "South Africa"
  | "Brazil";

const destinations: Record<string, string[]> = {
  France: ["Biarritz", "Hossegor", "La Torche"],
  Spain: ["Mundaka", "Zarautz", "San Sebastián"],
  Portugal: ["Ericeira", "Peniche", "Nazaré"],
  Italy: ["Sardinia", "Rome", "Sicily"],
  Morocco: ["Taghazout", "Essaouira", "Agadir"],
  "United States": ["Santa Cruz", "Malibu", "Honolulu"],
  Australia: ["Bondi Beach", "Byron Bay", "Snapper Rocks"],
  Indonesia: ["Bali", "G-Land", "Lombok"],
  "South Africa": ["Jeffreys Bay", "Durban", "Cape Town"],
  Brazil: ["Florianópolis", "Fernando de Noronha", "Rio de Janeiro"],
};

function AddSpotScreen() {
  const { user } = useAuth();
  const [spotName, setSpotName] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [destination, setDestination] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const [selectedCountry, setSelectedCountry] = useState<string>("France");
  const [selectedCity, setSelectedCity] = useState<string>(
    destinations["France"][0]
  );

  // Mise à jour de la ville sélectionnée quand le pays change
  useEffect(() => {
    // Vérification que le pays sélectionné existe dans destinations
    if (destinations[selectedCountry]) {
      setSelectedCity(destinations[selectedCountry][0]);
    }
  }, [selectedCountry]);

  // Mise à jour de la destination complète
  useEffect(() => {
    setDestination(`${selectedCity}, ${selectedCountry}`);
  }, [selectedCity, selectedCountry]);

  // Implementation of image loading with ImagePicker
  const handleLoadImage = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "You need to allow access to your gallery to add an image."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error loading image:", error);
      Alert.alert("Error", "Unable to load image.");
    }
  };

  const handleAddSpot = () => {
    if (!spotName.trim()) {
      Alert.alert("Error", "Please enter a spot name");
      return;
    }

    if (!destination.trim()) {
      Alert.alert("Error", "Please enter a destination");
      return;
    }

    // Here you could add code to save the spot to your database
    // For example, an API call or local storage

    Alert.alert("Success", `Spot "${spotName}" added successfully!`, [
      {
        text: "OK",
        onPress: () => router.back(),
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

          <Text style={styles.label}>Country:</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
              style={{ color: "#444" }}
            >
              {Object.keys(destinations).map((country) => (
                <Picker.Item label={country} value={country} key={country} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>City:</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
              style={{ color: "#444" }}
            >
              {destinations[selectedCountry]?.map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              )) || <Picker.Item label="Select a country first" value="" />}
            </Picker>
          </View>
        </View>

        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Preview:</Text>
          <FormAddContentSpot
            spotName={spotName}
            difficultyLevel={difficulty}
            destination={destination}
          />
        </View>

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
