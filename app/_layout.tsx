import '../global.css'
import { Stack } from 'expo-router';
import { AuthProvider } from '~/context/auth-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Index' }} />
        <Stack.Screen name="sent-otp" options={{ title: 'SentOtp' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}