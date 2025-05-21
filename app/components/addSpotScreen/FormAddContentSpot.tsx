import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

type SpotContentProps = {
  spotName: string;
  difficultyLevel: string;
  destination: string;
};

const FormAddContentSpot = ({
  spotName,
  difficultyLevel,
  destination,
}: SpotContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Spot Name :</Text>
      <View style={styles.block}>
        <Text style={styles.value}>{spotName || "Undefined"}</Text>
      </View>

      <Text style={styles.label}>Difficulty Level :</Text>
      <View style={styles.block}>
        <Text style={styles.value}>{difficultyLevel || "Undefined"}</Text>
      </View>

      <Text style={styles.label}>Destination :</Text>
      <View style={styles.block}>
        <Text style={styles.value}>{destination || "Undefined"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  block: {
    backgroundColor: "#F2EFE7",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    fontSize: 15,
    color: "#444",
  },
});

export default FormAddContentSpot;
