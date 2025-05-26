import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "./context/AuthContext";
import globalStyle from "../styles/global";
import FormContentLogin from "./components/commons/FormContentLogin";

export default function SignIn() {
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Appel à votre API de backend pour l'authentification
      const response = await fetch('process.env.EXPO_PUBLIC_API_URL/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Login failed" }));
        throw new Error(errorData.message || "Invalid credentials");
      }

      const userData = await response.json();

      // Vérifier que les données utilisateur sont valides
      if (!userData || !userData.id || !userData.email) {
        throw new Error("Invalid user data received");
      }

      // Mettre à jour le contexte avec les données utilisateur
      login(userData);

      // Rediriger vers la page d'accueil
      router.replace("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>
        Login
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FormContentLogin onSubmit={handleSignIn} />

      {isLoading && <ActivityIndicator color="#006A71" size="small" />}

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => router.push("/screens/LoginScreen")}
      >
        <Text style={styles.registerText}>
          No account yet?
          <Text
            style={{ color: globalStyle.color.secondary, fontWeight: "bold" }}
          >
            Sign up here
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonText: {
    color: "#006A71",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
  },
});
