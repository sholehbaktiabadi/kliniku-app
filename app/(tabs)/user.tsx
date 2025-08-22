import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'User' }} />
      <View style={styles.container}>
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
