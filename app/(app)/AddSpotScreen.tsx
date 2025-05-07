import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';


type Props = {}

function AddSpotScreen({}: Props) {
  const { user } = useAuth();

  if (!user) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    router.replace('./sign-in');
    return null;
  }

  return (
    <View>
      <Text>AddSpotScreen</Text>
      </View>
  )
}

export default AddSpotScreen