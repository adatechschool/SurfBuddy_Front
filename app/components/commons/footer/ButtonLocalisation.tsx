import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

// Définition de la constante IconSource
const IconSource = require('../../../../assets/images/icon-localisation-navbar.png');

type Props = {
  onPress?: () => void; // Fonction déclenchée lors du clic
};

function ButtonLocalisation({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={IconSource} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F2EFE7', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5, // Espacement vertical entre les boutons
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 32,
    width: 32, // Taille de l'icône
  },
});

export default ButtonLocalisation;
