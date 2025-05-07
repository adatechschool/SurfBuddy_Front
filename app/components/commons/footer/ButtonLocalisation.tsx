import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import style from '@/styles/global';

type Props = {
  onPress?: () => void; // Fonction déclenchée lors du clic
};

function ButtonLocalisation({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="map" size={24} color={style.color.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default ButtonLocalisation;

