import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormContentProfile from '../components/loginScreen/FormContentProfile'; 
import ButtonLogin from '../components/loginScreen/ButtonLogin';
import FormImageProfile from '../components/loginScreen/FormImageProfile';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Ajout de l'image de profil */}
      <FormImageProfile />

      {/* Ajout du formulaire pour le profil */}
      <FormContentProfile />

       {/* Ajout du bouton Login */}
       <ButtonLogin onPress={() => console.log("Connexion")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#006A71',
  },
});

export default LoginScreen;
