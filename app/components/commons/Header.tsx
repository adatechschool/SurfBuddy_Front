import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import style from '@/styles/global';

export default function Header() {
  // Obtenir le statut de la barre d'état pour les ajustements
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

  return (
      <View style={[styles.header, { borderBottomColor: style.color.secondary }]}>
        <Image
          source={require('../../../assets/images/logo-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
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
    height: 80,
  },
});