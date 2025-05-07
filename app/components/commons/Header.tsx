import { View, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import style from '@/styles/global';
import Constants from 'expo-constants';

const LogoImage = require('../../../assets/images/logo-icon.png');

export default function Header() {
  // Obtenir la hauteur de la barre d'état directement depuis Constants
  const statusBarHeight = Constants.statusBarHeight || 0;
  
  return (
    <>
      <StatusBar
        backgroundColor={style.color.primary}
        barStyle={'dark-content'}
      />
      <View 
        style={[
          styles.container, 
          { backgroundColor: style.color.primary }
        ]}
      >
        {/* Espace pour la barre d'état */}
        <View style={{ height: statusBarHeight }} />
        
        {/* Header avec logo */}
        <View style={[styles.header, { backgroundColor: style.color.primary, borderBottomColor: style.color.secondary }]}>
          <Image
            source={LogoImage}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  logo: {
    width: 100,
    height: 80, // J'ai réduit la hauteur à 80 pour correspondre au header
  },
});