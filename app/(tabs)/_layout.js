// app/_layout.js
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function Layout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Utilisateur connecté :", user);
      if (user) {
        router.replace("/Home");        // Redirige vers la page Home
      } else {
        router.replace("/AuthScreen");  // Redirige vers AuthScreen
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null; // Affiche rien le temps qu’on vérifie

  return <Slot />; // Charge dynamiquement la bonne page en fonction de la route
}
