import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Spot } from '../../types/Spot';
import style from '@/styles/global';

const { width } = Dimensions.get('window');

interface DetailsSpotImageProps {
  spot: Spot;
}

export default function DetailsSpotImage({ spot }: DetailsSpotImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Créer l'URL de l'image à partir de la base64
  const getImageUri = () => {
    if (!spot.spot_picture) return null;
    
    // Si c'est déjà formaté avec data:image
    if (spot.spot_picture.startsWith('data:image')) {
      return spot.spot_picture;
    }
    
    // Sinon, ajouter le préfixe data:image
    return `data:image/jpeg;base64,${spot.spot_picture}`;
  };

  const imageUri = getImageUri();

  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="cover"
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={style.color.secondary} />
            </View>
          )}
          {error && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Erreur de chargement de l'image</Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Aucune image disponible</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});
