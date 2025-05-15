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
  TouchableOpacity,
  Modal,
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
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import globalStyle from "@/styles/global";

// Types
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Liste prédéfinie de pays et villes
const destinations: Record<string, string[]> = {
  France: ["Biarritz", "Hossegor", "La Torche", "Other..."],
  Spain: ["Mundaka", "Zarautz", "San Sebastián", "Other..."],
  Portugal: ["Ericeira", "Peniche", "Nazaré", "Other..."],
  Italy: ["Sardinia", "Rome", "Sicily", "Other..."],
  Morocco: ["Taghazout", "Essaouira", "Agadir", "Other..."],
  "United States": ["Santa Cruz", "Malibu", "Honolulu", "Other..."],
  Australia: ["Bondi Beach", "Byron Bay", "Snapper Rocks", "Other..."],
  Indonesia: ["Bali", "G-Land", "Lombok", "Other..."],
  "South Africa": ["Jeffreys Bay", "Durban", "Cape Town", "Other..."],
  Brazil: ["Florianópolis", "Fernando de Noronha", "Rio de Janeiro", "Other..."],
  "Other...": ["Add another city..."],
};

function AddSpotScreen() {
  const { user } = useAuth();
  const [spotName, setSpotName] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [destination, setDestination] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // États pour la gestion des pays et villes personnalisés
  const [selectedCountry, setSelectedCountry] = useState<string>("France");
  const [selectedCity, setSelectedCity] = useState<string>(destinations["France"][0]);
  const [customCountry, setCustomCountry] = useState<string>("");
  const [customCity, setCustomCity] = useState<string>("");
  const [showCustomLocationModal, setShowCustomLocationModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"country" | "city">("country");
  
  // Coordonnées géographiques
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 43.4832, // Coordonnées par défaut (Biarritz)
    longitude: -1.5586,
  });
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user]);

  // Mise à jour de la ville sélectionnée quand le pays change
  useEffect(() => {
    if (destinations[selectedCountry]) {
      setSelectedCity(destinations[selectedCountry][0]);
    }
  }, [selectedCountry]);

  // Mise à jour de la destination complète
  useEffect(() => {
    if (selectedCountry === "Other..." && customCountry) {
      if (customCity) {
        setDestination(`${customCity}, ${customCountry}`);
      } else {
        setDestination(customCountry);
      }
    } else if (selectedCity === "Other..." || selectedCity === "Other City...") {
      if (customCity) {
        setDestination(`${customCity}, ${selectedCountry}`);
      } else {
        setDestination(selectedCountry);
      }
    } else {
      setDestination(`${selectedCity}, ${selectedCountry}`);
    }
  }, [selectedCity, selectedCountry, customCity, customCountry]);

  // Chargement de l'image
  const handleLoadImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "You need to autorize access to your gallery to add an image."
        );
        return;
      }

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
      console.error("Erreur lors du chargement de l'image:", error);
      Alert.alert("Erreur", "Impossible de charger l'image.");
    }
  };

  // Gestion des sélections de pays/ville
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    if (value === "Other...") {
      setModalMode("country");
      setShowCustomLocationModal(true);
    }
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    if (value === "Other..." || value === "Add a country...") {
      setModalMode("city");
      setShowCustomLocationModal(true);
    }
  };

  // Validation et enregistrement du spot
  const handleAddSpot = () => {
    if (!spotName.trim()) {
      Alert.alert("Error", "Please enter a spot name");
      return;
    }

    if (!destination.trim()) {
      Alert.alert("Erreur", "Please enter a destination");
      return;
    }

    // Ici vous pouvez ajouter le code pour enregistrer le spot dans votre base de données
    // Par exemple, un appel API à votre backend Symfony
    const spotData = {
      name: spotName,
      difficulty,
      destination,
      coordinates,
      imageUri,
      // Ajoutez d'autres champs nécessaires
    };
    
    console.log("Données du spot à envoyer:", spotData);

    // Simulation de succès (à remplacer par votre appel API réel)
    Alert.alert("Success", `Spot "${spotName}" add with success!`, [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  // Demander la localisation actuelle de l'utilisateur
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire pour cette fonctionnalité");
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      // Ouvrir la carte avec la position actuelle
      setShowMapModal(true);
    } catch (error) {
      console.error("Erreur lors de l'obtention de la position:", error);
      Alert.alert("Erreur", "Impossible d'obtenir votre position actuelle");
    }
  };

  // Mise à jour des coordonnées lors du déplacement du marqueur sur la carte
  const handleMapPress = (event: any) => {
    setCoordinates(event.nativeEvent.coordinate);
  };

  if (!user) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add a Surf spot</Text>

        {/* Section Image */}
        <View style={styles.imageSection}>
          {imageUri ? (
            <FormAddImageSpot imageUri={imageUri} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
          <ButtonLoadImage
            label="Choose an image"
            theme="primary"
            onPress={handleLoadImage}
          />
        </View>

        {/* Formulaire principal */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Spot info:</Text>

          <Text style={styles.label}>Spot name:</Text>
          <TextInput
            style={styles.input}
            value={spotName}
            onChangeText={setSpotName}
            placeholder=" Enter the spot name"
          />

          <Text style={styles.label}>Difficulty:</Text>
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
              onValueChange={handleCountryChange}
              style={{ color: "#006A71" }}
            >
              {Object.keys([...Object.keys(destinations), "Other..."].reduce((obj, key) => ({ ...obj, [key]: [] }), {})).map((country) => (
                <Picker.Item label={country} value={country} key={country} />
              ))}
            </Picker>
          </View>

          {selectedCountry === "Other..." && customCountry ? (
            <Text style={styles.customLocationText}>Country: {customCountry}</Text>
          ) : null}

          <Text style={styles.label}>City:</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={handleCityChange}
              style={{ color: "#006A71" }}
            >
              {(selectedCountry !== "Other..." 
                ? destinations[selectedCountry] 
                : ["Add a city..."]).map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          </View>

          {(selectedCity === "Other..." || selectedCity === "Add a city...") && customCity ? (
            <Text style={styles.customLocationText}>City added: {customCity}</Text>
          ) : null}

          {/* Section Coordonnées */}
          <Text style={styles.label}>Coordinates:</Text>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinates}>
              Lat: {coordinates.latitude.toFixed(6)}, Long: {coordinates.longitude.toFixed(6)}
            </Text>
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => setShowMapModal(true)}
            >
              <Text style={styles.mapButtonText}>Select on the map</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.mapButton, { backgroundColor: '#4B80AF' }]}
              onPress={getCurrentLocation}
            >
              <Text style={styles.mapButtonText}>Use my position</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Aperçu */}
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

      {/* Modal pour pays/ville personnalisé */}
      <Modal
        visible={showCustomLocationModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalMode === "country" ? "Add a country": "Add a City"}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder={modalMode === "country" ? "Country": "City"}
              value={modalMode === "country" ? customCountry : customCity}
              onChangeText={modalMode === "country" ? setCustomCountry : setCustomCity}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => {
                  setShowCustomLocationModal(false);
                  if (modalMode === "country") {
                    setSelectedCountry("France"); // Retour à la valeur par défaut
                  } else {
                    setSelectedCity(destinations[selectedCountry][0]); // Retour à la valeur par défaut
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#006A71" }]}
                onPress={() => {
                  setShowCustomLocationModal(false);
                  if (modalMode === "country" && customCountry.trim()) {
                    // Ajouter le pays personnalisé s'il n'existe pas déjà
                    if (!destinations[customCountry]) {
                      destinations[customCountry] = ["Add a city..."];
                    }
                    setSelectedCountry(customCountry);
                  } else if (modalMode === "city" && customCity.trim()) {
                    setSelectedCity("Other..."); // Pour que l'interface affiche que c'est une ville personnalisée
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pour la carte */}
      <Modal
        visible={showMapModal}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.mapModalContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={coordinates}
              draggable
              onDragEnd={(e) => setCoordinates(e.nativeEvent.coordinate)}
            />
          </MapView>
          
          <View style={styles.mapModalButtons}>
            <TouchableOpacity
              style={[styles.mapModalButton, { backgroundColor: "#ccc" }]}
              onPress={() => setShowMapModal(false)}
            >
              <Text style={styles.mapModalButtonText}>Annuler</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.mapModalButton, { backgroundColor: "#006A71" }]}
              onPress={() => setShowMapModal(false)}
            >
              <Text style={styles.mapModalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 40,
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
  customLocationText: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 10,
    color: "#006A71",
  },
  coordinatesContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  coordinates: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "monospace",
  },
  mapButton: {
    backgroundColor: "#006A71",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
    width: "80%",
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#006A71",
  },
  modalInput: {
    backgroundColor: "#F2EFE7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mapModalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  mapModalButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  mapModalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddSpotScreen;