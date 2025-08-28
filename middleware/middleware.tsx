import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../storage/storage';
import { router } from 'expo-router';

const AuthContext = createContext<{
  signIn: (token: string) => void;
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
        signIn: async (token: string) => {
          setSession(token);
          router.replace("/(app)/(tabs)")
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
