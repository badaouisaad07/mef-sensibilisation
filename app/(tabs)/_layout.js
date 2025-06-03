import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" />
      {/* Add more tabs if needed, e.g.:
      <Tabs.Screen name="Profile" />
      */}
    </Tabs>
  );
}