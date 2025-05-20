import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ProfileImage from '../components/commons/ProfilePicture'; 
import ProfileContent from '../components/profileScreen/ProfileContent'; 
import ButtonUpdate from '../components/commons/buttons/ButtonUpdate'; 
import ButtonDelete from '../components/commons/buttons/ButtonDelete';
import globalStyle from '../../styles/global'; 
import { useAuth } from '../context/AuthContext'; // Authentication context
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/sign-in'); // route absolue recommandée
    }
  }, [user]);

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: globalStyle.color.secondary }]}>
        My Profile :
      </Text> 
      <ProfileImage />
      <ProfileContent />

      <View style={styles.buttonContainer}>
        <ButtonUpdate onPress={() => console.log('Update')} />
        <ButtonDelete onPress={() => console.log('Delete')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
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
