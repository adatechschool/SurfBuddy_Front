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

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SignIn() {
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Tentative de connexion à:", `${API_URL}/login`);
      console.log("Données envoyées:", JSON.stringify({ email, password }));
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Statut de la réponse:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log("Données d'erreur:", errorData);
        
        if (response.status === 401) {
          throw new Error(errorData?.message || "Email ou mot de passe incorrect.");
        } else if (response.status === 400) {
          throw new Error(errorData?.message || "Données invalides.");
        } else if (response.status === 404) {
          throw new Error("Utilisateur non trouvé.");
        } else {
          throw new Error(errorData?.message || "Erreur de connexion.");
        }
      }

      const responseData = await response.json();
      console.log("Données de réponse:", responseData);

      // Votre API retourne maintenant : { message: "...", user: { id, alias, email, profile_picture } }
      if (!responseData.user) {
        throw new Error("Structure de réponse invalide - utilisateur manquant");
      }

      const userData = responseData.user;

      // Vérifier que les données utilisateur sont valides
      if (!userData || !userData.id || !userData.email) {
        throw new Error("Données utilisateur invalides reçues");
      }

      // Mettre à jour le contexte avec les données utilisateur
      login(userData);

      // Rediriger vers la page d'accueil
      router.replace("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Échec de la connexion. Veuillez réessayer.";
      setError(errorMessage);
      console.error("Erreur de connexion:", err);
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
        onPress={() => router.push("/components/loginScreen/FormContentProfile")}
      >
        <Text style={styles.registerText}>
          No account yet?{" "}
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
