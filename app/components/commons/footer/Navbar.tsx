import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonHome from './ButtonHome'; // Assurez-vous que le chemin est correct
import global from '../../../../styles/global'; // Import des styles globaux
import ButtonLocalisation from './ButtonLocalisation';
import ButtonAddSpot from './ButtonAddSpot';
import ButtonProfile from './ButtonProfile';
import { useRouter } from 'expo-router';


type NavbarProps = {
  onButtonPress?: (buttonName: string) => void; // Fonction pour gérer les clics des boutons
};

function Navbar({ onButtonPress }: NavbarProps) {
  const router = useRouter(); 
  return (
    <View
      style={[
        styles.navbar,
        { backgroundColor: global.color.primary, borderTopColor: global.color.secondary },
      ]}
    >
      {/* Bouton 1 */}
      <ButtonHome onPress={() => {
  if (onButtonPress) onButtonPress('Accueil');
  router.push('/screens/HomeScreen');
}} />

      {/* Bouton 2 */}
      <ButtonLocalisation    onPress={() => {
  if (onButtonPress) onButtonPress('Accueil');
  router.push('/screens/DetailsScreen');
}} />
   

      {/* Bouton 3 */}
      <ButtonAddSpot onPress={() => {
            if (onButtonPress) onButtonPress('Accueil');
            router.push('/screens/AddSpotScreen');
          }}/>

        
      {/* Bouton 4 */}
      <ButtonProfile onPress={() => {
          if (onButtonPress) onButtonPress('Accueil');
          router.push('/screens/ProfileScreen');
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 80, // Hauteur de la navbar (footer)
    flexDirection: 'row', // Alignement horizontal des boutons
    justifyContent: 'space-around', // Espacement uniforme entre les boutons
    alignItems: 'center', // Aligne les boutons verticalement
    borderTopWidth: 1, // Ligne séparatrice
  },
});

export default Navbar;
