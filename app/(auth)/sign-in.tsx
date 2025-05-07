import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';


export default function SignIn() {
  const { signIn } = useAuth();

  const handleSignIn = () => {
    signIn('user-token');  // Remplacer par une logique d'authentification
    router.replace('/');  // Redirige après connexion
  };

  return (
    <View>
      <Text onPress={handleSignIn}>Login</Text>
    </View>
  );
}
