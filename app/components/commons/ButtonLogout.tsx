import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '@/styles/global';

interface ButtonLogoutProps {
  color?: string;
  size?: number;
}

const ButtonLogout: React.FC<ButtonLogoutProps> = ({ 
  color = style.color.secondary,
  size = 24
}) => {
  const { isAuthenticated, signOut } = useAuth();
  
  const handleSignOut = () => {
    signOut();
    router.replace('/');
  };
  
  // N'afficher le bouton que si l'utilisateur est authentifié
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <TouchableOpacity
      style={styles.ButtonLogout}
      onPress={handleSignOut}
      activeOpacity={0.7}
    >
      <Icon name="sign-out" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonLogout: {
    padding: 8,
  }
});

export default ButtonLogout;