import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonHome from './ButtonHome';
import global from '../../../../styles/global';
import ButtonLocalisation from './ButtonLocalisation';
import ButtonAddSpot from './ButtonAddSpot';
import ButtonProfile from './ButtonProfile';
import { useRouter, usePathname } from 'expo-router';

type NavbarProps = {
  onButtonPress?: (buttonName: string) => void;
};

function Navbar({ onButtonPress }: NavbarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const currentPath = usePathname();
  
  // Fonction pour déterminer si un bouton est actif en fonction du chemin
  const isActive = (path: string): boolean => {
    if (path === '/' && currentPath === '/') return true;
    if (path === '/screens/MapScreen' && currentPath === '/screens/MapScreen') return true;
    if (path === '/screens/AddSpotScreen' && currentPath === '/screens/AddSpotScreen') return true;
    if (path === '/screens/ProfileScreen' && currentPath === '/screens/ProfileScreen') return true;

    return false;
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
          router.push('/screens/MapScreen');
        }}
        isActive={isActive('/screens/MapScreen')}
      />
      
      {/* Bouton 3 */}
      <ButtonAddSpot
        onPress={() => {
          if (onButtonPress) onButtonPress('Add Spot');
          router.push('/screens/AddSpotScreen');
        }}
        isActive={isActive('/screens/AddSpotScreen')}
      />
      
      {/* Bouton 4 */}
      <ButtonProfile
        onPress={() => {
          if (onButtonPress) onButtonPress('Profile');
          router.push('/screens/ProfileScreen');
        }}
        isActive={isActive('/screens/ProfileScreen')}
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
