import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import style from "../../../styles/global";
import { useAuth } from "../../context/AuthContext";
import FormImageProfile from "./FormImageProfile";
import { useRouter } from "expo-router";

// Utiliser la variable d'environnement
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type FocusableField = "email" | "alias" | "password" | null;

const FormContentProfile = () => {
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusableField>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  // Fonction pour sélectionner une image
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      aspect: [1, 1], // Format carré pour la photo de profil
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert("Aucune image sélectionnée", "Vous n'avez pas sélectionné d'image.");
    }
  };

  // Fonction pour convertir l'image en base64 (même que pour les spots)
  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Enlever le préfixe "data:image/...;base64,"
          const base64Data = base64String.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Erreur lors de la conversion en base64:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    if (!email || !alias || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      console.log("Tentative de création d'utilisateur à:", `${API_URL}/adduser`);
      
      // Préparer les données JSON (sans image pour l'instant)
      const userData = {
        email,
        alias,
        password,
        // user_picture: null // Pas d'image pour simplifier
      };

      console.log("Données envoyées:", JSON.stringify(userData));

      const response = await fetch(`${API_URL}/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Statut de la réponse:", response.status);

      // Lire le contenu de la réponse
      const responseText = await response.text();
      console.log("Contenu brut de la réponse:", responseText);

      if (!response.ok) {
        let errorMessage = "Erreur lors de la création du compte";
        
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          console.log("Impossible de parser la réponse d'erreur:", parseError);
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Parser la réponse JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Erreur lors du parsing de la réponse:", parseError);
        throw new Error("Réponse invalide du serveur");
      }

      console.log("Données de réponse parsées:", responseData);

      // Vérifier la structure de la réponse
      if (responseData.user) {
        const userData = responseData.user;
        
        // Connecter automatiquement l'utilisateur
        login(userData);
        
        Alert.alert(
          "Succès", 
          responseData.message || "Compte créé avec succès !",
          [
            {
              text: "OK",
              onPress: () => {
                router.replace("/");
              }
            }
          ]
        );
      } else {
        throw new Error("Structure de réponse inattendue");
      }

    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Erreur inconnue lors de la création du compte";
      
      Alert.alert("Erreur", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image de profil */}
      <View style={styles.imageSection}>
        <FormImageProfile 
          imgSource={require("../../../assets/images/logo-icon.png")}
          selectedImage={selectedImage}
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImageAsync}>
          <Icon name="camera" size={16} color="white" />
          <Text style={styles.imageButtonText}>Choose a photo</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <TextInput
        style={[styles.input, focusedField === "email" && styles.focusedInput]}
        placeholder="Your email"
        placeholderTextColor={style.color.text}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
      />

      {/* Alias - Nouveau champ */}
      <TextInput
        style={[styles.input, focusedField === "alias" && styles.focusedInput]}
        placeholder="Your alias/username"
        placeholderTextColor={style.color.text}
        value={alias}
        onChangeText={setAlias}
        onFocus={() => setFocusedField("alias")}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
      />

      {/* Password */}
      <View
        style={[
          styles.passwordContainer,
          focusedField === "password" && styles.focusedInput,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Your password"
          placeholderTextColor={style.color.text}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color={style.color.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          (!email || !alias || !password) && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!email || !alias || !password}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: style.color.primary,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: style.color.secondary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  imageButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderBottomColor: style.color.secondary,
    borderColor: "transparent",
    fontFamily: style.fonts.regular,
    color: style.color.text,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: style.color.secondary,
    paddingRight: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontFamily: style.fonts.regular,
    color: style.color.text,
  },
  focusedInput: {
    borderColor: style.color.secondary,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: style.color.secondary,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontFamily: style.fonts.regular,
    fontSize: 16,
  },
});

export default FormContentProfile;