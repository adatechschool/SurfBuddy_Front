import React from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import style from '@/styles/global';
import { Spot } from '../../types/Spot';

export default function SpotCardImage({ item }: { item: Spot }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  // Créer l'URL de l'image à partir de la base64
  const getImageUri = () => {
    if (!item.spot_picture) return null;
    
    // Si c'est déjà formaté avec data:image
    if (item.spot_picture.startsWith('data:image')) {
      return item.spot_picture;
    }
    
    // Sinon, ajouter le préfixe data:image
    return `data:image/jpeg;base64,${item.spot_picture}`;
  };

  const imageUri = getImageUri();

  if (!imageUri) return null;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
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
          <ActivityIndicator size="large" color={style.color?.secondary || '#fff'} />
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          {/* Vous pouvez ajouter un placeholder ou un icon d'erreur ici */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#f0f0f0', // Couleur de fond en cas de chargement
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});