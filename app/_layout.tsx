import { globalStyles } from '@/styles/global';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackground: (() => <View style={globalStyles.bgColor} />) }}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(misc)' />
    </Stack>
  );
}