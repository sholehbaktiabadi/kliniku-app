import { Stack } from 'expo-router';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useSession } from '~/middleware/middleware';

export default function Home() {
  const { signOut } = useSession()

  return (
    <>
      <Stack.Screen options={{ title: 'User' }} />
      <View style={styles.container}>
        <View className="items-center">
          <Pressable
            className="mt-5 items-center rounded-xl border border-orange-400 bg-orange-400 shadow shadow-slate-700 w-[70%]"
            onPress={async () => signOut()}>
            <Text className="m-3 font-bold text-white">{"Logout"}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
