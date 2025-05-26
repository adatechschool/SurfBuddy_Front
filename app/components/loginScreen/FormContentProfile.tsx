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
import style from "../../../styles/global";
import { useAuth } from "../../context/AuthContext";

// Utiliser la variable d'environnement
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type FocusableField = "email" | "alias" | "password" | null;

const FormContentProfile = () => {
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusableField>(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !alias || !password) {
      Alert.alert("Error", "Please fill all fields (email, alias, and password).");
      return;
    }

    try {
      console.log("Tentative de connexion à:", `${API_URL}/adduser`);
      
      const response = await fetch(`${API_URL}/adduser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          alias, 
          password 
        }),
      });

      console.log("Statut de la réponse:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 401) {
          throw new Error("Incorrect email or password.");
        } else if (response.status === 400) {
          throw new Error(errorData?.error || "Invalid data.");
        } else {
          throw new Error(errorData?.error || "Connection error.");
        }
      }

      const responseData = await response.json();
      
      // Successful login
      login(responseData.user);
      Alert.alert("Success", `Welcome ${responseData.user.alias}!`);

    } catch (error) {
      console.error("Erreur de connexion détaillée:", error);
      Alert.alert(
        "Login error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
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