import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../../../styles/global";
import { useAuth } from "../../context/AuthContext";

type FocusableField = "email" | "password" | null;

const FormContentProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusableField>(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await fetch('http://192.168.12.202:8000/login', {
=======
      const response = await fetch('process.env.EXPO_PUBLIC_API_URL/login', {
>>>>>>> bd61a72990636050e0fc3059a16481f76a0c4172
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 401) {
          throw new Error("Incorrect email or password.");
        } else if (response.status === 400) {
          throw new Error(errorData?.error || "Invalid data.");
        } else {
          throw new Error(errorData?.error || "Connection error.");
        }
      }

      const responseData = await response.json();
      
      // Successful login
      login(responseData.user);
      Alert.alert("Success", `Welcome ${responseData.user.alias}!`);

    } catch (error) {
      Alert.alert(
        "Login error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Email */}
      <TextInput
        style={[styles.input, focusedField === "email" && styles.focusedInput]}
        placeholder="Your email"
        placeholderTextColor={style.color.text}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
      />

      {/* Password */}
      <View
        style={[
          styles.passwordContainer,
          focusedField === "password" && styles.focusedInput,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Your password"
          placeholderTextColor={style.color.text}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={24}
            color={style.color.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          (!email || !password) && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: style.color.primary,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderBottomColor: style.color.secondary,
    borderColor: "transparent",
    fontFamily: style.fonts.regular,
    color: style.color.text,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
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
  button: {
    marginTop: 10,
    backgroundColor: style.color.secondary,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontFamily: style.fonts.regular,
    fontSize: 16,
  },
});

export default FormContentProfile;