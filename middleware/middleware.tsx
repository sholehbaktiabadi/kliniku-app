import { use, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useStorageState } from '../storage/storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { env } from '~/config/env';

const AuthContext = createContext<{
  signIn: (token: string, refreshToken: string) => void;
  signOut: () => void;
  session?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  refreshToken: null,
  isLoading: false,
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp?: number } = jwtDecode(token);
    if (!decoded.exp) return true;
    const currentTimeWithBuffer = (Date.now() / 1000) + 60;
    return currentTimeWithBuffer >= decoded.exp;
  } catch (error) {
    console.error("JWT Decode Error (Token Invalid):", error);
    return true;
  }
};


const fetchNewToken = async (
  currentRefreshToken: string
): Promise<{ token: string, refreshToken: string } | null> => {
  try {
    const refreshTokenEndpoint = `${env.baseUrl.klinikuApi}/auth/refreshToken`;
    const response = await fetch(refreshTokenEndpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    if (!response.ok) {
      console.warn(`refresh failed with status: ${response.status}`);
      return null;
    }

    const result = await response.json();
    if (result.message?.token && result.message?.refreshToken) {
      return {
        token: result.message.token,
        refreshToken: result.message.refreshToken
      };
    }
    throw new Error('invalid format response');
  } catch (error) {
    console.error('refresh token failure:', error);
    return null;
  }
};

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[_, refreshToken], setRefreshToken] = useStorageState('refreshToken');

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSignOut = async () => {
    console.log("signed out");
    setSession(null);
    setRefreshToken(null);
    router.replace("/sent-otp");
  };

  const handleSignIn = async (token: string, newRefreshToken: string) => {
    setSession(token);
    setRefreshToken(newRefreshToken)
    router.replace("/(app)/(tabs)")
  };

  useEffect(() => {
    if (!isLoading && session && refreshToken && !isRefreshing) {
      console.log("refreshing...");
      if (isTokenExpired(session)) {
        console.log("token expired, Refreshing...");
        setIsRefreshing(true);
        const attemptRefresh = async () => {
          const newTokens = await fetchNewToken(refreshToken);
          if (newTokens) {
            console.log("refresh token success");
            setSession(newTokens.token);
            setRefreshToken(newTokens.refreshToken);
          } else {
            handleSignOut();
          }
          setIsRefreshing(false);
        };
        attemptRefresh();
      }
    }
  }, [isLoading, session, refreshToken, isRefreshing]);


  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        session,
        refreshToken,
        isLoading: isLoading || isRefreshing,
      }}>
      {children}
    </AuthContext.Provider>
  );
}