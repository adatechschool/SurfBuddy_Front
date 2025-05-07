import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonHome from './ButtonHome';
import global from '../../../../styles/global';
import ButtonLocalisation from './ButtonLocalisation';
import ButtonAddSpot from './ButtonAddSpot';
import ButtonProfile from './ButtonProfile';
import { useRouter } from 'expo-router';

type NavbarProps = {
  onButtonPress?: (buttonName: string) => void;
};

function Navbar({ onButtonPress }: NavbarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={[
        styles.navbar,
        { 
          backgroundColor: global.color.primary, 
          borderTopColor: global.color.secondary,
          // Ajouter du padding en bas pour respecter la zone de sécurité
          paddingBottom: Math.max(insets.bottom, 5)
        },
      ]}
    >
      {/* Bouton 1 */}
      <ButtonHome 
        onPress={() => {
          if (onButtonPress) onButtonPress('Accueil');
          router.push('/');
        }} 
      />

      {/* Bouton 2 */}
      <ButtonLocalisation    
        onPress={() => {
          if (onButtonPress) onButtonPress('Localisation');
          router.push('/screens/DetailsScreen');
        }} 
      />
   
      {/* Bouton 3 */}
      <ButtonAddSpot 
        onPress={() => {
          if (onButtonPress) onButtonPress('Add Spot');
          router.push('/(app)/AddSpotScreen');
        }}
      />
        
      {/* Bouton 4 */}
      <ButtonProfile 
        onPress={() => {
          if (onButtonPress) onButtonPress('Profile');
          router.push('/(app)/ProfileScreen');
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    minHeight: 60, // Hauteur minimale de la navbar
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export default Navbar;