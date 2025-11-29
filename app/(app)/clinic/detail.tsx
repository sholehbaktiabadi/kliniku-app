import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View, Text, Dimensions, ImageBackground, Pressable, Image } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { getClinicdetails } from '~/api/clinic';
import { GradientBackground } from '~/components/background';
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
            <GradientBackground>
                <ScrollView>
                    <View className="flex flex-1 mt-10 p-3">
                        <View className="mt-10 rounded-xl border border-blue-50 bg-white shadow shadow-xs shadow-blue-200 p-4">
                            <View>
                                <View className="flex-row items-start mb-5">
                                    {/* Left - Image & Rating */}
                                    <View className="relative">
                                        <Image
                                            className="h-28 w-28 rounded-2xl border-4 border-white shadow-md"
                                            source={{ uri: data?.imageProfile }}
                                        />
                                        <View className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                                            <MaterialIcons name="verified" size={16} color="white" />
                                        </View>
                                    </View>

                                    {/* Right - Content */}
                                    <View className="flex-1 ms-2">
                                        <View className="flex-row items-center mb-2">
                                            <Text className="text-lg font-bold text-gray-800 mr-2">{data?.name}</Text>
                                        </View>

                                        <View className="flex-row items-start mb-3">
                                            <Ionicons name="star-half" size={16} color="#F59E0B" />
                                            <Text className="text-amber-800 font-bold ml-1">{data?.rating}</Text>
                                        </View>

                                        <View className="flex-row space-x-2">
                                            {/* <View className="bg-blue-50 rounded-lg px-3 py-1">
                                            <Text className="text-blue-700 text-xs font-medium">24 Jam</Text>
                                        </View> */}
                                            <View className="bg-green-50 rounded-lg px-3 py-1">
                                                <Text className="text-green-700 text-xs font-medium">Tersedia</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View className="mt-2">
                                    <ImageCarousel
                                        divideBy={1.17}
                                        images={data.images}
                                        noBorder={true}
                                    />
                                    <Text className="ms-4 mt-4 text-sm text-slate-700">{data.vision}</Text>
                                </View>

                                <View className="mb-4">
                                    <Text className="my-2 ms-1 text-xs text-slate-700">
                                        Alamat:
                                    </Text>
                                </View>

                                <View className="flex-row items-start">
                                    <Ionicons name="location" size={16} color="#b6b6b6ff" />
                                    <Text className="text-gray-600 text-sm font-light ml-2 flex-1">{data?.adress}</Text>
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
                        <Text className="ms-2 mt-5 text-sm text-slate-700">Pilih Layanan</Text>
                        <View className="mx-2 mt-3">
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
                </ScrollView>
            </GradientBackground>
        </>
    );
}