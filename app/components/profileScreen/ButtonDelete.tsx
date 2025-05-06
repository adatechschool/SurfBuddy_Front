import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

type Props = {
  onPress?: () => void; // Fonction déclenchée lors du clic
};

function ButtonDelete({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Delete</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#930404', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, // Assure que le bouton a la même taille
    height: 50, // Définir une hauteur cohérente
    marginVertical: 5,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16, // Taille du texte
    fontWeight: 'bold', // Rend le texte plus visible
    color: '#F2EFE7', // Couleur du texte
  },
});

export default ButtonDelete;
