import React from "react";
import { View, Image, StyleSheet } from "react-native";

type SpotImageProps = {
  imageUri?: string | null;
};

const FormAddImageSpot = ({ imageUri }: SpotImageProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../../../assets/images/logo-icon.png")
        }
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default FormAddImageSpot;
