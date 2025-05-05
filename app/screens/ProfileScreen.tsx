import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileImage from '../components/profileScreen/ProfileImage'; 
import ProfileContent from '../components/profileScreen/ProfileContent'; 
import globalStyle from '../../styles/global'; // Assure-toi que l'import est correct

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>
        Mon Profil :
      </Text> 
      <ProfileImage />
      <ProfileContent />
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
});

export default ProfileScreen;
