import { View, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animasi masuk
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate loading process
    const timer = setTimeout(() => {
      // Animasi keluar sebelum pindah screen
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onLoadingComplete?.();
      });
    }, 2500); // Durasi loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#2b7fff', '#63a2ffff', '#aaccffff']}
      locations={[0.1, 0.5, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center"
        >
          <Image
            source={require('~/assets/app/kliniku.png')}
            className="w-48 h-48 rounded-2xl mb-6"
            resizeMode="contain"
          />
          
          {/* Loading Indicator */}
          <View className="flex-row space-x-2">
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                className="w-3 h-3 bg-white rounded-full"
                style={{
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                }}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};