import { useRouter } from 'expo-router';
import { ActivityIndicator, View, BackHandler } from 'react-native';
import { useAuth } from '~/context/auth-context';
import { useEffect } from 'react';

export default function Index() {
  const { isAuthenticated, session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Handle navigation based on auth state
    if (!isLoading) {
      if (isAuthenticated) {
        // Use replace() to prevent going back to auth screens
        router.replace('/(tabs)');
      } else {
        // Also use replace() for the initial redirect to sent-otp
        router.replace('/sent-otp');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Handle Android hardware back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isAuthenticated) {
          // Prevent going back to auth screens when authenticated
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [isAuthenticated]);

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Return null or empty view since we're handling navigation in useEffect
  return null;
}