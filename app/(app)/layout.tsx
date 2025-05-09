import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import globalStyle from '../../styles/global';

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={globalStyle.color.primary} />
        <Text style={{ marginTop: 10, color: globalStyle.color.secondary }}>Chargement...</Text>
      </View>
    );
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!user) {
    // Sur le web, le rendu statique s'arrêtera ici car l'utilisateur n'est pas authentifié
    return <Redirect href="/sign-in" />;
  }

  // Ce layout peut être différé car ce n'est pas le layout racine
  return <Stack />;
}