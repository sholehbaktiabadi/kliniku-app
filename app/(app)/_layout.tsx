import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '~/middleware/middleware';


export default function AppLayout() {
  const { session, refreshToken, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sent-otp" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}