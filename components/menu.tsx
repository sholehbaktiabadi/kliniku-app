import { View, Text, Image } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';

export const MainMenu = () => {
  return (
    <>
        <SimpleGrid
          listKey=""
          data={mainMenu}
          itemDimension={60}
          renderItem={({ item }) => (
            <View className="p-2 items-center bg-white rounded-xl shadow">
              <Image source={require('../assets/favicon.png')} style={{ width: 30, height: 30 }} />
              <Text className="text-xs text-slate-500">{item}</Text>
            </View>
          )}
        />
    </>
  );
};

const mainMenu: string[] = ['Klinik', 'Praktik', 'menu3', 'menu4', 'menu5', 'menu6'];
