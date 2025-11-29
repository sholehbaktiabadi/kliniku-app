import '../global.css'
import { SessionProvider, useSession } from '~/middleware/middleware';
import { Slot, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '~/components/loading-screen';

const queryClient = new QueryClient();

function RootLayoutContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { session, isLoading: sessionLoading } = useSession();

  useEffect(() => {
    // App initialization
    const initializeApp = async () => {
      // Wait for session to load and simulate app startup
      if (!sessionLoading) {
        // Simulate additional loading time (assets, fonts, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [sessionLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Optional: You can add navigation logic here if needed
    // or handle navigation in the respective screens
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <Slot />;
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <RootLayoutContent />
      </SessionProvider>
    </QueryClientProvider>
  );
}