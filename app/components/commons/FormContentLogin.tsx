// FormContentLogin.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icône pour cacher/afficher
import style from '../../../styles/global'; // Import du style global

interface FormContentLoginProps {
  onSubmit: (email: string, password: string) => void;
}

const FormContentLogin = ({ onSubmit }: FormContentLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('Please enter your email');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email format invalid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Please enter your password');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isEmailValid && isPasswordValid && onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          onBlur={validatePassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon 
            name={isPasswordVisible ? 'eye-slash' : 'eye'} 
            size={20} 
            color={style.color.secondary} 
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}

      <TouchableOpacity 
        style={[{
          backgroundColor: style.color.primary,
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          width: '100%',
          marginTop: 10
        }]}
        onPress={handleSubmit}
      >
        <Text style={{ color: '#006A71', fontWeight: 'bold' }}>Login</Text>
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
});

export default FormContentLogin;