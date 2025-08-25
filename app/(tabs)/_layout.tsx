import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/tabbar-icon';
import ProtectedRoute from '~/components/protected-route';

export default function TabLayout() {
  return (
    <ProtectedRoute>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffb387ff'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Homes',
          headerShown: false,
          tabBarIcon: ({  }) => <TabBarIcon name="home" color={"#ffb387ff"} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Booking',
          headerShown: false,
          tabBarIcon: ({  }) => <TabBarIcon name="book" color={"#ffb387ff"} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          headerShown: true,
          tabBarIcon: ({  }) => <TabBarIcon name="user" color={"#ffb387ff"} />,
        }}
      />
    </Tabs>
    </ProtectedRoute>
  );
}
