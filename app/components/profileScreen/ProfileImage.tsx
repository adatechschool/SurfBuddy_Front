import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const API_URL = "http://192.168.13.5:8000";

const ProfileImage = () => {
  const { user } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [alias, setAlias] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_URL}/users/${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.profile_picture) {
            setImageUri(`data:image/jpeg;base64,${data.profile_picture}`);
          }
          setAlias(data.alias);
        })
        .catch(error => console.error('Error while charging profile:', error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{alias ? alias : 'User'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileImage;
