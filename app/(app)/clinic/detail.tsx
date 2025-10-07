import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View, Text, Dimensions, ImageBackground, Pressable, Image } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { getClinicdetails } from '~/api/clinic';
import { ImageCarousel } from '~/components/carousel';

import { useSession } from '~/middleware/middleware';

export default function ClinicDetailScreen() {
    const { session } = useSession();
    const router = useRouter();
    const { width } = Dimensions.get('window');
    const { id } = useLocalSearchParams();

    const initialClinic = {
        statusCode: 200,
        message: {}
    }
    const { data: { message: data } } = useQuery({
        queryKey: ['clinicDetail'],
        queryFn: () => getClinicdetails({ session, id: id as string }),
        initialData: initialClinic,
    });

    return (
        <>
            <Stack.Screen options={{ title: 'ClinicList', headerShown: false }} />
            <ScrollView>
                <LinearGradient
                    colors={['#2b7fff', '#63a2ffff', '#f8f8f8ff', '#ffffffff']}
                    locations={[0.05, 0.29, 0.3, 1]}
                    style={{ minHeight: '100%' }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    <View className="flex flex-1 mt-10 p-6">
                        <View className="mt-10 rounded-xl border border-blue-200 bg-slate-50 p-4">
                            <View>
                                <View className="mb-3 flex flex-row flex-wrap items-center border-b border-blue-200 pb-3">
                                    <Image className="h-16 w-16 rounded-full" source={{ uri: data.imageProfile }} />
                                    <Text className="mr-2 ms-4 text-slate-600">{data.name}</Text>
                                    <MaterialIcons name="verified" size={24} color="blue" />
                                </View>
                                <View className="flex flex-row flex-wrap">
                                    <View className="mr-2 h-24 basis-3/12 items-center justify-center overflow-hidden rounded-xl border border-blue-300">
                                        <View className="flex flex-row flex-wrap">
                                            <Text className="ms-1 mt-1 text-sm text-slate-500">Rating</Text>
                                        </View>
                                        <View className="flex flex-row flex-wrap items-center">
                                            <FontAwesome name="star" size={18} color="gold" />
                                            <Text className="ms-1 mt-1 text-slate-500">{data.rating}</Text>
                                        </View>
                                    </View>
                                    <View className="h-24 flex-auto rounded-xl border border-blue-200 bg-blue-100 p-1">
                                        <View className="m-auto text-center">
                                            <Text className="text-xs text-slate-700">Alamat:</Text>
                                            <Text className="text-xs text-slate-700">{data.adress}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>{data.schedules ? <View className="mt-5 flex">
                                    <Text className="my-2 ms-1 text-xs text-slate-700">Jadwal Buka</Text>
                                    {data.schedules.map((res: any) => (
                                        <View className="flex-row" key={res.id}>
                                            <View className={`m-1 w-28 rounded ${res.isToday ? 'bg-yellow-500' : 'bg-blue-100'}`}>
                                                <Text className="mx-2 p-1 text-xs text-slate-700">{res.day}</Text>
                                            </View>
                                            <View className={`m-1 w-48 rounded ${res.isToday ? 'bg-yellow-500' : 'bg-blue-100'}`}>
                                                <Text className="mx-2 p-1 text-center text-xs text-slate-700">{`${res.startTime} - ${res.endTime}`}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View> : <></>}</View>
                            </View>

                        </View>

                        <View className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-2">
                            <ImageCarousel
                                divideBy={1.17}
                                images={data.images}
                            />
                            <Text className="ms-4 mt-4 text-sm text-slate-700">{data.vision}</Text>
                        </View>
                        <Text className="ms-2 mt-8 text-sm text-slate-700">Pilih Layanan</Text>
                        <View className="mx-5 mt-3">
                            <SimpleGrid
                                data={data.polyclinics}
                                listKey=""
                                spacing={15}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() =>
                                            router.push({
                                                pathname: '/(app)/polyclinic/detail',
                                                params: {
                                                    id: item.id
                                                },
                                            })
                                        }>
                                        <ImageBackground
                                            className={`h-20 w-[${width / 2}] overflow-hidden rounded-lg rounded-xl bg-gray-200`}
                                            source={{ uri: item.poly.image }}
                                            resizeMode="cover">
                                            <View className="absolute right-1 top-1 rounded-full bg-gray-300 p-1 px-4">
                                                <Text className="text-xs text-gray-600">{item.poly.name}</Text>
                                            </View>
                                        </ImageBackground>
                                    </Pressable>
                                )}
                            />
                        </View>
                        <Text className="ms-2 mt-3 text-sm text-slate-700">Dukungan Pembayaran</Text>
                        <View className="mt-3">
                            <View className="flex flex-row">
                                {data.paymentSupports?.map((res: string, i: number) => (
                                    <View key={i} className="m-2 items-center rounded-lg bg-slate-200 px-3 py-2">
                                        <Text className="text-sm text-slate-700">{res}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    );
}