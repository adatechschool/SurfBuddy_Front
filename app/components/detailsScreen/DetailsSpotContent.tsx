import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from '@/styles/global';
import { Spot } from '@/app/types/Spot';

interface DetailsSpotContentProps {
  spot: Spot;
}

export default function DetailsSpotContent({ spot }: DetailsSpotContentProps) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{spot.spot_name|| "Spot without type"}</Text>
      <Text style={styles.location}>{spot.city}, {spot.country}</Text>
      {/* <Text style={styles.location}>{spot.country || "No info on the Country"}</Text>
       */}
      <View style={styles.infoContainer}>
        <InfoItem label="Difficulty" value={spot.difficulty || "Unspecified"} />
        <InfoItem label="Season Begin" value={spot.season_begin || "Unspecified"} />
        <InfoItem label="Season End" value={spot.season_end || "Unspecified"} />
      </View>
      
    </View>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: style.color.primary,
    borderRadius: 12,
    width: '100%',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: style.color.secondary,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: style.color.text,
  },
  infoValue: {
    fontSize: 14,
    color: style.color.text,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: style.color.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: style.color.text,
  },
});
