import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icône pour cacher/afficher
import style from '../../../styles/global'; // Import du style global

// Définir un type pour les champs qui peuvent être focalisés
type FocusableField = 'nom' | 'email' | 'password' | 'confirmPassword' | null;

const FormContentProfile = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // État pour gérer le focus des champs avec le type correct
  const [focusedField, setFocusedField] = useState<FocusableField>(null);

  return (
    <View style={styles.container}>
      {/* Champ Nom */}
      <TextInput 
        style={[styles.input, focusedField === 'nom' && styles.focusedInput]}
        placeholder="Your pseudo" 
        placeholderTextColor={style.color.text}
        value={nom} 
        onChangeText={setNom}
        onFocus={() => setFocusedField('nom')}
        onBlur={() => setFocusedField(null)}
      />

      {/* Champ Email */}
      <TextInput 
        style={[styles.input, focusedField === 'email' && styles.focusedInput]}
        placeholder="Your email" 
        placeholderTextColor={style.color.text}
        keyboardType="email-address"
        value={email} 
        onChangeText={setEmail}
        onFocus={() => setFocusedField('email')}
        onBlur={() => setFocusedField(null)}
      />

      {/* Champ Mot de passe */}
      <View style={[styles.passwordContainer, focusedField === 'password' && styles.focusedInput]}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Your password" 
          placeholderTextColor={style.color.text}
          secureTextEntry={!isPasswordVisible}
          value={password} 
          onChangeText={setPassword}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} color={style.color.secondary} />
        </TouchableOpacity>
      </View>

      {/* Champ Confirmation du mot de passe */}
      <View style={[
        styles.passwordContainer, 
        focusedField === 'confirmPassword' && styles.focusedInput,
        password !== confirmPassword && confirmPassword.length > 0 ? styles.errorBorder : null
      ]}>
        <TextInput 
          style={styles.passwordInput}
          placeholder="Repeat your password" 
          placeholderTextColor={style.color.text}
          secureTextEntry={!isPasswordVisible} 
          value={confirmPassword} 
          onChangeText={setConfirmPassword}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Message d'erreur si les mots de passe ne correspondent pas */}
      {password !== confirmPassword && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>The passwords don't match!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: style.color.primary,
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderBottomColor: style.color.secondary,
    borderColor: 'transparent',
    fontFamily: style.fonts.regular,
    color: style.color.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: style.color.secondary,
    paddingRight: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontFamily: style.fonts.regular,
    color: style.color.text,
  },
  focusedInput: {
    borderColor: style.color.secondary,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    fontFamily: style.fonts.regular,
  },
  errorBorder: {
    borderColor: 'red',
  },
});

export default FormContentProfile;