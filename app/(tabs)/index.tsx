import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ContainerImg } from '~/components/container';
import { Home } from '~/components/page/tab/home';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ContainerImg>
        <View style={styles.container}>
          <Home />
        </View>
      </ContainerImg>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
    backgroundColor: 'transparent',
  },
});