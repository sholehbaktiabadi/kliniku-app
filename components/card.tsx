import { View, Text, Image } from 'react-native';
import { CardProps } from '~/interface/card';

export const Card = ({ title, image, tags, rating }: CardProps) => {
  const maxTags = 2;
  const displayedTags = tags.slice(0, maxTags);
  const remainingCount = tags.length - maxTags;
  
  return (
    <View className={`bg-white rounded-xl shadow p-3 mb-4 flex-row`}>
      <Image 
        source={{ uri: image }} 
        className="w-32 h-32 rounded-lg"
        resizeMode="cover"
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-sm text-gray-500 mb-2">{title}</Text>
        <View className="flex-row flex-wrap">
          {displayedTags.map((tag, index) => (
            <View key={index} className="bg-orange-100 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-orange-800 text-xs">{tag}</Text>
            </View>
          ))}
          {remainingCount > 0 && (
            <View className="bg-orange-200 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-orange-800 text-xs">+{remainingCount} more</Text>
            </View>
          )}
        </View>
        {rating && (
        <View className="flex-row items-center mb-2">
          <Text className="text-yellow-500 text-sm">⭐</Text>
          <Text className="text-sm text-gray-700 ml-1">{rating}</Text>
        </View>
      )}
      </View>
    </View>
  );
};