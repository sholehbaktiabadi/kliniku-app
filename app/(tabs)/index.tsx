import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeScreen } from '~/components/page/tab/home';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView>
        <LinearGradient
          colors={['#5e3affff', '#a292ffff', '#dcdcffff', '#ffffffff']}
          locations={[0.05, 0.29, 0.3, 1]}
          style={{ minHeight: '100%' }} // This makes it expand to full height
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View className="px-5 py-12">
            <HomeScreen />
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
}