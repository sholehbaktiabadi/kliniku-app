import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../../components/tabbar-icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#95bfffff'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Homes',
          headerShown: false,
          tabBarIcon: ({ }) => <TabBarIcon name="home" color={"#95bfffff"} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Booking',
          headerShown: true,
          tabBarIcon: ({ }) => <TabBarIcon name="book" color={"#95bfffff"} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          headerShown: true,
          tabBarIcon: ({ }) => <TabBarIcon name="user" color={"#95bfffff"} />,
        }}
      />
    </Tabs>
  );
}
