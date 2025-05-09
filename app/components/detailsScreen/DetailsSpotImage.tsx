import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Image } from 'expo-image';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';

const { width } = Dimensions.get('window');

interface DetailsSpotImageProps {
  spot: AirtableRecord;
}

export default function DetailsSpotImage({ spot }: DetailsSpotImageProps) {
  const photos = spot.fields.Photos || [];
  const imageUrl = photos.length > 0 ? photos[0].url : null;

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
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
  },
  image: {
    width: '100%',
    height: '100%',
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
  },
});
