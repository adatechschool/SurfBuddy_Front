import React from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import style from '@/styles/global';
import { Spot } from '../../types/Spot';

export default function SpotCardImage({ item }: { item: Spot }) {
  const picture = item.spot_picture ?? '';
  const [loading, setLoading] = React.useState(true);

  if (!picture) return null;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: picture}}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={style.color?.secondary || '#fff'} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Remplace le height fixe par un ratio d'aspect
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
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
});