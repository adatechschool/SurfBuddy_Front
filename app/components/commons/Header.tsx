import { View, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';

const LogoImage = require('../../../assets/images/logo-icon.png');

export default function Header() {
  return (
    <View style={styles.header}>
      <Image 
        source={LogoImage} 
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 