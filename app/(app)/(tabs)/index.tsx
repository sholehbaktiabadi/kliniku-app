import { router, Stack } from 'expo-router';
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
import { GradientBackground } from '~/components/background';

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
      <GradientBackground>
        <ScrollView>
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

            <View className="mt-8 mb-5">
              <View className="bg-white rounded-2xl shadow-sm shadow-blue-500/5 border border-gray-100">
                <MainMenu />
              </View>
            </View>


            <View className="pb-5">
              <Text className="text-lg font-bold text-gray-500 mb-4">
                Tips Kesehatan
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 24 }}
              >
                <View className="flex-row space-x-4">
                  {healthTips.map((tip, index) => (
                    <View key={index} className="bg-white rounded-2xl p-4 mx-1 w-64 shadow-sm shadow-gray-200 border border-gray-100">
                      <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mb-3">
                        <Ionicons name={tip.icon as React.ComponentProps<typeof Ionicons>['name']} size={24} color="#2b7fff" />
                      </View>
                      <Text className="text-gray-500 font-semibold text-sm mb-2">
                        {tip.title}
                      </Text>
                      <Text className="text-gray-500 text-xs leading-5">
                        {tip.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="pb-5">
              <Text className="text-lg font-bold text-gray-500 mb-4">
                Klinik Terdekat
              </Text>

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
                      image={item.imageProfile}
                      tags={item.polyclinics}
                      rating={item.rating}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>

        </ScrollView>
      </GradientBackground>
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full items-center justify-center shadow-lg shadow-blue-500/30"
        onPress={() => router.push('/(app)/(tabs)/booking')}
      >
        <Ionicons name="medical" size={24} color="white" />
      </Pressable>
    </>
  );
}

const carouselImage = [
  'https://dummyimage.com/600x400/4f4f4e/ffffff',
  'https://dummyimage.com/600x400/4f4f4e/ffffff',
]

const healthTips = [
  {
    icon: 'water-outline',
    title: 'Hidrasi yang Cukup',
    description: 'Minum 8 gelas air per hari untuk menjaga metabolisme tubuh dan kesehatan kulit.'
  },
  {
    icon: 'walk-outline',
    title: 'Olahraga Rutin',
    description: '30 menit olahraga setiap hari dapat meningkatkan kekebalan tubuh dan kesehatan jantung.'
  },
  {
    icon: 'bed-outline',
    title: 'Tidur Berkualitas',
    description: 'Istirahat 7-8 jam per malam membantu proses regenerasi sel dan pemulihan tubuh.'
  }
];