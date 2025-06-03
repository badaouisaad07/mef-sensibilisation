import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, Image, Alert, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const buttons = [
  { title: 'Présentation de la Sensibilisation (PDF)', file: 'https://mfestockage.blob.core.windows.net/media/SENSIBILISATION%20SSI_p4%202025.pptx' },
  { title: 'Charte de Sécurité (PDF)', file: 'https://drive.google.com/file/d/1RTvDHR9LdLtAbrPtegrnWuPeAVZvWaJZ/view?usp=drive_link' },
  { title: 'Questionnaire (Google Form)', file: 'https://docs.google.com/forms/d/e/1FAIpQLSfiKWNLBTANpBlAhDI3HaMJk5AHiPY7qMC3mlqmFKliNj7dlw/viewform' },
  { title: 'Vidéos Explicatives', file: 'https://drive.google.com/drive/folders/1dWHM1ZOcRfFSfvLsE8kmpIKqlqd7uK1o?usp=drive_link' },
  { title: 'Lois Marocaines', file: 'https://docs.google.com/presentation/d/1sl204bzT7IIP4US1BfJ804lBTcsfASGv/edit?usp=drive_link' },
  { title: 'Mots Techniques', file: 'https://example.com/mots_techniques.pdf' },
  { title: '5 bonnes pratiques', file: 'https://drive.google.com/file/d/14iKwIIwA7CxY9ARHH-pdvFVgOL9UQrQi/view?usp=drive_link' },
];

export default function Home() {
  const router = useRouter();

  const handlePress = async (file) => {
    try {
      await Linking.openURL(file);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’ouvrir le fichier.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/AuthScreen'); // Updated to match directory
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la déconnexion.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.headerText}>Sensibilisation MEF</Text>

      <View style={styles.buttonContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(btn.file)}>
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.helpText}>Besoin d'aide ? xxxx@mef.gov.ma</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: '100vh', // Use vh for web
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 600, // Better for web
    marginTop: 20,
  },
  button: {
    backgroundColor: '#154c79',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpText: {
    marginTop: 30,
    color: '#154c79',
    fontSize: 12,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#154c79',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});