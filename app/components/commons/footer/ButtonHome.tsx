import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import style from '@/styles/global';

// Définition de la constante IconSource
const IconSource = require('../../../../assets/images/icon-home-screen.png');

// Mettre à jour l'interface Props pour inclure isActive
interface Props {
  onPress?: () => void; // Fonction déclenchée lors du clic
  isActive?: boolean; // Indique si ce bouton correspond à la page actuelle
}

function ButtonHome({ onPress, isActive = false }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button, 
          isActive && styles.activeButton
        ]} 
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Image 
            source={IconSource} 
            style={styles.icon} 
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
      
      {/* Indicateur d'activité */}
      {isActive && (
        <View style={styles.activeIndicator} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: '#F2EFE7', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5, // Espacement vertical entre les boutons
  },
  activeButton: {
    backgroundColor: '#E4E0D4', // Version légèrement plus foncée pour l'état actif
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 32,
    width: 32, // Taille de l'icône
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    height: 3,
    width: 20,
    backgroundColor: style.color.primary || '#00A896', // Utiliser la couleur d'accent ou une couleur par défaut
    borderRadius: 1.5,
  },
});

export default ButtonHome;