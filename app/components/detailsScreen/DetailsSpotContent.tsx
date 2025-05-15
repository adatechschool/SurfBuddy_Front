import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AirtableRecord } from '@/airtableService';
import style from '@/styles/global';

interface DetailsSpotContentProps {
  spot: AirtableRecord;
}

export default function DetailsSpotContent({ spot }: DetailsSpotContentProps) {
  const { fields } = spot;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fields["Surf Break"]?.[0] || "Spot sans nom"}</Text>
      <Text style={styles.location}>{fields.Country || "No info on the Country"}</Text>
      
      <View style={styles.infoContainer}>
        <InfoItem label="Difficulty" value={fields.DifficultyLevel || "Unspecified"} />
        <InfoItem label="Wave type" value={fields.WaveType || "Unspecified"} />
        <InfoItem label="Best season" value={fields.BestSeason || "Unspecified"} />
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
    color: style.color.text,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: style.color.secondary,
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
