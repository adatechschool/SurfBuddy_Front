import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import data from '../../../api.json';
import style from '@/styles/global';

export default function SpotCard() {
  return (
    <FlatList
      data={data.records}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        const pictureUrl = item.Photos.replace(/[<>;]/g, '');
        return (
          <View style={styles.card}>
            <Image source={{ uri: pictureUrl }} style={styles.image} />
            <Text style={styles.title}>{item["Surf Break"]}</Text>
            <Text style={styles.address}>{item.Address}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({

    card: {
      margin: 10,
      padding: 12,
      backgroundColor: style.color.primary,
      borderRadius: 12,
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 200,
      borderRadius: 8,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: style.fonts.bold,
      color: style.color.text,
    },
    address: {
      fontSize: 16,
      fontFamily: style.fonts.regular,
      color: style.color.text,
    },
  });
  
