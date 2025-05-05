import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import profile from '../../../profile.json'; // Assure-toi du bon chemin d'importation

const ProfileImage = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.profileImage }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfileImage;
