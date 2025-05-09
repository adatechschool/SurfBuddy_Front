import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import style from '@/styles/global';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Ionicons 
            name="search" 
            size={20} 
            color="#999" 
            style={styles.searchIcon} 
          />
          <TextInput
            placeholder="Rechercher un spot..."
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: style.color?.background || '#fff',
    alignItems: 'center',
  },
  searchBarWrapper: {
    width: '100%',
    maxWidth: 700, // Limite la largeur sur grands écrans
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;