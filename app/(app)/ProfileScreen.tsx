import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from '../components/profileScreen/ProfileImage'; 
import ProfileContent from '../components/profileScreen/ProfileContent'; 
import ButtonUpdate from '../components/profileScreen/ButtonUpdate'; 
import ButtonDelete from '../components/profileScreen/ButtonDelete';
import globalStyle from '../../styles/global'; 
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/sign-in'); // route absolue recommandée
    }
  }, [user]);

  const handleSignOut = () => {
    signOut();
    router.replace('/');
  };

  if (!user) return null;

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>
        My Profile :
      </Text> 
      <ProfileImage />
      <ProfileContent />

      <View style={styles.buttonContainer}>
        <ButtonUpdate onPress={() => console.log('Update')} />
        <ButtonDelete onPress={() => console.log('Delete')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
});

export default ProfileScreen;
