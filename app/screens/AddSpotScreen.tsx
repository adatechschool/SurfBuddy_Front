import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

type Props = {}

function AddSpotScreen({}: Props) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/sign-in'); // redirection propre
    }
  }, [user]);

  if (!user) {
    return null; // évite de rendre quoi que ce soit pendant la redirection
  }

  return (
    <View >
      <Text>AddSpotScreen</Text>
    </View>
  );
}

export default AddSpotScreen;
