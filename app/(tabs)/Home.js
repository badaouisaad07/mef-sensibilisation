import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, Image, Alert } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/AuthScreen'); // Redirige vers la page d'auth si pas connecté
      }
    });

    return unsubscribe;
  }, []);

  const buttons = [
    { 
      title: 'Présentation de la Sensibilisation (PDF)', 
      file: 'https://mfestockage.blob.core.windows.net/media/SENSIBILISATION%20SSI_p4%202025.pptx'
    },
    { title: 'Charte de Sécurité (PDF)', file: 'https://drive.google.com/file/d/1RTvDHR9LdLtAbrPtegrnWuPeAVZvWaJZ/view?usp=drive_link' },
    { title: 'Questionnaire (Google Form)', file: 'https://docs.google.com/forms/d/e/1FAIpQLSfiKWNLBTANpBlAhDI3HaMJk5AHiPY7qMC3mlqmFKliNj7dlw/viewform' },
    { title: 'Vidéos Explicatives', file: 'https://drive.google.com/drive/folders/1dWHM1ZOcRfFSfvLsE8kmpIKqlqd7uK1o?usp=drive_link' },
    { title: 'Lois Marocaines', file: 'https://docs.google.com/presentation/d/1sl204bzT7IIP4US1BfJ804lBTcsfASGv/edit?usp=drive_link&ouid=117637970889920778019&rtpof=true&sd=true' },
    { title: 'Mots Techniques', file: 'https://example.com/mots_techniques.pdf' },
    { title: '5 bonnes pratiques', file: 'https://drive.google.com/file/d/14iKwIIwA7CxY9ARHH-pdvFVgOL9UQrQi/view?usp=drive_link' },
  ];

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
      router.replace('/AuthScreen');
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la déconnexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: { flexDirection: 'column', alignItems: 'center', width: '100%' },
  button: {
    width: '75%',
    height: 50,
    marginVertical: 5,
    backgroundColor: '#154c79',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  buttonText: { color: 'white', fontSize: 13, textAlign: 'center' },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutText: { color: 'white', fontWeight: 'bold' },
  helpText: { position: 'absolute', bottom: 20, color: '#154c79', fontSize: 12, textAlign: 'center' },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#154c79',
    marginBottom: 20,
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
});

export default Home;
