import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // chemin corrigé
import { useRouter } from 'expo-router'; // ajouté

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter(); // nécessaire pour naviguer

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Compte créé avec succès", "Connectez-vous maintenant.");
        setIsRegister(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)/Home');// redirection vers Home
      }
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegister ? 'Créer un compte' : 'Connexion'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isRegister ? 'S’inscrire' : 'Se connecter'} onPress={handleAuth} />
      <Text onPress={() => setIsRegister(!isRegister)} style={styles.link}>
        {isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S’inscrire'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});

export default AuthScreen;
