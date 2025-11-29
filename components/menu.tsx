import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';


interface MenuItem {
  name: string;
  label: string;
}

export const MainMenu = () => {
  return (
    <SimpleGrid
      listKey="main-menu"
      data={mainMenu}
      itemDimension={60}
      renderItem={({ item }) => (
        <View className="items-center bg-white rounded-xl shadow p-2">
          <Ionicons name={item.name as React.ComponentProps<typeof Ionicons>['name']} size={30} color="#63a2ffff" />
          <Text className="text-xs text-slate-400 mt-1">{item.label}</Text>
        </View>
      )}
    />
  );
};

const mainMenu: MenuItem[] = [
  { name: 'document', label: 'Dokumen' },
  { name: 'location', label: 'Lokasi' },
  { name: 'telescope', label: 'Teleskop' },
  { name: 'airplane', label: 'Pesawat' },
  { name: 'alarm', label: 'Alarm' },
  { name: 'wine', label: 'Wine' },
];