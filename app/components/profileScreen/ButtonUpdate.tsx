import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

type Props = {
  onPress?: () => void; // Fonction déclenchée lors du clic
};

function ButtonUpdate({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.updateButton} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Update</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    updateButton: {
    backgroundColor: '#F2EFE7', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, // Assure que le bouton a la même taille
    height: 50, // Définir une hauteur cohérente
    marginVertical: 5,
    shadowColor: '#000', // Ombre légère
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16, // Taille du texte
    fontWeight: 'bold', // Rend le texte plus visible
    color: '#333', // Couleur du texte
  },
});

export default ButtonUpdate;
