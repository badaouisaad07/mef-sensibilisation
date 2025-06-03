import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './(tabs)/firebaseConfig'; // Adjust path if needed

export default function Layout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Utilisateur connecté :', user);
      if (user) {
        router.replace('/(tabs)/Home'); // Redirect to Home within tabs
      } else {
        router.replace('/AuthScreen'); // Redirect to AuthScreen
      }
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  if (loading) {
    return null; // Show nothing while checking auth state
  }

  return <Slot />; // Render the appropriate screen
}