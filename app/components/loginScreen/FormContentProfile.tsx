import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../../styles/global';
import { useAuth } from '../../context/AuthContext'; // Authentication context

type FocusableField = 'name' | 'email' | 'password' | 'confirmPassword' | null;

const FormContentProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusableField>(null);

  const { login } = useAuth(); // method to update the connected user

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    // Ensure passwords match before submitting
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Login failed');
      }

      const userData = await response.json();
      login(userData); // update user context
      Alert.alert('Success', `Welcome ${userData.alias || name}!`);
    } catch (error) {
      Alert.alert('Login error', error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      {/* Name */}
      <TextInput 
        style={[styles.input, focusedField === 'name' && styles.focusedInput]}
        placeholder="Your alias" 
        placeholderTextColor={style.color.text}
        value={name} 
        onChangeText={setName}
        onFocus={() => setFocusedField('name')}
        onBlur={() => setFocusedField(null)}
      />

      {/* Email */}
      <TextInput 
        style={[styles.input, focusedField === 'email' && styles.focusedInput]}
        placeholder="Your email" 
        placeholderTextColor={style.color.text}
        keyboardType="email-address"
        value={email} 
        onChangeText={setEmail}
        onFocus={() => setFocusedField('email')}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
      />

      {/* Password */}
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

      {/* Confirm password */}
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

      {/* Error if passwords don't match */}
      {password !== confirmPassword && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>The passwords don't match!</Text>
      )}

      {/* Login Button */}
      <TouchableOpacity 
        style={[
          styles.button,
          (!email || !password || password !== confirmPassword) && styles.buttonDisabled
        ]} 
        onPress={handleLogin}
        disabled={!email || !password || password !== confirmPassword}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 10,
    backgroundColor: style.color.secondary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontFamily: style.fonts.regular,
    fontSize: 16,
  },
});

export default FormContentProfile;