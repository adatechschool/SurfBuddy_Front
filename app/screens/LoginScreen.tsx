import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FormContentProfile from '../components/loginScreen/FormContentProfile'; 
import ButtonLogin from '../components/loginScreen/ButtonLogin';
import FormImageProfile from '../components/loginScreen/FormImageProfile';
import * as ImagePicker from 'expo-image-picker';
import ButtonLoadImage from '../components/loginScreen/ButtonLoadImage';

const PlaceholderImage = require('@/assets/images/logo-icon.png');

const LoginScreen = () => {
  const [selectedImage, setSelectedImage] = useState(PlaceholderImage);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.imageContainer}>
        <FormImageProfile imgSource={selectedImage} />
      </View>

      <View style={styles.footerContainer}>
        <ButtonLoadImage theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      </View>

      {/* Espace entre le bouton et le formulaire */}
      <View style={styles.spacer}></View>

      <FormContentProfile />
      <ButtonLogin onPress={() => console.log("Connexion")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,         // Assure que le contenu prend toute la place disponible
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#006A71',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    gap: 12,            // Espacement entre les boutons
  },
  spacer: {
    height: 20,         // Espace entre le bouton et le formulaire
  },
});

export default LoginScreen;
