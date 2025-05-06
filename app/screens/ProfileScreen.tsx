import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from '../components/profileScreen/ProfileImage'; 
import ProfileContent from '../components/profileScreen/ProfileContent'; 
import ButtonUpdate from '../components/profileScreen/ButtonUpdate'; 
import ButtonDelete from '../components/profileScreen/ButtonDelete';
import globalStyle from '../../styles/global'; // Assure-toi que l'import est correct

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>
        Mon Profil :
      </Text> 
      <ProfileImage />
      <ProfileContent />

      {/* Conteneur des boutons */}
      <View style={styles.buttonContainer}>
        <ButtonUpdate onPress={() => console.log('Modifier')} />
        <ButtonDelete onPress={() => console.log('Supprimer')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Boutons côte à côte
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
});

export default ProfileScreen;
