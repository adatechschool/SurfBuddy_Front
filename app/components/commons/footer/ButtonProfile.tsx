import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import style from '@/styles/global';


interface Props {
  onPress?: () => void; 
  isActive?: boolean; 
}

function ButtonProfile({ onPress, isActive = false }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          isActive && styles.activeButton
        ]} 
        onPress={onPress}
      >
        <Ionicons name="person" size={32} color="#006A71" />
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
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    height: 3,
    width: 20,
    backgroundColor: style.color.primary || '#00A896', // Utiliser la couleur d'accent ou une couleur par défaut
    borderRadius: 1.5,
  },
});

export default ButtonProfile;