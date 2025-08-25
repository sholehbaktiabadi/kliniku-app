import { View, Text, Image } from 'react-native';
import { CardProps } from '~/interface/card';
export const Card = ({ title, image, tags }: CardProps) => (
  <View className="flex-row p-4 mb-4 mr-2 bg-white rounded-xl shadow shadow-violet-500/50">

    <Image
      source={{ uri: image }}
      className="w-32 h-32 rounded-lg"
      resizeMode="cover"
    />

    <View className="ml-4 flex-1 justify-center">
      <Text className="text-gray-400 mb-2">{title}</Text>
      <View className="flex-row flex-wrap">
        {tags.map((tag, index) => (
          <View key={index} className="bg-violet-100 px-3 py-1 rounded-full mr-2 mb-2">
            <Text className="text-gray-400 text-xs">{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);