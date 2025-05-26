import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonHome from './ButtonHome';
import global from '../../../../styles/global';
import ButtonLocalisation from './ButtonLocalisation';
import ButtonAddSpot from './ButtonAddSpot';
import ButtonProfile from './ButtonProfile';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';

type NavbarProps = {
  onButtonPress?: (buttonName: string) => void;
};

function Navbar({ onButtonPress }: NavbarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth(); // Récupérer l'état de connexion

  const currentPath = usePathname();
  
  // Fonction pour déterminer si un bouton est actif en fonction du chemin
  const isActive = (path: string): boolean => {
    if (path === '/' && currentPath === '/') return true;
    if (path === '/screens/MapScreen' && currentPath === '/screens/MapScreen') return true;
    if (path === '/components/addSpotScreen/AddSpotScreen' && currentPath === '/components/addSpotScreen/AddSpotScreen') return true;
    if (path === '/components/profileScreen/ProfileScreen' && currentPath === '/components/profileScreen/ProfileScreen') return true;

    return false;
  };

  // Fonction pour gérer le clic sur Add Spot
  const handleAddSpotPress = () => {
    if (onButtonPress) onButtonPress("Add Spot");
    
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      // Rediriger vers la page de connexion si pas connecté
      router.push('/sign-in');
    } else {
      // Aller vers AddSpotScreen si connecté
      router.push("/components/addSpotScreen/AddSpotScreen");
    }
  };
  
  return (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: global.color.primary,
          borderTopColor: global.color.secondary,
          // Ajouter du padding en bas pour respecter la zone de sécurité
          paddingBottom: Math.max(insets.bottom, 5),
        },
      ]}
    >
      {/* Bouton 1 */}
      <ButtonHome
        onPress={() => {
          if (onButtonPress) onButtonPress('Accueil');
          router.push('/');
        }}
        isActive={isActive('/')}
      />
      
      {/* Bouton 2 */}
      <ButtonLocalisation
        onPress={() => {
          if (onButtonPress) onButtonPress('Localisation');
          router.push('/mapscreen/MapScreen');
        }}
        isActive={isActive('/mapscreen/MapScreen')}
      />

      {/* Bouton 3 - Add Spot avec vérification de connexion */}
      <ButtonAddSpot
        onPress={handleAddSpotPress}
        isActive={isActive('/components/addSpotScreen/AddSpotScreen')}
      />
      
      {/* Bouton 4 */}
      <ButtonProfile
        onPress={() => {
          if (onButtonPress) onButtonPress('Profile');
          router.push('/components/profileScreen/ProfileScreen');
        }}
        isActive={isActive('/components/profileScreen/ProfileScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    minHeight: 60, // Hauteur minimale de la navbar
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
  },
});

export default Navbar;
