import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, View, Text, ScrollView } from "react-native"
import { Card } from "~/components/card";
import { ImageCarousel } from "~/components/carousel";
import { MainMenu } from "~/components/menu";
import { useAuth } from '~/context/auth-context';
import { request } from '~/helper/request';
import { env } from '~/config/env';
import { ResponsePaginate } from '~/interface/response';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"
import { UserSession } from '~/interface/user';

export default function Index() {
  const { session } = useAuth()
  const initialClinic = { statusCode: 200, message: [], total: 1, totalPage: 1, isHasNextPage: false, }
  const initialUser = { id: 0, name: '', identifier: '', email: '', phone: '', }
  const [data, setData] = useState<ResponsePaginate>(initialClinic);
  const [user, setUser] = useState<UserSession>(initialUser)

  const fetchData = async () => {
    const data = await request({
      uri: env.baseUrl.klinikuApi + '/clinic?page=1&limit=10',
      token: session as string,
    });
    const response: ResponsePaginate = data;
    setUser(jwtDecode(session))
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView>
        <LinearGradient
          colors={['#ff6d18ff', '#ffb387ff', '#f8f8f8ff', '#ffffffff']}
          locations={[0.05, 0.29, 0.3, 1]}
          style={{ minHeight: '100%' }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View className="px-5 py-12">
            <Text className="mt-5 text-2xl text-gray-100 font-semibold">
              Hi, {user.name}
            </Text>
            <TextInput className="mt-5 px-3 bg-white rounded-xl border-1 border-orange-500 text-gray-500 placeholder:text-gray-300 focus:border-orange-500 focus:shadow focus:shadow-slate-200 focus:outline-orange-500" placeholder="search klinik" />
            <View className="mt-5 shadow shadow-xl">
              <ImageCarousel
                images={carouselImage}
              />
            </View>
            <View className="mt-5 p-5 justify-center">
              <MainMenu />
            </View>
            <ScrollView >
              {data.message.map((item, index) => (
                <Card
                  key={index}
                  title={item.name}
                  image={item.images[0]}
                  tags={item.polyclinics}
                  rating={item.rating}
                />
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