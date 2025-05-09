import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';
import globalStyle from '../styles/global';
import FormContentLogin from './components/commons/FormContentLogin';

export default function SignIn() {
  const { signIn, setUser } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSignIn = async (email: string, password: string) => {
    const hardcodedEmail = 'test@example.com';
    const hardcodedPassword = 'password123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      setUser({
        id: '123', 
        name: 'Utilisateur Test', 
        email, 
      });
    } else {
      setError('Identifiants invalides');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await signIn(email, password); 
      router.replace('/'); 
    } catch (err) {
      setError('Échec de la connexion. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>Connexion</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {/* Le formulaire fait maintenant tout le travail de connexion */}
      <FormContentLogin onSubmit={handleSignIn} />
      
      {isLoading && <ActivityIndicator color="#006A71" size="small" />}
      
      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => router.push('/')}
      >
        <Text style={styles.registerText}>
          No account yet?{' '}
          <Text style={{ color: globalStyle.color.secondary, fontWeight: 'bold' }}>
            Sign up here
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonText: {
    color: '#006A71',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
  },
});
