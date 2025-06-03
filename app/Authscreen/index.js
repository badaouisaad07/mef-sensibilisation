import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/AuthScreen');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Redirection vers AuthScreen...</Text>
    </View>
  );
}
