import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import style from '@/styles/global';

interface Props {
  onPress?: () => void; 
  isActive?: boolean;
}

function ButtonAddSpot({ onPress, isActive = false }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          isActive && styles.activeButton
        ]} 
        onPress={onPress}
      >
        <Ionicons name="add" size={32} color="#006A71" />

      </TouchableOpacity>
      


      {isActive && <View style={styles.activeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: '#F2EFE7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#E4E0D4',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    height: 3,
    width: 20,
    backgroundColor: style.color.primary || '#00A896', 
    borderRadius: 1.5,
  },
});

export default ButtonAddSpot;
