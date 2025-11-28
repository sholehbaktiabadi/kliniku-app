import { Stack } from 'expo-router';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { PrimaryButton } from '~/components/button';
import { useSession } from '~/middleware/middleware';

export default function Home() {
  const { signOut } = useSession()

  return (
    <>
      <Stack.Screen options={{ title: 'User' }} />
      <View style={styles.container}>
        <View className="items-center">
          <PrimaryButton
            title={"Logout"}
            onPress={async () => signOut()}
            disabled={false}
          />
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
