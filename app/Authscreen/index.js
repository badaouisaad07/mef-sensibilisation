import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../(tabs)/firebaseConfig'; // Adjust path

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // _layout.js will handle redirection to /(tabs)/Home
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#154c79',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    maxWidth: 400, // Better for web
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#154c79',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});