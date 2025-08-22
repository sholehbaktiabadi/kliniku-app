import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/tabbar-icon';
import ProtectedRoute from '~/components/protected-route';

export default function TabLayout() {
  return (
    <ProtectedRoute>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Homes',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Booking',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
    </ProtectedRoute>
  );
}
