import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, Image } from 'react-native';

const App = () => {
  const buttons = [
    { 
      title: 'Présentation de la Sensibilisation (PDF)', 
      file: 'https://mfestockage.blob.core.windows.net/media/SENSIBILISATION%20SSI_p4%202025.pptx', // Replace with your actual link
      type: 'pdf' 
    },
    { title: 'Charte de Sécurité (PDF)', file: 'https://drive.google.com/file/d/1RTvDHR9LdLtAbrPtegrnWuPeAVZvWaJZ/view?usp=drive_link' },
    { title: 'Questionnaire (Google Form)', file: 'https://docs.google.com/forms/d/e/1FAIpQLSfiKWNLBTANpBlAhDI3HaMJk5AHiPY7qMC3mlqmFKliNj7dlw/viewform' },
    { title: 'Vidéos Explicatives (Vidéos)', file: 'https://drive.google.com/drive/folders/1dWHM1ZOcRfFSfvLsE8kmpIKqlqd7uK1o?usp=drive_link' },
    { title: 'Lois Marocaines (PDF)', file: 'https://docs.google.com/presentation/d/1sl204bzT7IIP4US1BfJ804lBTcsfASGv/edit?usp=drive_link&ouid=117637970889920778019&rtpof=true&sd=true' },
    { title: 'Mots Techniques (PDF)', file: 'https://example.com/mots_techniques.pdf' },
    { title: '5 bonnes pratiques', file: 'https://drive.google.com/file/d/14iKwIIwA7CxY9ARHH-pdvFVgOL9UQrQi/view?usp=drive_link' }, // New button
  ];

  const handlePress = async (file) => {
    try {
      await Linking.openURL(file);
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top right corner */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      {/* Text on top of the first button */}
      <Text style={styles.headerText}>Sensibilisation MEF</Text>

      <View style={styles.buttonContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(btn.file)}>
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.helpText}>Besoin d'aide? Contactez-nous sur xxxx@mef.gov.ma</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: { flexDirection: 'column', alignItems: 'center', width: '100%' },
  button: {
    width: '75%', // All buttons have the same width
    height: 50,   // All buttons have the same height
    marginVertical: 5, // Space between buttons
    backgroundColor: '#154c79',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  buttonText: { color: 'white', fontSize: 13, textAlign: 'center' },
  helpText: { position: 'absolute', bottom: 20, color: '#154c79', fontSize: 12, textAlign: 'center' },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#154c79',
    marginBottom: 20, // Space below the header text
  },
  logo: {
    position: 'absolute', // Position the logo absolutely
    top: 20, // Distance from the top
    right: 20, // Distance from the right
    width: 240, // Adjust width as needed
    height: 240, // Adjust height as needed
    resizeMode: 'contain', // Ensure the logo fits within the dimensions
  },
});

export default App;
