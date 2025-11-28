import { router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, View, Text, ScrollView, Pressable } from "react-native"
import { Card } from "~/components/card";
import { ImageCarousel } from "~/components/carousel";
import { MainMenu } from "~/components/menu";
import { UserSession } from '~/interface/user';
import { useSession } from '~/middleware/middleware';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { getClinicList } from '~/api/clinic';
import { jwtDecode } from 'jwt-decode';

export default function Index() {
  const { session, refreshToken } = useSession()
  const initialClinic = {
    statusCode: 200,
    message: [],
    total: 1,
    totalPage: 1,
    isHasNextPage: false
  }
  const user = jwtDecode<UserSession>(session)
  const { data } = useQuery({
    queryKey: ['clinicList'],
    queryFn: () => getClinicList({ session }),
    initialData: initialClinic,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView>
        <LinearGradient
          colors={['#2b7fff', '#63a2ffff', '#f8f8f8ff', '#ffffffff']}
          locations={[0.05, 0.29, 0.3, 1]}
          style={{ minHeight: '100%' }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View className="px-5 py-12">
            <Text className="mt-5 text-2xl text-gray-100 font-semibold">
              Hi, {user.name}
            </Text>
            <View className="mt-5 flex-row items-center bg-white rounded-xl border border-blue-500 px-3">
              <Ionicons name="search-outline" size={18} color="gray" />
              <TextInput
                className="flex-1 py-3 ml-2 text-gray-500 placeholder:text-gray-300 focus:outline-none"
                placeholder="search clinic"
              />
            </View>
            <View className="mt-5 shadow shadow-xl">
              <ImageCarousel
                divideBy={1.1}
                images={carouselImage}
              />
            </View>
            <View className="mt-5 p-5 justify-center">
              <MainMenu />
            </View>
            <ScrollView >
              {data.message.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/clinic/detail',
                      params: { id: item.id },
                    })
                  }
                >
                  <Card
                    title={item.name}
                    image={item.images[0]}
                    tags={item.polyclinics}
                    rating={item.rating}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
}

const carouselImage = [
  'https://dummyimage.com/600x400/4f4f4e/ffffff',
  'https://dummyimage.com/600x400/4f4f4e/ffffff',
] 