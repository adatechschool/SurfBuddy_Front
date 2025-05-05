import { View, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import style from '@/styles/global';

const LogoImage = require('../../../assets/images/logo-icon.png');

export default function Header() {
  return (
    <>
    <StatusBar 
      backgroundColor={style.color.primary}
      barStyle={'dark-content'}
    />
    <SafeAreaView style={{ flex: 0, backgroundColor: style.color.primary }}>
      {/* SafeAreaView pour gérer le notch sur iOS */}
    </SafeAreaView>
    <View style={[styles.header, { backgroundColor: style.color.primary, borderBottomColor: style.color.secondary }]}>
      <Image
        source={require('../../../assets/images/logo-icon.png')}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  </>
);
}

const styles = StyleSheet.create({
  header: {
    height: 80, // Hauteur fixe du header (sans compter la barre d'état)
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',      // Centre vertical
    justifyContent: 'center',  // Centre horizontal
    borderBottomWidth: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
}); 