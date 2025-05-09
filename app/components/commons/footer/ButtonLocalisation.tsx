import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import style from '@/styles/global';

// Mettre à jour l'interface Props pour inclure isActive
interface Props {
  onPress?: () => void; // Fonction déclenchée lors du clic
  isActive?: boolean; // Indique si ce bouton correspond à la page actuelle
}

function ButtonLocalisation({ onPress, isActive = false }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          isActive && styles.activeButton
        ]} 
        onPress={onPress}
      >
        <Ionicons 
          name="map" 
          size={32} color="#00A896"  
        />
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
    backgroundColor: '#F2EFE7', // Ajout de la même couleur de fond que les autres boutons
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#E4E0D4', // Version légèrement plus foncée pour l'état actif
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

export default ButtonLocalisation;