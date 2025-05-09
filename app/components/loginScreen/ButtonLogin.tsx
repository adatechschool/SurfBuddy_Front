import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import style from '../../../styles/global'; // Assure-toi que le chemin est correct

type Props = {
  onPress?: () => void;
};

const ButtonLogin = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%', // Prend toute la largeur
    padding: 15,
    backgroundColor: style.color.secondary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Espacement sous le formulaire
  },
  buttonText: {
    fontSize: 18,
    fontFamily: style.fonts.bold,
    color: style.color.primary,
    textTransform: 'uppercase',
  },
});

export default ButtonLogin;
