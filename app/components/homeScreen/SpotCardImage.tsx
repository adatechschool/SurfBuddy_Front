import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import type { AirtableRecord } from '@/airtableService';


const { width } = Dimensions.get('window');

export default function SpotCardImage({ item }: { item: AirtableRecord }) {
  const pictureUrl = item.fields.Photos?.[0]?.url?.replace(/[<>;]/g, '') ?? '';

  if (!pictureUrl) return null;

  return (
    <Image
      source={{ uri: pictureUrl }}
      style={{
        width: '100%',
        height: width * 0.5,
        borderRadius: 10,
        marginBottom: 10,
      }}
      resizeMode="cover"
    />
  );
}