import { View, Text, Image } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';

export const MainMenu = () => {
  return (
    <>
      <View className="mt-5 p-5 justify-center">
        <SimpleGrid
          listKey=""
          data={mainMenu}
          itemDimension={60}
          renderItem={({ item }) => (
            <View className="p-2 items-center bg-gray-200 rounded-xl">
              <Image source={require('../assets/favicon.png')} style={{ width: 40, height: 40 }} />
              <Text className="text-xs text-slate-500">{item}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

const mainMenu: string[] = ['Klinik', 'Praktik', 'menu3', 'menu4', 'menu5', 'menu6'];
