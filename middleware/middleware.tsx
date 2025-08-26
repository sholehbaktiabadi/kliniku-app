import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../storage/storage';
import { env } from '~/config/env';
import { Alert } from 'react-native';
import { router } from 'expo-router';

const AuthContext = createContext<{
  signIn: (phone: string, otp: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext
      value={{
        signIn: async (phone: string, otp: string) => {
          try {
            const response = await fetch(env.baseUrl.klinikuApi + '/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ phone, otp }),
            });

            if (response.ok) {
              const { message } = await response.json();
              const token = message.token
              setSession(token);
              router.replace("/(app)/(tabs)");
            } else {
              Alert.alert('Error', 'Invalid credentials');
            }
          } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Login failed');
          }
        },
        signOut: () => {
          setSession(null);
          router.replace("/sent-otp");
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  );
}
