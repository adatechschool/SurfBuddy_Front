import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

const FormImageProfile = () => {
  // Définir le type correct pour profileImage (string ou null)
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Demander les permissions (pour Android)
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permission d'accès à la galerie",
            message: "L'application a besoin d'accéder à vos photos",
            buttonNeutral: "Demander plus tard",
            buttonNegative: "Annuler",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Fonction pour choisir une image
  const selectImage = async () => {
    // Vérifier les permissions d'abord
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.warn("Permission refusée");
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      console.log('Response =', response);

      if (response.didCancel) {
        console.warn("Sélection annulée !");
        return;
      }

      if (response.errorCode) {
        console.warn('ImagePicker Error: ', response.errorMessage);
        return;
      }

      if (!response.assets || response.assets.length === 0) {
        console.warn("Aucune image trouvée !");
        return;
      }
      
      console.log('Image URI:', response.assets[0].uri);
      setProfileImage(response.assets[0].uri ?? null);
    });
  };
  
  return (
    <View style={styles.container}>
      <Image 
        source={profileImage ? { uri: profileImage } : require('../../../assets/images/logo-icon.png')}
        style={styles.image}
      />

      {/* Bouton pour changer l'image */}
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Changer l'image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Image circulaire
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#006A71',
    borderRadius: 5,
  },
  buttonText: {
    color: '#F2EFE7',
    fontWeight: 'bold',
  },
});

export default FormImageProfile;