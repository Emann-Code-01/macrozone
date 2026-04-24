import { globalStyles } from '@/styles/global';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      title: 'Edit Meal',
      headerShown: true, headerTintColor: '#fff', headerStyle: {
        backgroundColor: '#1a1a2e'
      }
    }}>
      <Stack.Screen name='edit-meal' />
    </Stack >
  );
}