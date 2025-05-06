import { StyleSheet, View } from "react-native";
import SpotCard from "./components/homeScreen/SpotCard";
import style from "@/styles/global";


export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: style.color.background }}>
      <SpotCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  });