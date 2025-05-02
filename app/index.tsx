import React from "react";
import { View, StyleSheet } from "react-native";


export default function Index() {
  return <View style={styles.container}> 
  {/* Votre contenu ici */} 
  </View>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
