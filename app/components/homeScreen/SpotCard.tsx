import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import data from '../../../api.json';
import style from '@/styles/global';

const { width } = Dimensions.get('window');

export default function SpotCard() {
  return (
     <FlatList
    data={data.records}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.listContent}
    renderItem={({ item }) => {
      const fields = item.fields;
      const pictureUrl = fields.Photos?.[0]?.url?.replace(/[<>;]/g, '') ?? '';
      const surfBreak = fields["Surf Break"]?.[0] ?? 'Inconnu';
      const address = fields.Address ?? 'Adresse non disponible';

      return (
        <View style={styles.card}>
          {pictureUrl ? (
            <Image source={{ uri: pictureUrl }} style={styles.image} resizeMode="cover" />
          ) : null}
          <Text style={styles.title}>{surfBreak}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      );
    }}
  />
);
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.9,
    marginVertical: 30,
    // marginHorizontal: 10,
    padding: 20,
    backgroundColor: style.color?.primary || '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // pour Android
  },
  image: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
