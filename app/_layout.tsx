import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import style from "@/styles/global";
import Header from "./components/commons/Header";
import Navbar from "./components/commons/footer/Navbar"; // Votre Navbar
import { AuthProvider } from './context/AuthContext'; // Importez le AuthProvider

// Empêche l'app de cacher le splash avant que les polices soient prêtes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider> {/* Ajout du AuthProvider ici */}
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          {/* Header fixe en haut */}
          <Header />
          
          {/* Contenu principal entre le header et le footer */}
          <View style={styles.content}>
            <Stack
              screenOptions={{
                headerShown: false, // Désactive les headers automatiques
              }}
            />
          </View>
          
          {/* Navbar (footer) fixe en bas */}
          <Navbar />
        </View>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend toute la hauteur de l'écran
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1, // Prend tout l'espace disponible entre le header et le footer
  },
});